export type ClientOptions = {
    baseUrl: 'http://localhost:9621' | (string & {});
};
/**
 * Body_login_login_post
 */
export type BodyLoginLoginPost = {
    /**
     * Grant Type
     */
    grant_type?: string | null;
    /**
     * Username
     */
    username: string;
    /**
     * Password
     */
    password: string;
    /**
     * Scope
     */
    scope?: string;
    /**
     * Client Id
     */
    client_id?: string | null;
    /**
     * Client Secret
     */
    client_secret?: string | null;
};
/**
 * Body_upload_to_input_dir_documents_upload_post
 */
export type BodyUploadToInputDirDocumentsUploadPost = {
    /**
     * File
     */
    file: Blob | File;
};
/**
 * CancelPipelineResponse
 *
 * Response model for pipeline cancellation operation
 *
 * Attributes:
 * status: Status of the cancellation request
 * message: Message describing the operation result
 */
export type CancelPipelineResponse = {
    /**
     * Status
     *
     * Status of the cancellation request
     */
    status: 'cancellation_requested' | 'not_busy';
    /**
     * Message
     *
     * Human-readable message describing the operation
     */
    message: string;
};
/**
 * ClearCacheRequest
 *
 * Request model for clearing cache
 *
 * This model is kept for API compatibility but no longer accepts any parameters.
 * All cache will be cleared regardless of the request content.
 */
export type ClearCacheRequest = {
    [key: string]: unknown;
};
/**
 * ClearCacheResponse
 *
 * Response model for cache clearing operation
 *
 * Attributes:
 * status: Status of the clear operation
 * message: Detailed message describing the operation result
 */
export type ClearCacheResponse = {
    /**
     * Status
     *
     * Status of the clear operation
     */
    status: 'success' | 'fail';
    /**
     * Message
     *
     * Message describing the operation result
     */
    message: string;
};
/**
 * ClearDocumentsResponse
 *
 * Response model for document clearing operation
 *
 * Attributes:
 * status: Status of the clear operation
 * message: Detailed message describing the operation result
 */
export type ClearDocumentsResponse = {
    /**
     * Status
     *
     * Status of the clear operation
     */
    status: 'success' | 'partial_success' | 'busy' | 'fail';
    /**
     * Message
     *
     * Message describing the operation result
     */
    message: string;
};
/**
 * DeleteDocByIdResponse
 *
 * Response model for single document deletion operation.
 */
export type DeleteDocByIdResponse = {
    /**
     * Status
     *
     * Status of the deletion operation
     */
    status: 'deletion_started' | 'busy' | 'not_allowed';
    /**
     * Message
     *
     * Message describing the operation result
     */
    message: string;
    /**
     * Doc Id
     *
     * The ID of the document to delete
     */
    doc_id: string;
};
/**
 * DeleteDocRequest
 */
export type DeleteDocRequest = {
    /**
     * Doc Ids
     *
     * The IDs of the documents to delete.
     */
    doc_ids: Array<string>;
    /**
     * Delete File
     *
     * Whether to delete the corresponding file in the upload directory.
     */
    delete_file?: boolean;
    /**
     * Delete Llm Cache
     *
     * Whether to delete cached LLM extraction results for the documents.
     */
    delete_llm_cache?: boolean;
};
/**
 * DeleteEntityRequest
 */
export type DeleteEntityRequest = {
    /**
     * Entity Name
     *
     * The name of the entity to delete.
     */
    entity_name: string;
};
/**
 * DeleteRelationRequest
 */
export type DeleteRelationRequest = {
    /**
     * Source Entity
     *
     * The name of the source entity.
     */
    source_entity: string;
    /**
     * Target Entity
     *
     * The name of the target entity.
     */
    target_entity: string;
};
/**
 * DeletionResult
 *
 * Represents the result of a deletion operation.
 */
export type DeletionResult = {
    /**
     * Status
     */
    status: 'success' | 'not_found' | 'not_allowed' | 'fail';
    /**
     * Doc Id
     */
    doc_id: string;
    /**
     * Message
     */
    message: string;
    /**
     * Status Code
     */
    status_code?: number;
    /**
     * File Path
     */
    file_path?: string | null;
};
/**
 * DocStatus
 *
 * Document processing status
 */
export type DocStatus = 'pending' | 'processing' | 'preprocessed' | 'processed' | 'failed';
/**
 * DocStatusResponse
 */
export type DocStatusResponse = {
    /**
     * Id
     *
     * Document identifier
     */
    id: string;
    /**
     * Content Summary
     *
     * Summary of document content
     */
    content_summary: string;
    /**
     * Content Length
     *
     * Length of document content in characters
     */
    content_length: number;
    /**
     * Current processing status
     */
    status: DocStatus;
    /**
     * Created At
     *
     * Creation timestamp (ISO format string)
     */
    created_at: string;
    /**
     * Updated At
     *
     * Last update timestamp (ISO format string)
     */
    updated_at: string;
    /**
     * Track Id
     *
     * Tracking ID for monitoring progress
     */
    track_id?: string | null;
    /**
     * Chunks Count
     *
     * Number of chunks the document was split into
     */
    chunks_count?: number | null;
    /**
     * Error Msg
     *
     * Error message if processing failed
     */
    error_msg?: string | null;
    /**
     * Metadata
     *
     * Additional metadata about the document
     */
    metadata?: {
        [key: string]: unknown;
    } | null;
    /**
     * File Path
     *
     * Path to the document file
     */
    file_path: string;
};
/**
 * DocsStatusesResponse
 *
 * Response model for document statuses
 *
 * Attributes:
 * statuses: Dictionary mapping document status to lists of document status responses
 */
export type DocsStatusesResponse = {
    /**
     * Statuses
     *
     * Dictionary mapping document status to lists of document status responses
     */
    statuses?: {
        [key in DocStatus]?: Array<DocStatusResponse>;
    };
};
/**
 * DocumentsRequest
 *
 * Request model for paginated document queries
 *
 * Attributes:
 * status_filter: Filter by document status, None for all statuses
 * page: Page number (1-based)
 * page_size: Number of documents per page (10-200)
 * sort_field: Field to sort by ('created_at', 'updated_at', 'id', 'file_path')
 * sort_direction: Sort direction ('asc' or 'desc')
 */
export type DocumentsRequest = {
    /**
     * Filter by document status, None for all statuses
     */
    status_filter?: DocStatus | null;
    /**
     * Page
     *
     * Page number (1-based)
     */
    page?: number;
    /**
     * Page Size
     *
     * Number of documents per page (10-200)
     */
    page_size?: number;
    /**
     * Sort Field
     *
     * Field to sort by
     */
    sort_field?: 'created_at' | 'updated_at' | 'id' | 'file_path';
    /**
     * Sort Direction
     *
     * Sort direction
     */
    sort_direction?: 'asc' | 'desc';
};
/**
 * EntityCreateRequest
 */
export type EntityCreateRequest = {
    /**
     * Entity Name
     *
     * Unique name for the new entity
     */
    entity_name: string;
    /**
     * Entity Data
     *
     * Dictionary containing entity properties. Common fields include 'description' and 'entity_type'.
     */
    entity_data: {
        [key: string]: unknown;
    };
};
/**
 * EntityMergeRequest
 */
export type EntityMergeRequest = {
    /**
     * Entities To Change
     *
     * List of entity names to be merged and deleted. These are typically duplicate or misspelled entities.
     */
    entities_to_change: Array<string>;
    /**
     * Entity To Change Into
     *
     * Target entity name that will receive all relationships from the source entities. This entity will be preserved.
     */
    entity_to_change_into: string;
};
/**
 * EntityUpdateRequest
 */
export type EntityUpdateRequest = {
    /**
     * Entity Name
     */
    entity_name: string;
    /**
     * Updated Data
     */
    updated_data: {
        [key: string]: unknown;
    };
    /**
     * Allow Rename
     */
    allow_rename?: boolean;
    /**
     * Allow Merge
     */
    allow_merge?: boolean;
};
/**
 * HTTPValidationError
 */
export type HttpValidationError = {
    /**
     * Detail
     */
    detail?: Array<ValidationError>;
};
/**
 * InsertResponse
 *
 * Response model for document insertion operations
 *
 * Attributes:
 * status: Status of the operation (success, duplicated, partial_success, failure)
 * message: Detailed message describing the operation result
 * track_id: Tracking ID for monitoring processing status
 */
export type InsertResponse = {
    /**
     * Status
     *
     * Status of the operation
     */
    status: 'success' | 'duplicated' | 'partial_success' | 'failure';
    /**
     * Message
     *
     * Message describing the operation result
     */
    message: string;
    /**
     * Track Id
     *
     * Tracking ID for monitoring processing status
     */
    track_id: string;
};
/**
 * InsertTextRequest
 *
 * Request model for inserting a single text document
 *
 * Attributes:
 * text: The text content to be inserted into the RAG system
 * file_source: Source of the text (optional)
 */
export type InsertTextRequest = {
    /**
     * Text
     *
     * The text to insert
     */
    text: string;
    /**
     * File Source
     *
     * File Source
     */
    file_source?: string | null;
};
/**
 * InsertTextsRequest
 *
 * Request model for inserting multiple text documents
 *
 * Attributes:
 * texts: List of text contents to be inserted into the RAG system
 * file_sources: Sources of the texts (optional)
 */
export type InsertTextsRequest = {
    /**
     * Texts
     *
     * The texts to insert
     */
    texts: Array<string>;
    /**
     * File Sources
     *
     * Sources of the texts
     */
    file_sources?: Array<string> | null;
};
/**
 * PaginatedDocsResponse
 *
 * Response model for paginated document queries
 *
 * Attributes:
 * documents: List of documents for the current page
 * pagination: Pagination information
 * status_counts: Count of documents by status for all documents
 */
export type PaginatedDocsResponse = {
    /**
     * Documents
     *
     * List of documents for the current page
     */
    documents: Array<DocStatusResponse>;
    /**
     * Pagination information
     */
    pagination: PaginationInfo;
    /**
     * Status Counts
     *
     * Count of documents by status for all documents
     */
    status_counts: {
        [key: string]: number;
    };
};
/**
 * PaginationInfo
 *
 * Pagination information
 *
 * Attributes:
 * page: Current page number
 * page_size: Number of items per page
 * total_count: Total number of items
 * total_pages: Total number of pages
 * has_next: Whether there is a next page
 * has_prev: Whether there is a previous page
 */
export type PaginationInfo = {
    /**
     * Page
     *
     * Current page number
     */
    page: number;
    /**
     * Page Size
     *
     * Number of items per page
     */
    page_size: number;
    /**
     * Total Count
     *
     * Total number of items
     */
    total_count: number;
    /**
     * Total Pages
     *
     * Total number of pages
     */
    total_pages: number;
    /**
     * Has Next
     *
     * Whether there is a next page
     */
    has_next: boolean;
    /**
     * Has Prev
     *
     * Whether there is a previous page
     */
    has_prev: boolean;
};
/**
 * PipelineStatusResponse
 *
 * Response model for pipeline status
 *
 * Attributes:
 * autoscanned: Whether auto-scan has started
 * busy: Whether the pipeline is currently busy
 * job_name: Current job name (e.g., indexing files/indexing texts)
 * job_start: Job start time as ISO format string with timezone (optional)
 * docs: Total number of documents to be indexed
 * batchs: Number of batches for processing documents
 * cur_batch: Current processing batch
 * request_pending: Flag for pending request for processing
 * latest_message: Latest message from pipeline processing
 * history_messages: List of history messages
 * update_status: Status of update flags for all namespaces
 */
export type PipelineStatusResponse = {
    /**
     * Autoscanned
     */
    autoscanned?: boolean;
    /**
     * Busy
     */
    busy?: boolean;
    /**
     * Job Name
     */
    job_name?: string;
    /**
     * Job Start
     */
    job_start?: string | null;
    /**
     * Docs
     */
    docs?: number;
    /**
     * Batchs
     */
    batchs?: number;
    /**
     * Cur Batch
     */
    cur_batch?: number;
    /**
     * Request Pending
     */
    request_pending?: boolean;
    /**
     * Latest Message
     */
    latest_message?: string;
    /**
     * History Messages
     */
    history_messages?: Array<string> | null;
    /**
     * Update Status
     */
    update_status?: {
        [key: string]: unknown;
    } | null;
    [key: string]: unknown;
};
/**
 * QueryDataResponse
 */
export type QueryDataResponse = {
    /**
     * Status
     *
     * Query execution status
     */
    status: string;
    /**
     * Message
     *
     * Status message
     */
    message: string;
    /**
     * Data
     *
     * Query result data containing entities, relationships, chunks, and references
     */
    data: {
        [key: string]: unknown;
    };
    /**
     * Metadata
     *
     * Query metadata including mode, keywords, and processing information
     */
    metadata: {
        [key: string]: unknown;
    };
};
/**
 * QueryRequest
 */
export type QueryRequest = {
    /**
     * Query
     *
     * The query text
     */
    query: string;
    /**
     * Mode
     *
     * Query mode
     */
    mode?: 'local' | 'global' | 'hybrid' | 'naive' | 'mix' | 'bypass';
    /**
     * Only Need Context
     *
     * If True, only returns the retrieved context without generating a response.
     */
    only_need_context?: boolean | null;
    /**
     * Only Need Prompt
     *
     * If True, only returns the generated prompt without producing a response.
     */
    only_need_prompt?: boolean | null;
    /**
     * Response Type
     *
     * Defines the response format. Examples: 'Multiple Paragraphs', 'Single Paragraph', 'Bullet Points'.
     */
    response_type?: string | null;
    /**
     * Top K
     *
     * Number of top items to retrieve. Represents entities in 'local' mode and relationships in 'global' mode.
     */
    top_k?: number | null;
    /**
     * Chunk Top K
     *
     * Number of text chunks to retrieve initially from vector search and keep after reranking.
     */
    chunk_top_k?: number | null;
    /**
     * Max Entity Tokens
     *
     * Maximum number of tokens allocated for entity context in unified token control system.
     */
    max_entity_tokens?: number | null;
    /**
     * Max Relation Tokens
     *
     * Maximum number of tokens allocated for relationship context in unified token control system.
     */
    max_relation_tokens?: number | null;
    /**
     * Max Total Tokens
     *
     * Maximum total tokens budget for the entire query context (entities + relations + chunks + system prompt).
     */
    max_total_tokens?: number | null;
    /**
     * Hl Keywords
     *
     * List of high-level keywords to prioritize in retrieval. Leave empty to use the LLM to generate the keywords.
     */
    hl_keywords?: Array<string>;
    /**
     * Ll Keywords
     *
     * List of low-level keywords to refine retrieval focus. Leave empty to use the LLM to generate the keywords.
     */
    ll_keywords?: Array<string>;
    /**
     * Conversation History
     *
     * History messages are only sent to LLM for context, not used for retrieval. Format: [{'role': 'user/assistant', 'content': 'message'}].
     */
    conversation_history?: Array<{
        [key: string]: unknown;
    }> | null;
    /**
     * User Prompt
     *
     * User-provided prompt for the query. If provided, this will be used instead of the default value from prompt template.
     */
    user_prompt?: string | null;
    /**
     * Enable Rerank
     *
     * Enable reranking for retrieved text chunks. If True but no rerank model is configured, a warning will be issued. Default is True.
     */
    enable_rerank?: boolean | null;
    /**
     * Include References
     *
     * If True, includes reference list in responses. Affects /query and /query/stream endpoints. /query/data always includes references.
     */
    include_references?: boolean | null;
    /**
     * Include Chunk Content
     *
     * If True, includes actual chunk text content in references. Only applies when include_references=True. Useful for evaluation and debugging.
     */
    include_chunk_content?: boolean | null;
    /**
     * Stream
     *
     * If True, enables streaming output for real-time responses. Only affects /query/stream endpoint.
     */
    stream?: boolean | null;
};
/**
 * QueryResponse
 */
export type QueryResponse = {
    /**
     * Response
     *
     * The generated response
     */
    response: string;
    /**
     * References
     *
     * Reference list (Disabled when include_references=False, /query/data always includes references.)
     */
    references?: Array<ReferenceItem> | null;
};
/**
 * ReferenceItem
 *
 * A single reference item in query responses.
 */
export type ReferenceItem = {
    /**
     * Reference Id
     *
     * Unique reference identifier
     */
    reference_id: string;
    /**
     * File Path
     *
     * Path to the source file
     */
    file_path: string;
    /**
     * Content
     *
     * List of chunk contents from this file (only present when include_chunk_content=True)
     */
    content?: Array<string> | null;
};
/**
 * RelationCreateRequest
 */
export type RelationCreateRequest = {
    /**
     * Source Entity
     *
     * Name of the source entity. This entity must already exist in the knowledge graph.
     */
    source_entity: string;
    /**
     * Target Entity
     *
     * Name of the target entity. This entity must already exist in the knowledge graph.
     */
    target_entity: string;
    /**
     * Relation Data
     *
     * Dictionary containing relationship properties. Common fields include 'description', 'keywords', and 'weight'.
     */
    relation_data: {
        [key: string]: unknown;
    };
};
/**
 * RelationUpdateRequest
 */
export type RelationUpdateRequest = {
    /**
     * Source Id
     */
    source_id: string;
    /**
     * Target Id
     */
    target_id: string;
    /**
     * Updated Data
     */
    updated_data: {
        [key: string]: unknown;
    };
};
/**
 * ReprocessResponse
 *
 * Response model for reprocessing failed documents operation
 *
 * Attributes:
 * status: Status of the reprocessing operation
 * message: Message describing the operation result
 * track_id: Always empty string. Reprocessed documents retain their original track_id.
 */
export type ReprocessResponse = {
    /**
     * Status
     *
     * Status of the reprocessing operation
     */
    status: 'reprocessing_started';
    /**
     * Message
     *
     * Human-readable message describing the operation
     */
    message: string;
    /**
     * Track Id
     *
     * Always empty string. Reprocessed documents retain their original track_id from initial upload.
     */
    track_id?: string;
};
/**
 * ScanResponse
 *
 * Response model for document scanning operation
 *
 * Attributes:
 * status: Status of the scanning operation
 * message: Optional message with additional details
 * track_id: Tracking ID for monitoring scanning progress
 */
export type ScanResponse = {
    /**
     * Status
     *
     * Status of the scanning operation
     */
    status: 'scanning_started';
    /**
     * Message
     *
     * Additional details about the scanning operation
     */
    message?: string | null;
    /**
     * Track Id
     *
     * Tracking ID for monitoring scanning progress
     */
    track_id: string;
};
/**
 * StatusCountsResponse
 *
 * Response model for document status counts
 *
 * Attributes:
 * status_counts: Count of documents by status
 */
export type StatusCountsResponse = {
    /**
     * Status Counts
     *
     * Count of documents by status
     */
    status_counts: {
        [key: string]: number;
    };
};
/**
 * TrackStatusResponse
 *
 * Response model for tracking document processing status by track_id
 *
 * Attributes:
 * track_id: The tracking ID
 * documents: List of documents associated with this track_id
 * total_count: Total number of documents for this track_id
 * status_summary: Count of documents by status
 */
export type TrackStatusResponse = {
    /**
     * Track Id
     *
     * The tracking ID
     */
    track_id: string;
    /**
     * Documents
     *
     * List of documents associated with this track_id
     */
    documents: Array<DocStatusResponse>;
    /**
     * Total Count
     *
     * Total number of documents for this track_id
     */
    total_count: number;
    /**
     * Status Summary
     *
     * Count of documents by status
     */
    status_summary: {
        [key: string]: number;
    };
};
/**
 * ValidationError
 */
export type ValidationError = {
    /**
     * Location
     */
    loc: Array<string | number>;
    /**
     * Message
     */
    msg: string;
    /**
     * Error Type
     */
    type: string;
    /**
     * Input
     */
    input?: unknown;
    /**
     * Context
     */
    ctx?: {
        [key: string]: unknown;
    };
};
export type ScanForNewDocumentsDocumentsScanPostData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/documents/scan';
};
export type ScanForNewDocumentsDocumentsScanPostResponses = {
    /**
     * Successful Response
     */
    200: ScanResponse;
};
export type ScanForNewDocumentsDocumentsScanPostResponse = ScanForNewDocumentsDocumentsScanPostResponses[keyof ScanForNewDocumentsDocumentsScanPostResponses];
export type UploadToInputDirDocumentsUploadPostData = {
    body: BodyUploadToInputDirDocumentsUploadPost;
    path?: never;
    query?: never;
    url: '/documents/upload';
};
export type UploadToInputDirDocumentsUploadPostErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
export type UploadToInputDirDocumentsUploadPostError = UploadToInputDirDocumentsUploadPostErrors[keyof UploadToInputDirDocumentsUploadPostErrors];
export type UploadToInputDirDocumentsUploadPostResponses = {
    /**
     * Successful Response
     */
    200: InsertResponse;
};
export type UploadToInputDirDocumentsUploadPostResponse = UploadToInputDirDocumentsUploadPostResponses[keyof UploadToInputDirDocumentsUploadPostResponses];
export type InsertTextDocumentsTextPostData = {
    body: InsertTextRequest;
    path?: never;
    query?: never;
    url: '/documents/text';
};
export type InsertTextDocumentsTextPostErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
export type InsertTextDocumentsTextPostError = InsertTextDocumentsTextPostErrors[keyof InsertTextDocumentsTextPostErrors];
export type InsertTextDocumentsTextPostResponses = {
    /**
     * Successful Response
     */
    200: InsertResponse;
};
export type InsertTextDocumentsTextPostResponse = InsertTextDocumentsTextPostResponses[keyof InsertTextDocumentsTextPostResponses];
export type InsertTextsDocumentsTextsPostData = {
    body: InsertTextsRequest;
    path?: never;
    query?: never;
    url: '/documents/texts';
};
export type InsertTextsDocumentsTextsPostErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
export type InsertTextsDocumentsTextsPostError = InsertTextsDocumentsTextsPostErrors[keyof InsertTextsDocumentsTextsPostErrors];
export type InsertTextsDocumentsTextsPostResponses = {
    /**
     * Successful Response
     */
    200: InsertResponse;
};
export type InsertTextsDocumentsTextsPostResponse = InsertTextsDocumentsTextsPostResponses[keyof InsertTextsDocumentsTextsPostResponses];
export type ClearDocumentsDocumentsDeleteData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/documents';
};
export type ClearDocumentsDocumentsDeleteResponses = {
    /**
     * Successful Response
     */
    200: ClearDocumentsResponse;
};
export type ClearDocumentsDocumentsDeleteResponse = ClearDocumentsDocumentsDeleteResponses[keyof ClearDocumentsDocumentsDeleteResponses];
export type DocumentsDocumentsGetData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/documents';
};
export type DocumentsDocumentsGetResponses = {
    /**
     * Successful Response
     */
    200: DocsStatusesResponse;
};
export type DocumentsDocumentsGetResponse = DocumentsDocumentsGetResponses[keyof DocumentsDocumentsGetResponses];
export type GetPipelineStatusDocumentsPipelineStatusGetData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/documents/pipeline_status';
};
export type GetPipelineStatusDocumentsPipelineStatusGetResponses = {
    /**
     * Successful Response
     */
    200: PipelineStatusResponse;
};
export type GetPipelineStatusDocumentsPipelineStatusGetResponse = GetPipelineStatusDocumentsPipelineStatusGetResponses[keyof GetPipelineStatusDocumentsPipelineStatusGetResponses];
export type DeleteDocumentDocumentsDeleteDocumentDeleteData = {
    body: DeleteDocRequest;
    path?: never;
    query?: never;
    url: '/documents/delete_document';
};
export type DeleteDocumentDocumentsDeleteDocumentDeleteErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
export type DeleteDocumentDocumentsDeleteDocumentDeleteError = DeleteDocumentDocumentsDeleteDocumentDeleteErrors[keyof DeleteDocumentDocumentsDeleteDocumentDeleteErrors];
export type DeleteDocumentDocumentsDeleteDocumentDeleteResponses = {
    /**
     * Successful Response
     */
    200: DeleteDocByIdResponse;
};
export type DeleteDocumentDocumentsDeleteDocumentDeleteResponse = DeleteDocumentDocumentsDeleteDocumentDeleteResponses[keyof DeleteDocumentDocumentsDeleteDocumentDeleteResponses];
export type ClearCacheDocumentsClearCachePostData = {
    body: ClearCacheRequest;
    path?: never;
    query?: never;
    url: '/documents/clear_cache';
};
export type ClearCacheDocumentsClearCachePostErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
export type ClearCacheDocumentsClearCachePostError = ClearCacheDocumentsClearCachePostErrors[keyof ClearCacheDocumentsClearCachePostErrors];
export type ClearCacheDocumentsClearCachePostResponses = {
    /**
     * Successful Response
     */
    200: ClearCacheResponse;
};
export type ClearCacheDocumentsClearCachePostResponse = ClearCacheDocumentsClearCachePostResponses[keyof ClearCacheDocumentsClearCachePostResponses];
export type DeleteEntityDocumentsDeleteEntityDeleteData = {
    body: DeleteEntityRequest;
    path?: never;
    query?: never;
    url: '/documents/delete_entity';
};
export type DeleteEntityDocumentsDeleteEntityDeleteErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
export type DeleteEntityDocumentsDeleteEntityDeleteError = DeleteEntityDocumentsDeleteEntityDeleteErrors[keyof DeleteEntityDocumentsDeleteEntityDeleteErrors];
export type DeleteEntityDocumentsDeleteEntityDeleteResponses = {
    /**
     * Successful Response
     */
    200: DeletionResult;
};
export type DeleteEntityDocumentsDeleteEntityDeleteResponse = DeleteEntityDocumentsDeleteEntityDeleteResponses[keyof DeleteEntityDocumentsDeleteEntityDeleteResponses];
export type DeleteRelationDocumentsDeleteRelationDeleteData = {
    body: DeleteRelationRequest;
    path?: never;
    query?: never;
    url: '/documents/delete_relation';
};
export type DeleteRelationDocumentsDeleteRelationDeleteErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
export type DeleteRelationDocumentsDeleteRelationDeleteError = DeleteRelationDocumentsDeleteRelationDeleteErrors[keyof DeleteRelationDocumentsDeleteRelationDeleteErrors];
export type DeleteRelationDocumentsDeleteRelationDeleteResponses = {
    /**
     * Successful Response
     */
    200: DeletionResult;
};
export type DeleteRelationDocumentsDeleteRelationDeleteResponse = DeleteRelationDocumentsDeleteRelationDeleteResponses[keyof DeleteRelationDocumentsDeleteRelationDeleteResponses];
export type GetTrackStatusDocumentsTrackStatusTrackIdGetData = {
    body?: never;
    path: {
        /**
         * Track Id
         */
        track_id: string;
    };
    query?: never;
    url: '/documents/track_status/{track_id}';
};
export type GetTrackStatusDocumentsTrackStatusTrackIdGetErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
export type GetTrackStatusDocumentsTrackStatusTrackIdGetError = GetTrackStatusDocumentsTrackStatusTrackIdGetErrors[keyof GetTrackStatusDocumentsTrackStatusTrackIdGetErrors];
export type GetTrackStatusDocumentsTrackStatusTrackIdGetResponses = {
    /**
     * Successful Response
     */
    200: TrackStatusResponse;
};
export type GetTrackStatusDocumentsTrackStatusTrackIdGetResponse = GetTrackStatusDocumentsTrackStatusTrackIdGetResponses[keyof GetTrackStatusDocumentsTrackStatusTrackIdGetResponses];
export type GetDocumentsPaginatedDocumentsPaginatedPostData = {
    body: DocumentsRequest;
    path?: never;
    query?: never;
    url: '/documents/paginated';
};
export type GetDocumentsPaginatedDocumentsPaginatedPostErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
export type GetDocumentsPaginatedDocumentsPaginatedPostError = GetDocumentsPaginatedDocumentsPaginatedPostErrors[keyof GetDocumentsPaginatedDocumentsPaginatedPostErrors];
export type GetDocumentsPaginatedDocumentsPaginatedPostResponses = {
    /**
     * Successful Response
     */
    200: PaginatedDocsResponse;
};
export type GetDocumentsPaginatedDocumentsPaginatedPostResponse = GetDocumentsPaginatedDocumentsPaginatedPostResponses[keyof GetDocumentsPaginatedDocumentsPaginatedPostResponses];
export type GetDocumentStatusCountsDocumentsStatusCountsGetData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/documents/status_counts';
};
export type GetDocumentStatusCountsDocumentsStatusCountsGetResponses = {
    /**
     * Successful Response
     */
    200: StatusCountsResponse;
};
export type GetDocumentStatusCountsDocumentsStatusCountsGetResponse = GetDocumentStatusCountsDocumentsStatusCountsGetResponses[keyof GetDocumentStatusCountsDocumentsStatusCountsGetResponses];
export type ReprocessFailedDocumentsDocumentsReprocessFailedPostData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/documents/reprocess_failed';
};
export type ReprocessFailedDocumentsDocumentsReprocessFailedPostResponses = {
    /**
     * Successful Response
     */
    200: ReprocessResponse;
};
export type ReprocessFailedDocumentsDocumentsReprocessFailedPostResponse = ReprocessFailedDocumentsDocumentsReprocessFailedPostResponses[keyof ReprocessFailedDocumentsDocumentsReprocessFailedPostResponses];
export type CancelPipelineDocumentsCancelPipelinePostData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/documents/cancel_pipeline';
};
export type CancelPipelineDocumentsCancelPipelinePostResponses = {
    /**
     * Successful Response
     */
    200: CancelPipelineResponse;
};
export type CancelPipelineDocumentsCancelPipelinePostResponse = CancelPipelineDocumentsCancelPipelinePostResponses[keyof CancelPipelineDocumentsCancelPipelinePostResponses];
export type QueryTextQueryPostData = {
    body: QueryRequest;
    path?: never;
    query?: never;
    url: '/query';
};
export type QueryTextQueryPostErrors = {
    /**
     * Bad Request - Invalid input parameters
     */
    400: {
        detail?: string;
    };
    /**
     * Validation Error
     */
    422: HttpValidationError;
    /**
     * Internal Server Error - Query processing failed
     */
    500: {
        detail?: string;
    };
};
export type QueryTextQueryPostError = QueryTextQueryPostErrors[keyof QueryTextQueryPostErrors];
export type QueryTextQueryPostResponses = {
    /**
     * Successful RAG query response
     */
    200: QueryResponse;
};
export type QueryTextQueryPostResponse = QueryTextQueryPostResponses[keyof QueryTextQueryPostResponses];
export type QueryTextStreamQueryStreamPostData = {
    body: QueryRequest;
    path?: never;
    query?: never;
    url: '/query/stream';
};
export type QueryTextStreamQueryStreamPostErrors = {
    /**
     * Bad Request - Invalid input parameters
     */
    400: {
        detail?: string;
    };
    /**
     * Validation Error
     */
    422: HttpValidationError;
    /**
     * Internal Server Error - Query processing failed
     */
    500: {
        detail?: string;
    };
};
export type QueryTextStreamQueryStreamPostError = QueryTextStreamQueryStreamPostErrors[keyof QueryTextStreamQueryStreamPostErrors];
export type QueryTextStreamQueryStreamPostResponses = {
    /**
     * Flexible RAG query response - format depends on stream parameter
     */
    200: unknown;
};
export type QueryDataQueryDataPostData = {
    body: QueryRequest;
    path?: never;
    query?: never;
    url: '/query/data';
};
export type QueryDataQueryDataPostErrors = {
    /**
     * Bad Request - Invalid input parameters
     */
    400: {
        detail?: string;
    };
    /**
     * Validation Error
     */
    422: HttpValidationError;
    /**
     * Internal Server Error - Data retrieval failed
     */
    500: {
        detail?: string;
    };
};
export type QueryDataQueryDataPostError = QueryDataQueryDataPostErrors[keyof QueryDataQueryDataPostErrors];
export type QueryDataQueryDataPostResponses = {
    /**
     * Successful data retrieval response with structured RAG data
     */
    200: QueryDataResponse;
};
export type QueryDataQueryDataPostResponse = QueryDataQueryDataPostResponses[keyof QueryDataQueryDataPostResponses];
export type GetGraphLabelsGraphLabelListGetData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/graph/label/list';
};
export type GetGraphLabelsGraphLabelListGetResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
export type GetPopularLabelsGraphLabelPopularGetData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Limit
         *
         * Maximum number of popular labels to return
         */
        limit?: number;
    };
    url: '/graph/label/popular';
};
export type GetPopularLabelsGraphLabelPopularGetErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
export type GetPopularLabelsGraphLabelPopularGetError = GetPopularLabelsGraphLabelPopularGetErrors[keyof GetPopularLabelsGraphLabelPopularGetErrors];
export type GetPopularLabelsGraphLabelPopularGetResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
export type SearchLabelsGraphLabelSearchGetData = {
    body?: never;
    path?: never;
    query: {
        /**
         * Q
         *
         * Search query string
         */
        q: string;
        /**
         * Limit
         *
         * Maximum number of search results to return
         */
        limit?: number;
    };
    url: '/graph/label/search';
};
export type SearchLabelsGraphLabelSearchGetErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
export type SearchLabelsGraphLabelSearchGetError = SearchLabelsGraphLabelSearchGetErrors[keyof SearchLabelsGraphLabelSearchGetErrors];
export type SearchLabelsGraphLabelSearchGetResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
export type GetKnowledgeGraphGraphsGetData = {
    body?: never;
    path?: never;
    query: {
        /**
         * Label
         *
         * Label to get knowledge graph for
         */
        label: string;
        /**
         * Max Depth
         *
         * Maximum depth of graph
         */
        max_depth?: number;
        /**
         * Max Nodes
         *
         * Maximum nodes to return
         */
        max_nodes?: number;
    };
    url: '/graphs';
};
export type GetKnowledgeGraphGraphsGetErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
export type GetKnowledgeGraphGraphsGetError = GetKnowledgeGraphGraphsGetErrors[keyof GetKnowledgeGraphGraphsGetErrors];
export type GetKnowledgeGraphGraphsGetResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
export type CheckEntityExistsGraphEntityExistsGetData = {
    body?: never;
    path?: never;
    query: {
        /**
         * Name
         *
         * Entity name to check
         */
        name: string;
    };
    url: '/graph/entity/exists';
};
export type CheckEntityExistsGraphEntityExistsGetErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
export type CheckEntityExistsGraphEntityExistsGetError = CheckEntityExistsGraphEntityExistsGetErrors[keyof CheckEntityExistsGraphEntityExistsGetErrors];
export type CheckEntityExistsGraphEntityExistsGetResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
export type UpdateEntityGraphEntityEditPostData = {
    body: EntityUpdateRequest;
    path?: never;
    query?: never;
    url: '/graph/entity/edit';
};
export type UpdateEntityGraphEntityEditPostErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
export type UpdateEntityGraphEntityEditPostError = UpdateEntityGraphEntityEditPostErrors[keyof UpdateEntityGraphEntityEditPostErrors];
export type UpdateEntityGraphEntityEditPostResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
export type UpdateRelationGraphRelationEditPostData = {
    body: RelationUpdateRequest;
    path?: never;
    query?: never;
    url: '/graph/relation/edit';
};
export type UpdateRelationGraphRelationEditPostErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
export type UpdateRelationGraphRelationEditPostError = UpdateRelationGraphRelationEditPostErrors[keyof UpdateRelationGraphRelationEditPostErrors];
export type UpdateRelationGraphRelationEditPostResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
export type CreateEntityGraphEntityCreatePostData = {
    body: EntityCreateRequest;
    path?: never;
    query?: never;
    url: '/graph/entity/create';
};
export type CreateEntityGraphEntityCreatePostErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
export type CreateEntityGraphEntityCreatePostError = CreateEntityGraphEntityCreatePostErrors[keyof CreateEntityGraphEntityCreatePostErrors];
export type CreateEntityGraphEntityCreatePostResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
export type CreateRelationGraphRelationCreatePostData = {
    body: RelationCreateRequest;
    path?: never;
    query?: never;
    url: '/graph/relation/create';
};
export type CreateRelationGraphRelationCreatePostErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
export type CreateRelationGraphRelationCreatePostError = CreateRelationGraphRelationCreatePostErrors[keyof CreateRelationGraphRelationCreatePostErrors];
export type CreateRelationGraphRelationCreatePostResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
export type MergeEntitiesGraphEntitiesMergePostData = {
    body: EntityMergeRequest;
    path?: never;
    query?: never;
    url: '/graph/entities/merge';
};
export type MergeEntitiesGraphEntitiesMergePostErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
export type MergeEntitiesGraphEntitiesMergePostError = MergeEntitiesGraphEntitiesMergePostErrors[keyof MergeEntitiesGraphEntitiesMergePostErrors];
export type MergeEntitiesGraphEntitiesMergePostResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
export type GetVersionApiVersionGetData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/version';
};
export type GetVersionApiVersionGetResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
export type GetTagsApiTagsGetData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/tags';
};
export type GetTagsApiTagsGetResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
export type GetRunningModelsApiPsGetData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/ps';
};
export type GetRunningModelsApiPsGetResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
export type GenerateApiGeneratePostData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/generate';
};
export type GenerateApiGeneratePostResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
export type ChatApiChatPostData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/chat';
};
export type ChatApiChatPostResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
export type RedirectToWebuiGetData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/';
};
export type RedirectToWebuiGetResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
export type GetAuthStatusAuthStatusGetData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/auth-status';
};
export type GetAuthStatusAuthStatusGetResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
export type LoginLoginPostData = {
    body: BodyLoginLoginPost;
    path?: never;
    query?: never;
    url: '/login';
};
export type LoginLoginPostErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
export type LoginLoginPostError = LoginLoginPostErrors[keyof LoginLoginPostErrors];
export type LoginLoginPostResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
export type GetStatusHealthGetData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/health';
};
export type GetStatusHealthGetResponses = {
    /**
     * Successful response with system status
     */
    200: unknown;
};
