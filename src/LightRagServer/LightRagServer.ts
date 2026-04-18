import type { CallToolResult, Implementation, ServerOptions } from '@modelcontextprotocol/server'
import { McpServer, StdioServerTransport } from '@modelcontextprotocol/server'
import * as z from 'zod'

import {
  clearCacheDocumentsClearCachePost,
  createEntityGraphEntityCreatePost,
  createRelationGraphRelationCreatePost,
  deleteDocumentDocumentsDeleteDocumentDelete,
  deleteEntityDocumentsDeleteEntityDelete,
  deleteRelationDocumentsDeleteRelationDelete,
  getDocumentsPaginatedDocumentsPaginatedPost,
  insertTextDocumentsTextPost,
  insertTextsDocumentsTextsPost,
  mergeEntitiesGraphEntitiesMergePost,
  queryDataQueryDataPost,
  queryTextQueryPost,
  scanForNewDocumentsDocumentsScanPost,
  updateEntityGraphEntityEditPost,
  updateRelationGraphRelationEditPost,
} from '../gen'
import type { Client, ClientOptions } from '../gen/client'
import { createClient, createConfig } from '../gen/client'

import {
  zClearCacheRequest,
  zDeleteDocRequest,
  zDeleteEntityRequest,
  zDeleteRelationRequest,
  zDocumentsRequest,
  zEntityCreateRequest,
  zEntityMergeRequest,
  zEntityUpdateRequest,
  zInsertTextRequest,
  zInsertTextsRequest,
  zQueryRequest,
  zRelationCreateRequest,
  zRelationUpdateRequest,
} from '../gen/zod.gen'

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

  private registerQueryText (): void {
    this.server.registerTool(
      'query_text',
      {
        title: 'Query Text',
        description: 'Query the RAG system with various modes (local, global, hybrid, naive, mix, bypass)',
        inputSchema: zQueryRequest,
      },
      async (body) => this.handleSdkCall(
        queryTextQueryPost({
          client: this.client,
          body,
        }),
      ),
    )
  }

  private registerInsertTexts (): void {
    this.server.registerTool(
      'insert_texts',
      {
        title: 'Insert Multiple Texts',
        description: 'Add multiple text documents into LightRAG',
        inputSchema: zInsertTextsRequest,
      },
      async (body) => this.handleSdkCall(
        insertTextsDocumentsTextsPost({
          client: this.client,
          body,
        }),
      ),
    )
  }

  private registerGetDocumentsPaginated (): void {
    this.server.registerTool(
      'get_documents_paginated',
      {
        title: 'Get Documents Paginated',
        description: 'Retrieve documents with pagination support',
        inputSchema: zDocumentsRequest,
      },
      async (body) => this.handleSdkCall(
        getDocumentsPaginatedDocumentsPaginatedPost({
          client: this.client,
          body,
        }),
      ),
    )
  }

  private registerDeleteDocument (): void {
    this.server.registerTool(
      'delete_document',
      {
        title: 'Delete Document',
        description: 'Delete documents by their IDs',
        inputSchema: zDeleteDocRequest,
      },
      async (body) => this.handleSdkCall(
        deleteDocumentDocumentsDeleteDocumentDelete({
          client: this.client,
          body,
        }),
      ),
    )
  }

  private registerQueryData (): void {
    this.server.registerTool(
      'query_data',
      {
        title: 'Query Data',
        description: 'Advanced data retrieval endpoint for structured RAG analysis without LLM generation',
        inputSchema: zQueryRequest,
      },
      async (body) => this.handleSdkCall(
        queryDataQueryDataPost({
          client: this.client,
          body,
        }),
      ),
    )
  }

  private registerCreateEntity (): void {
    this.server.registerTool(
      'create_entity',
      {
        title: 'Create Entity',
        description: 'Create a new entity in the knowledge graph',
        inputSchema: zEntityCreateRequest,
      },
      async (body) => this.handleSdkCall(
        createEntityGraphEntityCreatePost({
          client: this.client,
          body,
        }),
      ),
    )
  }

  private registerUpdateEntity (): void {
    this.server.registerTool(
      'update_entity',
      {
        title: 'Update Entity',
        description: 'Update an entity\'s properties in the knowledge graph',
        inputSchema: zEntityUpdateRequest,
      },
      async (body) => this.handleSdkCall(
        updateEntityGraphEntityEditPost({
          client: this.client,
          body,
        }),
      ),
    )
  }

  private registerDeleteEntity (): void {
    this.server.registerTool(
      'delete_entity',
      {
        title: 'Delete Entity',
        description: 'Remove an entity and all its relationships from the knowledge graph',
        inputSchema: zDeleteEntityRequest,
      },
      async (body) => this.handleSdkCall(
        deleteEntityDocumentsDeleteEntityDelete({
          client: this.client,
          body,
        }),
      ),
    )
  }

  private registerMergeEntities (): void {
    this.server.registerTool(
      'merge_entities',
      {
        title: 'Merge Entities',
        description: 'Merge multiple entities into a single entity, preserving all relationships',
        inputSchema: zEntityMergeRequest,
      },
      async (body) => this.handleSdkCall(
        mergeEntitiesGraphEntitiesMergePost({
          client: this.client,
          body,
        }),
      ),
    )
  }

  private registerCreateRelation (): void {
    this.server.registerTool(
      'create_relation',
      {
        title: 'Create Relation',
        description: 'Create a new relationship between two entities in the knowledge graph',
        inputSchema: zRelationCreateRequest,
      },
      async (body) => this.handleSdkCall(
        createRelationGraphRelationCreatePost({
          client: this.client,
          body,
        }),
      ),
    )
  }

  private registerUpdateRelation (): void {
    this.server.registerTool(
      'update_relation',
      {
        title: 'Update Relation',
        description: 'Update a relation\'s properties in the knowledge graph',
        inputSchema: zRelationUpdateRequest,
      },
      async (body) => this.handleSdkCall(
        updateRelationGraphRelationEditPost({
          client: this.client,
          body,
        }),
      ),
    )
  }

  private registerDeleteRelation (): void {
    this.server.registerTool(
      'delete_relation',
      {
        title: 'Delete Relation',
        description: 'Remove a relationship between two entities from the knowledge graph',
        inputSchema: zDeleteRelationRequest,
      },
      async (body) => this.handleSdkCall(
        deleteRelationDocumentsDeleteRelationDelete({
          client: this.client,
          body,
        }),
      ),
    )
  }

  private registerClearCache (): void {
    this.server.registerTool(
      'clear_cache',
      {
        title: 'Clear Cache',
        description: 'Clear all cache data from the LLM response cache storage',
        inputSchema: zClearCacheRequest,
      },
      async (body) => this.handleSdkCall(
        clearCacheDocumentsClearCachePost({
          client: this.client,
          body,
        }),
      ),
    )
  }

  private registerScanDocuments (): void {
    this.server.registerTool(
      'scan_documents',
      {
        title: 'Scan Documents',
        description: 'Trigger scanning process for new documents in the input directory',
        inputSchema: z.object({}),
      },
      async () => this.handleSdkCall(
        scanForNewDocumentsDocumentsScanPost({
          client: this.client,
        }),
      ),
    )
  }

  private init (): void {
    this.registerInsertText()
    this.registerInsertTexts()
    this.registerScanDocuments()
    this.registerQueryText()
    this.registerQueryData()
    this.registerGetDocumentsPaginated()
    this.registerDeleteDocument()
    this.registerClearCache()
    this.registerCreateEntity()
    this.registerUpdateEntity()
    this.registerDeleteEntity()
    this.registerMergeEntities()
    this.registerCreateRelation()
    this.registerUpdateRelation()
    this.registerDeleteRelation()
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
