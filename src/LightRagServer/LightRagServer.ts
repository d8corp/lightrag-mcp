import type { CallToolResult, Implementation, ServerOptions } from '@modelcontextprotocol/server'
import { McpServer, StdioServerTransport } from '@modelcontextprotocol/server'
import * as z from 'zod'

import {
  cancelPipelineDocumentsCancelPipelinePost,
  checkEntityExistsGraphEntityExistsGet,
  clearCacheDocumentsClearCachePost,
  clearDocumentsDocumentsDelete,
  createEntityGraphEntityCreatePost,
  createRelationGraphRelationCreatePost,
  deleteDocumentDocumentsDeleteDocumentDelete,
  deleteEntityDocumentsDeleteEntityDelete,
  deleteRelationDocumentsDeleteRelationDelete,
  getDocumentsPaginatedDocumentsPaginatedPost,
  getDocumentStatusCountsDocumentsStatusCountsGet,
  getGraphLabelsGraphLabelListGet,
  getKnowledgeGraphGraphsGet,
  getPipelineStatusDocumentsPipelineStatusGet,
  getPopularLabelsGraphLabelPopularGet,
  getTrackStatusDocumentsTrackStatusTrackIdGet,
  insertTextDocumentsTextPost,
  insertTextsDocumentsTextsPost,
  mergeEntitiesGraphEntitiesMergePost,
  queryDataQueryDataPost,
  queryTextQueryPost,
  reprocessFailedDocumentsDocumentsReprocessFailedPost,
  scanForNewDocumentsDocumentsScanPost,
  searchLabelsGraphLabelSearchGet,
  updateEntityGraphEntityEditPost,
  updateRelationGraphRelationEditPost,
} from '../gen'
import type { Client, ClientOptions } from '../gen/client'
import { createClient, createConfig } from '../gen/client'

import {
  zCheckEntityExistsGraphEntityExistsGetQuery,
  zClearCacheRequest,
  zDeleteDocRequest,
  zDeleteEntityRequest,
  zDeleteRelationRequest,
  zDocumentsRequest,
  zEntityCreateRequest,
  zEntityMergeRequest,
  zEntityUpdateRequest,
  zGetKnowledgeGraphGraphsGetQuery,
  zGetPopularLabelsGraphLabelPopularGetQuery,
  zGetTrackStatusDocumentsTrackStatusTrackIdGetPath,
  zInsertTextRequest,
  zInsertTextsRequest,
  zQueryRequest,
  zRelationCreateRequest,
  zRelationUpdateRequest,
  zSearchLabelsGraphLabelSearchGetQuery,
} from '../gen/zod.gen'

interface SDKParams<T, E> {
  data?: T
  error?: E
  response: Response
  request: Request
}

type LightRagServerInnerParams = Required<LightRagServerParams>

export interface LightRagServerParams {
  implementation?: Implementation
  serverOptions?: ServerOptions
  clientOptions?: ClientOptions
}

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

  private registerGetDocumentStatusCounts (): void {
    this.server.registerTool(
      'get_document_status_counts',
      {
        title: 'Get Document Status Counts',
        description: 'Get counts of documents by status',
        inputSchema: z.object({}),
      },
      async () => this.handleSdkCall(
        getDocumentStatusCountsDocumentsStatusCountsGet({
          client: this.client,
        }),
      ),
    )
  }

  private registerClearDocuments (): void {
    this.server.registerTool(
      'clear_documents',
      {
        title: 'Clear Documents',
        description: 'Clear all documents from the RAG system',
        inputSchema: z.object({}),
      },
      async () => this.handleSdkCall(
        clearDocumentsDocumentsDelete({
          client: this.client,
        }),
      ),
    )
  }

  private registerReprocessFailed (): void {
    this.server.registerTool(
      'reprocess_failed',
      {
        title: 'Reprocess Failed Documents',
        description: 'Reprocess failed and pending documents',
        inputSchema: z.object({}),
      },
      async () => this.handleSdkCall(
        reprocessFailedDocumentsDocumentsReprocessFailedPost({
          client: this.client,
        }),
      ),
    )
  }

  private registerGetPipelineStatus (): void {
    this.server.registerTool(
      'get_pipeline_status',
      {
        title: 'Get Pipeline Status',
        description: 'Get the current status of the document indexing pipeline',
        inputSchema: z.object({}),
      },
      async () => this.handleSdkCall(
        getPipelineStatusDocumentsPipelineStatusGet({
          client: this.client,
        }),
      ),
    )
  }

  private registerCancelPipeline (): void {
    this.server.registerTool(
      'cancel_pipeline',
      {
        title: 'Cancel Pipeline',
        description: 'Request cancellation of the currently running pipeline',
        inputSchema: z.object({}),
      },
      async () => this.handleSdkCall(
        cancelPipelineDocumentsCancelPipelinePost({
          client: this.client,
        }),
      ),
    )
  }

  private registerGetGraphLabels (): void {
    this.server.registerTool(
      'get_graph_labels',
      {
        title: 'Get Graph Labels',
        description: 'Get all graph labels',
        inputSchema: z.object({}),
      },
      async () => this.handleSdkCall(
        getGraphLabelsGraphLabelListGet({
          client: this.client,
        }),
      ),
    )
  }

  private registerGetTrackStatus (): void {
    this.server.registerTool(
      'get_track_status',
      {
        title: 'Get Track Status',
        description: 'Get the processing status of documents by tracking ID',
        inputSchema: zGetTrackStatusDocumentsTrackStatusTrackIdGetPath,
      },
      async (path) => this.handleSdkCall(
        getTrackStatusDocumentsTrackStatusTrackIdGet({
          client: this.client,
          path,
        }),
      ),
    )
  }

  private registerGetPopularLabels (): void {
    this.server.registerTool(
      'get_popular_labels',
      {
        title: 'Get Popular Labels',
        description: 'Get popular labels by node degree (most connected entities)',
        inputSchema: zGetPopularLabelsGraphLabelPopularGetQuery,
      },
      async (query) => this.handleSdkCall(
        getPopularLabelsGraphLabelPopularGet({
          client: this.client,
          query,
        }),
      ),
    )
  }

  private registerSearchLabels (): void {
    this.server.registerTool(
      'search_labels',
      {
        title: 'Search Labels',
        description: 'Search labels with fuzzy matching',
        inputSchema: zSearchLabelsGraphLabelSearchGetQuery,
      },
      async (query) => this.handleSdkCall(
        searchLabelsGraphLabelSearchGet({
          client: this.client,
          query,
        }),
      ),
    )
  }

  private registerGetKnowledgeGraph (): void {
    this.server.registerTool(
      'get_knowledge_graph',
      {
        title: 'Get Knowledge Graph',
        description: 'Retrieve a connected subgraph of nodes',
        inputSchema: zGetKnowledgeGraphGraphsGetQuery,
      },
      async (query) => this.handleSdkCall(
        getKnowledgeGraphGraphsGet({
          client: this.client,
          query,
        }),
      ),
    )
  }

  private registerCheckEntityExists (): void {
    this.server.registerTool(
      'check_entity_exists',
      {
        title: 'Check Entity Exists',
        description: 'Check if an entity with the given name exists in the knowledge graph',
        inputSchema: zCheckEntityExistsGraphEntityExistsGetQuery,
      },
      async (query) => this.handleSdkCall(
        checkEntityExistsGraphEntityExistsGet({
          client: this.client,
          query,
        }),
      ),
    )
  }

  private init (): void {
    this.registerInsertText()
    this.registerInsertTexts()
    this.registerScanDocuments()
    this.registerGetDocumentsPaginated()
    this.registerGetDocumentStatusCounts()
    this.registerGetTrackStatus()
    this.registerDeleteDocument()
    this.registerClearDocuments()
    this.registerClearCache()
    this.registerReprocessFailed()
    this.registerQueryText()
    this.registerQueryData()
    this.registerGetGraphLabels()
    this.registerGetPopularLabels()
    this.registerSearchLabels()
    this.registerGetKnowledgeGraph()
    this.registerCheckEntityExists()
    this.registerCreateEntity()
    this.registerUpdateEntity()
    this.registerDeleteEntity()
    this.registerMergeEntities()
    this.registerCreateRelation()
    this.registerUpdateRelation()
    this.registerDeleteRelation()
    this.registerGetPipelineStatus()
    this.registerCancelPipeline()
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
