'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var server = require('@modelcontextprotocol/server');
var z = require('zod');
require('../gen/index.js');
require('../gen/client/index.js');
var zod_gen = require('../gen/zod.gen.js');
var client_gen = require('../gen/client/client.gen.js');
var utils_gen = require('../gen/client/utils.gen.js');
var sdk_gen = require('../gen/sdk.gen.js');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var z__namespace = /*#__PURE__*/_interopNamespace(z);

class LightRagServer {
    server;
    params;
    client;
    constructor(params = {}) {
        const baseUrl = process.env.LIGHTRAG_BASE_URL || 'http://localhost:9621';
        const apiKey = params.apiKey ?? process.env.LIGHTRAG_API_KEY;
        if (!apiKey)
            throw Error('Use apiKey option or LIGHTRAG_API_KEY');
        const optionHeaders = params.clientOptions?.headers;
        const normHeaders = optionHeaders instanceof Headers
            ? Object.fromEntries(optionHeaders.entries())
            : Array.isArray(optionHeaders)
                ? Object.fromEntries(optionHeaders)
                : optionHeaders ?? {};
        const headers = {
            'X-API-Key': apiKey,
            ...normHeaders,
        };
        const clientOptions = {
            baseUrl,
            ...params.clientOptions,
            headers,
        };
        const implementation = {
            name: 'lightrag-mcp',
            version: '1.0.0',
            ...params.implementation,
        };
        this.params = {
            serverOptions: params.serverOptions ?? {},
            clientOptions,
            implementation,
            apiKey,
        };
        this.client = client_gen.createClient(utils_gen.createConfig(this.params.clientOptions));
        this.server = new server.McpServer(this.params.implementation, this.params.serverOptions);
        this.init();
    }
    async handleSdkCall(sdkCall) {
        try {
            const { error, data, response } = await sdkCall;
            if (error) {
                return {
                    content: [{
                            type: 'text',
                            text: `Error: ${JSON.stringify(error, null, 2)}`,
                        }],
                    isError: true,
                };
            }
            if (!response.ok) {
                return {
                    content: [{
                            type: 'text',
                            text: `HTTP ${response.status}: ${response.statusText}`,
                        }],
                    isError: true,
                };
            }
            return {
                content: [{
                        type: 'text',
                        text: JSON.stringify(data, null, 2),
                    }],
            };
        }
        catch (error) {
            return {
                content: [{
                        type: 'text',
                        text: `Failed: ${error instanceof Error ? error.message : String(error)}`,
                    }],
                isError: true,
            };
        }
    }
    registerInsertText() {
        this.server.registerTool('insert_text', {
            title: 'Insert Text',
            description: 'Add text content to LightRAG with a specified filename',
            inputSchema: zod_gen.zInsertTextRequest,
        }, async (body) => this.handleSdkCall(sdk_gen.insertTextDocumentsTextPost({
            client: this.client,
            body,
        })));
    }
    registerQueryText() {
        this.server.registerTool('query_text', {
            title: 'Query Text',
            description: 'Query the RAG system with various modes (local, global, hybrid, naive, mix, bypass)',
            inputSchema: zod_gen.zQueryRequest,
        }, async (body) => this.handleSdkCall(sdk_gen.queryTextQueryPost({
            client: this.client,
            body,
        })));
    }
    registerInsertTexts() {
        this.server.registerTool('insert_texts', {
            title: 'Insert Multiple Texts',
            description: 'Add multiple text documents into LightRAG',
            inputSchema: zod_gen.zInsertTextsRequest,
        }, async (body) => this.handleSdkCall(sdk_gen.insertTextsDocumentsTextsPost({
            client: this.client,
            body,
        })));
    }
    registerGetDocumentsPaginated() {
        this.server.registerTool('get_documents_paginated', {
            title: 'Get Documents Paginated',
            description: 'Retrieve documents with pagination support',
            inputSchema: zod_gen.zDocumentsRequest,
        }, async (body) => this.handleSdkCall(sdk_gen.getDocumentsPaginatedDocumentsPaginatedPost({
            client: this.client,
            body,
        })));
    }
    registerDeleteDocument() {
        this.server.registerTool('delete_document', {
            title: 'Delete Document',
            description: 'Delete documents by their IDs',
            inputSchema: zod_gen.zDeleteDocRequest,
        }, async (body) => this.handleSdkCall(sdk_gen.deleteDocumentDocumentsDeleteDocumentDelete({
            client: this.client,
            body,
        })));
    }
    registerQueryData() {
        this.server.registerTool('query_data', {
            title: 'Query Data',
            description: 'Advanced data retrieval endpoint for structured RAG analysis without LLM generation',
            inputSchema: zod_gen.zQueryRequest,
        }, async (body) => this.handleSdkCall(sdk_gen.queryDataQueryDataPost({
            client: this.client,
            body,
        })));
    }
    registerCreateEntity() {
        this.server.registerTool('create_entity', {
            title: 'Create Entity',
            description: 'Create a new entity in the knowledge graph',
            inputSchema: zod_gen.zEntityCreateRequest,
        }, async (body) => this.handleSdkCall(sdk_gen.createEntityGraphEntityCreatePost({
            client: this.client,
            body,
        })));
    }
    registerUpdateEntity() {
        this.server.registerTool('update_entity', {
            title: 'Update Entity',
            description: 'Update an entity\'s properties in the knowledge graph',
            inputSchema: zod_gen.zEntityUpdateRequest,
        }, async (body) => this.handleSdkCall(sdk_gen.updateEntityGraphEntityEditPost({
            client: this.client,
            body,
        })));
    }
    registerDeleteEntity() {
        this.server.registerTool('delete_entity', {
            title: 'Delete Entity',
            description: 'Remove an entity and all its relationships from the knowledge graph',
            inputSchema: zod_gen.zDeleteEntityRequest,
        }, async (body) => this.handleSdkCall(sdk_gen.deleteEntityDocumentsDeleteEntityDelete({
            client: this.client,
            body,
        })));
    }
    registerMergeEntities() {
        this.server.registerTool('merge_entities', {
            title: 'Merge Entities',
            description: 'Merge multiple entities into a single entity, preserving all relationships',
            inputSchema: zod_gen.zEntityMergeRequest,
        }, async (body) => this.handleSdkCall(sdk_gen.mergeEntitiesGraphEntitiesMergePost({
            client: this.client,
            body,
        })));
    }
    registerCreateRelation() {
        this.server.registerTool('create_relation', {
            title: 'Create Relation',
            description: 'Create a new relationship between two entities in the knowledge graph',
            inputSchema: zod_gen.zRelationCreateRequest,
        }, async (body) => this.handleSdkCall(sdk_gen.createRelationGraphRelationCreatePost({
            client: this.client,
            body,
        })));
    }
    registerUpdateRelation() {
        this.server.registerTool('update_relation', {
            title: 'Update Relation',
            description: 'Update a relation\'s properties in the knowledge graph',
            inputSchema: zod_gen.zRelationUpdateRequest,
        }, async (body) => this.handleSdkCall(sdk_gen.updateRelationGraphRelationEditPost({
            client: this.client,
            body,
        })));
    }
    registerDeleteRelation() {
        this.server.registerTool('delete_relation', {
            title: 'Delete Relation',
            description: 'Remove a relationship between two entities from the knowledge graph',
            inputSchema: zod_gen.zDeleteRelationRequest,
        }, async (body) => this.handleSdkCall(sdk_gen.deleteRelationDocumentsDeleteRelationDelete({
            client: this.client,
            body,
        })));
    }
    registerClearCache() {
        this.server.registerTool('clear_cache', {
            title: 'Clear Cache',
            description: 'Clear all cache data from the LLM response cache storage',
            inputSchema: zod_gen.zClearCacheRequest,
        }, async (body) => this.handleSdkCall(sdk_gen.clearCacheDocumentsClearCachePost({
            client: this.client,
            body,
        })));
    }
    registerScanDocuments() {
        this.server.registerTool('scan_documents', {
            title: 'Scan Documents',
            description: 'Trigger scanning process for new documents in the input directory',
            inputSchema: z__namespace.object({}),
        }, async () => this.handleSdkCall(sdk_gen.scanForNewDocumentsDocumentsScanPost({
            client: this.client,
        })));
    }
    registerGetDocumentStatusCounts() {
        this.server.registerTool('get_document_status_counts', {
            title: 'Get Document Status Counts',
            description: 'Get counts of documents by status',
            inputSchema: z__namespace.object({}),
        }, async () => this.handleSdkCall(sdk_gen.getDocumentStatusCountsDocumentsStatusCountsGet({
            client: this.client,
        })));
    }
    registerClearDocuments() {
        this.server.registerTool('clear_documents', {
            title: 'Clear Documents',
            description: 'Clear all documents from the RAG system',
            inputSchema: z__namespace.object({}),
        }, async () => this.handleSdkCall(sdk_gen.clearDocumentsDocumentsDelete({
            client: this.client,
        })));
    }
    registerReprocessFailed() {
        this.server.registerTool('reprocess_failed', {
            title: 'Reprocess Failed Documents',
            description: 'Reprocess failed and pending documents',
            inputSchema: z__namespace.object({}),
        }, async () => this.handleSdkCall(sdk_gen.reprocessFailedDocumentsDocumentsReprocessFailedPost({
            client: this.client,
        })));
    }
    registerGetPipelineStatus() {
        this.server.registerTool('get_pipeline_status', {
            title: 'Get Pipeline Status',
            description: 'Get the current status of the document indexing pipeline',
            inputSchema: z__namespace.object({}),
        }, async () => this.handleSdkCall(sdk_gen.getPipelineStatusDocumentsPipelineStatusGet({
            client: this.client,
        })));
    }
    registerCancelPipeline() {
        this.server.registerTool('cancel_pipeline', {
            title: 'Cancel Pipeline',
            description: 'Request cancellation of the currently running pipeline',
            inputSchema: z__namespace.object({}),
        }, async () => this.handleSdkCall(sdk_gen.cancelPipelineDocumentsCancelPipelinePost({
            client: this.client,
        })));
    }
    registerGetGraphLabels() {
        this.server.registerTool('get_graph_labels', {
            title: 'Get Graph Labels',
            description: 'Get all graph labels',
            inputSchema: z__namespace.object({}),
        }, async () => this.handleSdkCall(sdk_gen.getGraphLabelsGraphLabelListGet({
            client: this.client,
        })));
    }
    registerGetTrackStatus() {
        this.server.registerTool('get_track_status', {
            title: 'Get Track Status',
            description: 'Get the processing status of documents by tracking ID',
            inputSchema: zod_gen.zGetTrackStatusDocumentsTrackStatusTrackIdGetPath,
        }, async (path) => this.handleSdkCall(sdk_gen.getTrackStatusDocumentsTrackStatusTrackIdGet({
            client: this.client,
            path,
        })));
    }
    registerGetPopularLabels() {
        this.server.registerTool('get_popular_labels', {
            title: 'Get Popular Labels',
            description: 'Get popular labels by node degree (most connected entities)',
            inputSchema: zod_gen.zGetPopularLabelsGraphLabelPopularGetQuery,
        }, async (query) => this.handleSdkCall(sdk_gen.getPopularLabelsGraphLabelPopularGet({
            client: this.client,
            query,
        })));
    }
    registerSearchLabels() {
        this.server.registerTool('search_labels', {
            title: 'Search Labels',
            description: 'Search labels with fuzzy matching',
            inputSchema: zod_gen.zSearchLabelsGraphLabelSearchGetQuery,
        }, async (query) => this.handleSdkCall(sdk_gen.searchLabelsGraphLabelSearchGet({
            client: this.client,
            query,
        })));
    }
    registerGetKnowledgeGraph() {
        this.server.registerTool('get_knowledge_graph', {
            title: 'Get Knowledge Graph',
            description: 'Retrieve a connected subgraph of nodes',
            inputSchema: zod_gen.zGetKnowledgeGraphGraphsGetQuery,
        }, async (query) => this.handleSdkCall(sdk_gen.getKnowledgeGraphGraphsGet({
            client: this.client,
            query,
        })));
    }
    registerCheckEntityExists() {
        this.server.registerTool('check_entity_exists', {
            title: 'Check Entity Exists',
            description: 'Check if an entity with the given name exists in the knowledge graph',
            inputSchema: zod_gen.zCheckEntityExistsGraphEntityExistsGetQuery,
        }, async (query) => this.handleSdkCall(sdk_gen.checkEntityExistsGraphEntityExistsGet({
            client: this.client,
            query,
        })));
    }
    init() {
        this.registerInsertText();
        this.registerInsertTexts();
        this.registerScanDocuments();
        this.registerGetDocumentsPaginated();
        this.registerGetDocumentStatusCounts();
        this.registerGetTrackStatus();
        this.registerDeleteDocument();
        this.registerClearDocuments();
        this.registerClearCache();
        this.registerReprocessFailed();
        this.registerQueryText();
        this.registerQueryData();
        this.registerGetGraphLabels();
        this.registerGetPopularLabels();
        this.registerSearchLabels();
        this.registerGetKnowledgeGraph();
        this.registerCheckEntityExists();
        this.registerCreateEntity();
        this.registerUpdateEntity();
        this.registerDeleteEntity();
        this.registerMergeEntities();
        this.registerCreateRelation();
        this.registerUpdateRelation();
        this.registerDeleteRelation();
        this.registerGetPipelineStatus();
        this.registerCancelPipeline();
    }
    async start() {
        const transport = new server.StdioServerTransport();
        await this.server.connect(transport);
        process.on('SIGINT', async () => {
            await this.close();
            process.exit(0);
        });
    }
    async close() {
        await this.server.close();
    }
}

exports.LightRagServer = LightRagServer;
