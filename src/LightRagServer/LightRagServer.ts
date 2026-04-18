import type { CallToolResult, Implementation, ServerOptions } from '@modelcontextprotocol/server'
import { McpServer, StdioServerTransport } from '@modelcontextprotocol/server'
import * as z from 'zod/v4'

export interface LightRagServerParams {
  baseUrl?: string
  implementation?: Implementation
  options?: ServerOptions
}

export class LightRagServer {
  readonly server: McpServer
  readonly params: Required<LightRagServerParams>

  constructor (params: LightRagServerParams = {}) {
    this.params = {
      baseUrl: 'http://localhost:9621',
      options: {},
      ...params,
      implementation: {
        name: 'lightrag-mcp',
        version: '1.0.0',
        ...params.implementation,
      },
    }

    this.server = new McpServer(this.params.implementation, this.params.options)
    this.registerTools()
  }

  private registerTools (): void {
    this.server.registerTool(
      'insert_text',
      {
        title: 'Insert Text',
        description: 'Add text content to LightRAG with a specified filename',
        inputSchema: z.object({
          text: z.string().describe('Text content to insert'),
          filename: z.string().optional().default('mcp.md').describe('Optional filename with extension (default: mcp.md)'),
        }),
      },
      async ({ text, filename }): Promise<CallToolResult> => {
        try {
          const response = await fetch(`${this.params.baseUrl}/documents/text`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text,
              file_source: filename,
            }),
          })

          if (!response.ok) {
            return {
              content: [{
                type: 'text',
                text: `HTTP ${response.status}: ${response.statusText}`,
              }],
              isError: true,
            }
          }

          const result = await response.json()

          return {
            content: [{
              type: 'text',
              text: JSON.stringify(result, null, 2),
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
      },
    )
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
