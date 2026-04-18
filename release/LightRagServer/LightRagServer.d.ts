import type { Implementation, ServerOptions } from '@modelcontextprotocol/server';
import type { Config } from '../gen/client';
export interface LightRagServerParams {
    apiKey?: string;
    implementation?: Implementation;
    serverOptions?: ServerOptions;
    clientOptions?: Config;
}
export declare class LightRagServer {
    private readonly server;
    private readonly params;
    private readonly client;
    constructor(params?: LightRagServerParams);
    private handleSdkCall;
    private registerInsertText;
    private registerQueryText;
    private registerInsertTexts;
    private registerGetDocumentsPaginated;
    private registerDeleteDocument;
    private registerQueryData;
    private registerCreateEntity;
    private registerUpdateEntity;
    private registerDeleteEntity;
    private registerMergeEntities;
    private registerCreateRelation;
    private registerUpdateRelation;
    private registerDeleteRelation;
    private registerClearCache;
    private registerScanDocuments;
    private registerGetDocumentStatusCounts;
    private registerClearDocuments;
    private registerReprocessFailed;
    private registerGetPipelineStatus;
    private registerCancelPipeline;
    private registerGetGraphLabels;
    private registerGetTrackStatus;
    private registerGetPopularLabels;
    private registerSearchLabels;
    private registerGetKnowledgeGraph;
    private registerCheckEntityExists;
    private init;
    start(): Promise<void>;
    close(): Promise<void>;
}
