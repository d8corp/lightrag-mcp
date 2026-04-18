import type { CallToolResult, Implementation, ServerOptions } from '@modelcontextprotocol/server'
import { McpServer, StdioServerTransport } from '@modelcontextprotocol/server'

import { insertTextDocumentsTextPost } from '../gen'
import type { Client, ClientOptions } from '../gen/client'
import { createClient, createConfig } from '../gen/client'

import { zInsertTextRequest } from '../gen/zod.gen'

export interface LightRagServerParams {
  implementation?: Implementation
  serverOptions?: ServerOptions
  clientOptions?: ClientOptions
}

interface SDKParams<T, E> {
  data?: T
  error?: E
  response: Response
  request: Request
}

export type LightRagServerInnerParams = Required<LightRagServerParams>

export class LightRagServer {
  private readonly server: McpServer
  private readonly params: LightRagServerInnerParams
  private readonly client: Client

  constructor (params: LightRagServerParams = {}) {
    this.params = {
      serverOptions: {},
      clientOptions: {},
      ...params,
      implementation: {
        name: 'lightrag-mcp',
        version: '1.0.0',
        ...params.implementation,
      },
    }

    this.client = createClient(createConfig(this.params.clientOptions))
    this.server = new McpServer(this.params.implementation, this.params.serverOptions)

    this.init()
  }

  private async handleSdkCall<T, E>(
    sdkCall: Promise<SDKParams<T, E>>,
  ): Promise<CallToolResult> {
    try {
      const { error, data, response } = await sdkCall

      if (error) {
        return {
          content: [{
            type: 'text',
            text: `Error: ${JSON.stringify(error, null, 2)}`,
          }],
          isError: true,
        }
      }

      if (!response.ok) {
        return {
          content: [{
            type: 'text',
            text: `HTTP ${response.status}: ${response.statusText}`,
          }],
          isError: true,
        }
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(data, null, 2),
        }],
      }
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: `Failed: ${error instanceof Error ? error.message : String(error)}`,
        }],
        isError: true,
      }
    }
  }

  private registerInsertText (): void {
    this.server.registerTool(
      'insert_text',
      {
        title: 'Insert Text',
        description: 'Add text content to LightRAG with a specified filename',
        inputSchema: zInsertTextRequest,
      },
      async (body) => this.handleSdkCall(
        insertTextDocumentsTextPost({
          client: this.client,
          body,
        }),
      ),
    )
  }

  private init (): void {
    this.registerInsertText()
  }

  async start (): Promise<void> {
    const transport = new StdioServerTransport()
    await this.server.connect(transport)

    process.on('SIGINT', async () => {
      await this.close()
      process.exit(0)
    })
  }

  async close (): Promise<void> {
    await this.server.close()
  }
}
