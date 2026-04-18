import * as z from 'zod';
/**
 * Body_login_login_post
 */
export declare const zBodyLoginLoginPost: z.ZodObject<{
    grant_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    username: z.ZodString;
    password: z.ZodString;
    scope: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    client_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    client_secret: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
/**
 * Body_upload_to_input_dir_documents_upload_post
 */
export declare const zBodyUploadToInputDirDocumentsUploadPost: z.ZodObject<{
    file: z.ZodString;
}, z.core.$strip>;
/**
 * CancelPipelineResponse
 *
 * Response model for pipeline cancellation operation
 *
 * Attributes:
 * status: Status of the cancellation request
 * message: Message describing the operation result
 */
export declare const zCancelPipelineResponse: z.ZodObject<{
    status: z.ZodEnum<{
        cancellation_requested: "cancellation_requested";
        not_busy: "not_busy";
    }>;
    message: z.ZodString;
}, z.core.$strip>;
/**
 * ClearCacheRequest
 *
 * Request model for clearing cache
 *
 * This model is kept for API compatibility but no longer accepts any parameters.
 * All cache will be cleared regardless of the request content.
 */
export declare const zClearCacheRequest: z.ZodRecord<z.ZodString, z.ZodUnknown>;
/**
 * ClearCacheResponse
 *
 * Response model for cache clearing operation
 *
 * Attributes:
 * status: Status of the clear operation
 * message: Detailed message describing the operation result
 */
export declare const zClearCacheResponse: z.ZodObject<{
    status: z.ZodEnum<{
        success: "success";
        fail: "fail";
    }>;
    message: z.ZodString;
}, z.core.$strip>;
/**
 * ClearDocumentsResponse
 *
 * Response model for document clearing operation
 *
 * Attributes:
 * status: Status of the clear operation
 * message: Detailed message describing the operation result
 */
export declare const zClearDocumentsResponse: z.ZodObject<{
    status: z.ZodEnum<{
        success: "success";
        fail: "fail";
        partial_success: "partial_success";
        busy: "busy";
    }>;
    message: z.ZodString;
}, z.core.$strip>;
/**
 * DeleteDocByIdResponse
 *
 * Response model for single document deletion operation.
 */
export declare const zDeleteDocByIdResponse: z.ZodObject<{
    status: z.ZodEnum<{
        busy: "busy";
        deletion_started: "deletion_started";
        not_allowed: "not_allowed";
    }>;
    message: z.ZodString;
    doc_id: z.ZodString;
}, z.core.$strip>;
/**
 * DeleteDocRequest
 */
export declare const zDeleteDocRequest: z.ZodObject<{
    doc_ids: z.ZodArray<z.ZodString>;
    delete_file: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    delete_llm_cache: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
/**
 * DeleteEntityRequest
 */
export declare const zDeleteEntityRequest: z.ZodObject<{
    entity_name: z.ZodString;
}, z.core.$strip>;
/**
 * DeleteRelationRequest
 */
export declare const zDeleteRelationRequest: z.ZodObject<{
    source_entity: z.ZodString;
    target_entity: z.ZodString;
}, z.core.$strip>;
/**
 * DeletionResult
 *
 * Represents the result of a deletion operation.
 */
export declare const zDeletionResult: z.ZodObject<{
    status: z.ZodEnum<{
        success: "success";
        fail: "fail";
        not_allowed: "not_allowed";
        not_found: "not_found";
    }>;
    doc_id: z.ZodString;
    message: z.ZodString;
    status_code: z.ZodDefault<z.ZodOptional<z.ZodInt>>;
    file_path: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
/**
 * DocStatus
 *
 * Document processing status
 */
export declare const zDocStatus: z.ZodEnum<{
    pending: "pending";
    processing: "processing";
    preprocessed: "preprocessed";
    processed: "processed";
    failed: "failed";
}>;
/**
 * DocStatusResponse
 */
export declare const zDocStatusResponse: z.ZodObject<{
    id: z.ZodString;
    content_summary: z.ZodString;
    content_length: z.ZodInt;
    status: z.ZodEnum<{
        pending: "pending";
        processing: "processing";
        preprocessed: "preprocessed";
        processed: "processed";
        failed: "failed";
    }>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    track_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    chunks_count: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    error_msg: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    metadata: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    file_path: z.ZodString;
}, z.core.$strip>;
/**
 * DocsStatusesResponse
 *
 * Response model for document statuses
 *
 * Attributes:
 * statuses: Dictionary mapping document status to lists of document status responses
 */
export declare const zDocsStatusesResponse: z.ZodObject<{
    statuses: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        content_summary: z.ZodString;
        content_length: z.ZodInt;
        status: z.ZodEnum<{
            pending: "pending";
            processing: "processing";
            preprocessed: "preprocessed";
            processed: "processed";
            failed: "failed";
        }>;
        created_at: z.ZodString;
        updated_at: z.ZodString;
        track_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        chunks_count: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
        error_msg: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        metadata: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        file_path: z.ZodString;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
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
export declare const zDocumentsRequest: z.ZodObject<{
    status_filter: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
        pending: "pending";
        processing: "processing";
        preprocessed: "preprocessed";
        processed: "processed";
        failed: "failed";
    }>>>;
    page: z.ZodDefault<z.ZodOptional<z.ZodInt>>;
    page_size: z.ZodDefault<z.ZodOptional<z.ZodInt>>;
    sort_field: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        created_at: "created_at";
        updated_at: "updated_at";
        id: "id";
        file_path: "file_path";
    }>>>;
    sort_direction: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>>;
}, z.core.$strip>;
/**
 * EntityCreateRequest
 */
export declare const zEntityCreateRequest: z.ZodObject<{
    entity_name: z.ZodString;
    entity_data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, z.core.$strip>;
/**
 * EntityMergeRequest
 */
export declare const zEntityMergeRequest: z.ZodObject<{
    entities_to_change: z.ZodArray<z.ZodString>;
    entity_to_change_into: z.ZodString;
}, z.core.$strip>;
/**
 * EntityUpdateRequest
 */
export declare const zEntityUpdateRequest: z.ZodObject<{
    entity_name: z.ZodString;
    updated_data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    allow_rename: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    allow_merge: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
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
export declare const zInsertResponse: z.ZodObject<{
    status: z.ZodEnum<{
        success: "success";
        partial_success: "partial_success";
        duplicated: "duplicated";
        failure: "failure";
    }>;
    message: z.ZodString;
    track_id: z.ZodString;
}, z.core.$strip>;
/**
 * InsertTextRequest
 *
 * Request model for inserting a single text document
 *
 * Attributes:
 * text: The text content to be inserted into the RAG system
 * file_source: Source of the text (optional)
 */
export declare const zInsertTextRequest: z.ZodObject<{
    text: z.ZodString;
    file_source: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
/**
 * InsertTextsRequest
 *
 * Request model for inserting multiple text documents
 *
 * Attributes:
 * texts: List of text contents to be inserted into the RAG system
 * file_sources: Sources of the texts (optional)
 */
export declare const zInsertTextsRequest: z.ZodObject<{
    texts: z.ZodArray<z.ZodString>;
    file_sources: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
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
export declare const zPaginationInfo: z.ZodObject<{
    page: z.ZodInt;
    page_size: z.ZodInt;
    total_count: z.ZodInt;
    total_pages: z.ZodInt;
    has_next: z.ZodBoolean;
    has_prev: z.ZodBoolean;
}, z.core.$strip>;
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
export declare const zPaginatedDocsResponse: z.ZodObject<{
    documents: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        content_summary: z.ZodString;
        content_length: z.ZodInt;
        status: z.ZodEnum<{
            pending: "pending";
            processing: "processing";
            preprocessed: "preprocessed";
            processed: "processed";
            failed: "failed";
        }>;
        created_at: z.ZodString;
        updated_at: z.ZodString;
        track_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        chunks_count: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
        error_msg: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        metadata: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        file_path: z.ZodString;
    }, z.core.$strip>>;
    pagination: z.ZodObject<{
        page: z.ZodInt;
        page_size: z.ZodInt;
        total_count: z.ZodInt;
        total_pages: z.ZodInt;
        has_next: z.ZodBoolean;
        has_prev: z.ZodBoolean;
    }, z.core.$strip>;
    status_counts: z.ZodRecord<z.ZodString, z.ZodInt>;
}, z.core.$strip>;
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
export declare const zPipelineStatusResponse: z.ZodObject<{
    autoscanned: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    busy: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    job_name: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    job_start: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    docs: z.ZodDefault<z.ZodOptional<z.ZodInt>>;
    batchs: z.ZodDefault<z.ZodOptional<z.ZodInt>>;
    cur_batch: z.ZodDefault<z.ZodOptional<z.ZodInt>>;
    request_pending: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    latest_message: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    history_messages: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>;
    update_status: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
}, z.core.$strip>;
/**
 * QueryDataResponse
 */
export declare const zQueryDataResponse: z.ZodObject<{
    status: z.ZodString;
    message: z.ZodString;
    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, z.core.$strip>;
/**
 * QueryRequest
 */
export declare const zQueryRequest: z.ZodObject<{
    query: z.ZodString;
    mode: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        local: "local";
        global: "global";
        hybrid: "hybrid";
        naive: "naive";
        mix: "mix";
        bypass: "bypass";
    }>>>;
    only_need_context: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    only_need_prompt: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    response_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    top_k: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    chunk_top_k: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    max_entity_tokens: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    max_relation_tokens: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    max_total_tokens: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    hl_keywords: z.ZodOptional<z.ZodArray<z.ZodString>>;
    ll_keywords: z.ZodOptional<z.ZodArray<z.ZodString>>;
    conversation_history: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>>>>;
    user_prompt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    enable_rerank: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    include_references: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
    include_chunk_content: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
    stream: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
}, z.core.$strip>;
/**
 * ReferenceItem
 *
 * A single reference item in query responses.
 */
export declare const zReferenceItem: z.ZodObject<{
    reference_id: z.ZodString;
    file_path: z.ZodString;
    content: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
/**
 * QueryResponse
 */
export declare const zQueryResponse: z.ZodObject<{
    response: z.ZodString;
    references: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        reference_id: z.ZodString;
        file_path: z.ZodString;
        content: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
/**
 * RelationCreateRequest
 */
export declare const zRelationCreateRequest: z.ZodObject<{
    source_entity: z.ZodString;
    target_entity: z.ZodString;
    relation_data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, z.core.$strip>;
/**
 * RelationUpdateRequest
 */
export declare const zRelationUpdateRequest: z.ZodObject<{
    source_id: z.ZodString;
    target_id: z.ZodString;
    updated_data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, z.core.$strip>;
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
export declare const zReprocessResponse: z.ZodObject<{
    status: z.ZodLiteral<"reprocessing_started">;
    message: z.ZodString;
    track_id: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
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
export declare const zScanResponse: z.ZodObject<{
    status: z.ZodLiteral<"scanning_started">;
    message: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    track_id: z.ZodString;
}, z.core.$strip>;
/**
 * StatusCountsResponse
 *
 * Response model for document status counts
 *
 * Attributes:
 * status_counts: Count of documents by status
 */
export declare const zStatusCountsResponse: z.ZodObject<{
    status_counts: z.ZodRecord<z.ZodString, z.ZodInt>;
}, z.core.$strip>;
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
export declare const zTrackStatusResponse: z.ZodObject<{
    track_id: z.ZodString;
    documents: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        content_summary: z.ZodString;
        content_length: z.ZodInt;
        status: z.ZodEnum<{
            pending: "pending";
            processing: "processing";
            preprocessed: "preprocessed";
            processed: "processed";
            failed: "failed";
        }>;
        created_at: z.ZodString;
        updated_at: z.ZodString;
        track_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        chunks_count: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
        error_msg: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        metadata: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        file_path: z.ZodString;
    }, z.core.$strip>>;
    total_count: z.ZodInt;
    status_summary: z.ZodRecord<z.ZodString, z.ZodInt>;
}, z.core.$strip>;
/**
 * ValidationError
 */
export declare const zValidationError: z.ZodObject<{
    loc: z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodInt]>>;
    msg: z.ZodString;
    type: z.ZodString;
    input: z.ZodOptional<z.ZodUnknown>;
    ctx: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>;
/**
 * HTTPValidationError
 */
export declare const zHttpValidationError: z.ZodObject<{
    detail: z.ZodOptional<z.ZodArray<z.ZodObject<{
        loc: z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodInt]>>;
        msg: z.ZodString;
        type: z.ZodString;
        input: z.ZodOptional<z.ZodUnknown>;
        ctx: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
/**
 * Successful Response
 */
export declare const zScanForNewDocumentsDocumentsScanPostResponse: z.ZodObject<{
    status: z.ZodLiteral<"scanning_started">;
    message: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    track_id: z.ZodString;
}, z.core.$strip>;
export declare const zUploadToInputDirDocumentsUploadPostBody: z.ZodObject<{
    file: z.ZodString;
}, z.core.$strip>;
/**
 * Successful Response
 */
export declare const zUploadToInputDirDocumentsUploadPostResponse: z.ZodObject<{
    status: z.ZodEnum<{
        success: "success";
        partial_success: "partial_success";
        duplicated: "duplicated";
        failure: "failure";
    }>;
    message: z.ZodString;
    track_id: z.ZodString;
}, z.core.$strip>;
export declare const zInsertTextDocumentsTextPostBody: z.ZodObject<{
    text: z.ZodString;
    file_source: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
/**
 * Successful Response
 */
export declare const zInsertTextDocumentsTextPostResponse: z.ZodObject<{
    status: z.ZodEnum<{
        success: "success";
        partial_success: "partial_success";
        duplicated: "duplicated";
        failure: "failure";
    }>;
    message: z.ZodString;
    track_id: z.ZodString;
}, z.core.$strip>;
export declare const zInsertTextsDocumentsTextsPostBody: z.ZodObject<{
    texts: z.ZodArray<z.ZodString>;
    file_sources: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
/**
 * Successful Response
 */
export declare const zInsertTextsDocumentsTextsPostResponse: z.ZodObject<{
    status: z.ZodEnum<{
        success: "success";
        partial_success: "partial_success";
        duplicated: "duplicated";
        failure: "failure";
    }>;
    message: z.ZodString;
    track_id: z.ZodString;
}, z.core.$strip>;
/**
 * Successful Response
 */
export declare const zClearDocumentsDocumentsDeleteResponse: z.ZodObject<{
    status: z.ZodEnum<{
        success: "success";
        fail: "fail";
        partial_success: "partial_success";
        busy: "busy";
    }>;
    message: z.ZodString;
}, z.core.$strip>;
/**
 * Successful Response
 */
export declare const zDocumentsDocumentsGetResponse: z.ZodObject<{
    statuses: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        content_summary: z.ZodString;
        content_length: z.ZodInt;
        status: z.ZodEnum<{
            pending: "pending";
            processing: "processing";
            preprocessed: "preprocessed";
            processed: "processed";
            failed: "failed";
        }>;
        created_at: z.ZodString;
        updated_at: z.ZodString;
        track_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        chunks_count: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
        error_msg: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        metadata: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        file_path: z.ZodString;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
/**
 * Successful Response
 */
export declare const zGetPipelineStatusDocumentsPipelineStatusGetResponse: z.ZodObject<{
    autoscanned: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    busy: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    job_name: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    job_start: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    docs: z.ZodDefault<z.ZodOptional<z.ZodInt>>;
    batchs: z.ZodDefault<z.ZodOptional<z.ZodInt>>;
    cur_batch: z.ZodDefault<z.ZodOptional<z.ZodInt>>;
    request_pending: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    latest_message: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    history_messages: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>;
    update_status: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
}, z.core.$strip>;
export declare const zDeleteDocumentDocumentsDeleteDocumentDeleteBody: z.ZodObject<{
    doc_ids: z.ZodArray<z.ZodString>;
    delete_file: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    delete_llm_cache: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
/**
 * Successful Response
 */
export declare const zDeleteDocumentDocumentsDeleteDocumentDeleteResponse: z.ZodObject<{
    status: z.ZodEnum<{
        busy: "busy";
        deletion_started: "deletion_started";
        not_allowed: "not_allowed";
    }>;
    message: z.ZodString;
    doc_id: z.ZodString;
}, z.core.$strip>;
export declare const zClearCacheDocumentsClearCachePostBody: z.ZodRecord<z.ZodString, z.ZodUnknown>;
/**
 * Successful Response
 */
export declare const zClearCacheDocumentsClearCachePostResponse: z.ZodObject<{
    status: z.ZodEnum<{
        success: "success";
        fail: "fail";
    }>;
    message: z.ZodString;
}, z.core.$strip>;
export declare const zDeleteEntityDocumentsDeleteEntityDeleteBody: z.ZodObject<{
    entity_name: z.ZodString;
}, z.core.$strip>;
/**
 * Successful Response
 */
export declare const zDeleteEntityDocumentsDeleteEntityDeleteResponse: z.ZodObject<{
    status: z.ZodEnum<{
        success: "success";
        fail: "fail";
        not_allowed: "not_allowed";
        not_found: "not_found";
    }>;
    doc_id: z.ZodString;
    message: z.ZodString;
    status_code: z.ZodDefault<z.ZodOptional<z.ZodInt>>;
    file_path: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const zDeleteRelationDocumentsDeleteRelationDeleteBody: z.ZodObject<{
    source_entity: z.ZodString;
    target_entity: z.ZodString;
}, z.core.$strip>;
/**
 * Successful Response
 */
export declare const zDeleteRelationDocumentsDeleteRelationDeleteResponse: z.ZodObject<{
    status: z.ZodEnum<{
        success: "success";
        fail: "fail";
        not_allowed: "not_allowed";
        not_found: "not_found";
    }>;
    doc_id: z.ZodString;
    message: z.ZodString;
    status_code: z.ZodDefault<z.ZodOptional<z.ZodInt>>;
    file_path: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const zGetTrackStatusDocumentsTrackStatusTrackIdGetPath: z.ZodObject<{
    track_id: z.ZodString;
}, z.core.$strip>;
/**
 * Successful Response
 */
export declare const zGetTrackStatusDocumentsTrackStatusTrackIdGetResponse: z.ZodObject<{
    track_id: z.ZodString;
    documents: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        content_summary: z.ZodString;
        content_length: z.ZodInt;
        status: z.ZodEnum<{
            pending: "pending";
            processing: "processing";
            preprocessed: "preprocessed";
            processed: "processed";
            failed: "failed";
        }>;
        created_at: z.ZodString;
        updated_at: z.ZodString;
        track_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        chunks_count: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
        error_msg: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        metadata: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        file_path: z.ZodString;
    }, z.core.$strip>>;
    total_count: z.ZodInt;
    status_summary: z.ZodRecord<z.ZodString, z.ZodInt>;
}, z.core.$strip>;
export declare const zGetDocumentsPaginatedDocumentsPaginatedPostBody: z.ZodObject<{
    status_filter: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
        pending: "pending";
        processing: "processing";
        preprocessed: "preprocessed";
        processed: "processed";
        failed: "failed";
    }>>>;
    page: z.ZodDefault<z.ZodOptional<z.ZodInt>>;
    page_size: z.ZodDefault<z.ZodOptional<z.ZodInt>>;
    sort_field: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        created_at: "created_at";
        updated_at: "updated_at";
        id: "id";
        file_path: "file_path";
    }>>>;
    sort_direction: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>>;
}, z.core.$strip>;
/**
 * Successful Response
 */
export declare const zGetDocumentsPaginatedDocumentsPaginatedPostResponse: z.ZodObject<{
    documents: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        content_summary: z.ZodString;
        content_length: z.ZodInt;
        status: z.ZodEnum<{
            pending: "pending";
            processing: "processing";
            preprocessed: "preprocessed";
            processed: "processed";
            failed: "failed";
        }>;
        created_at: z.ZodString;
        updated_at: z.ZodString;
        track_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        chunks_count: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
        error_msg: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        metadata: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        file_path: z.ZodString;
    }, z.core.$strip>>;
    pagination: z.ZodObject<{
        page: z.ZodInt;
        page_size: z.ZodInt;
        total_count: z.ZodInt;
        total_pages: z.ZodInt;
        has_next: z.ZodBoolean;
        has_prev: z.ZodBoolean;
    }, z.core.$strip>;
    status_counts: z.ZodRecord<z.ZodString, z.ZodInt>;
}, z.core.$strip>;
/**
 * Successful Response
 */
export declare const zGetDocumentStatusCountsDocumentsStatusCountsGetResponse: z.ZodObject<{
    status_counts: z.ZodRecord<z.ZodString, z.ZodInt>;
}, z.core.$strip>;
/**
 * Successful Response
 */
export declare const zReprocessFailedDocumentsDocumentsReprocessFailedPostResponse: z.ZodObject<{
    status: z.ZodLiteral<"reprocessing_started">;
    message: z.ZodString;
    track_id: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
/**
 * Successful Response
 */
export declare const zCancelPipelineDocumentsCancelPipelinePostResponse: z.ZodObject<{
    status: z.ZodEnum<{
        cancellation_requested: "cancellation_requested";
        not_busy: "not_busy";
    }>;
    message: z.ZodString;
}, z.core.$strip>;
export declare const zQueryTextQueryPostBody: z.ZodObject<{
    query: z.ZodString;
    mode: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        local: "local";
        global: "global";
        hybrid: "hybrid";
        naive: "naive";
        mix: "mix";
        bypass: "bypass";
    }>>>;
    only_need_context: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    only_need_prompt: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    response_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    top_k: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    chunk_top_k: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    max_entity_tokens: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    max_relation_tokens: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    max_total_tokens: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    hl_keywords: z.ZodOptional<z.ZodArray<z.ZodString>>;
    ll_keywords: z.ZodOptional<z.ZodArray<z.ZodString>>;
    conversation_history: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>>>>;
    user_prompt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    enable_rerank: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    include_references: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
    include_chunk_content: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
    stream: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
}, z.core.$strip>;
/**
 * Successful RAG query response
 */
export declare const zQueryTextQueryPostResponse: z.ZodObject<{
    response: z.ZodString;
    references: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        reference_id: z.ZodString;
        file_path: z.ZodString;
        content: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
export declare const zQueryTextStreamQueryStreamPostBody: z.ZodObject<{
    query: z.ZodString;
    mode: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        local: "local";
        global: "global";
        hybrid: "hybrid";
        naive: "naive";
        mix: "mix";
        bypass: "bypass";
    }>>>;
    only_need_context: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    only_need_prompt: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    response_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    top_k: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    chunk_top_k: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    max_entity_tokens: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    max_relation_tokens: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    max_total_tokens: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    hl_keywords: z.ZodOptional<z.ZodArray<z.ZodString>>;
    ll_keywords: z.ZodOptional<z.ZodArray<z.ZodString>>;
    conversation_history: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>>>>;
    user_prompt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    enable_rerank: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    include_references: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
    include_chunk_content: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
    stream: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
}, z.core.$strip>;
export declare const zQueryDataQueryDataPostBody: z.ZodObject<{
    query: z.ZodString;
    mode: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        local: "local";
        global: "global";
        hybrid: "hybrid";
        naive: "naive";
        mix: "mix";
        bypass: "bypass";
    }>>>;
    only_need_context: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    only_need_prompt: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    response_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    top_k: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    chunk_top_k: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    max_entity_tokens: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    max_relation_tokens: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    max_total_tokens: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
    hl_keywords: z.ZodOptional<z.ZodArray<z.ZodString>>;
    ll_keywords: z.ZodOptional<z.ZodArray<z.ZodString>>;
    conversation_history: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>>>>;
    user_prompt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    enable_rerank: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    include_references: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
    include_chunk_content: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
    stream: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
}, z.core.$strip>;
/**
 * Successful data retrieval response with structured RAG data
 */
export declare const zQueryDataQueryDataPostResponse: z.ZodObject<{
    status: z.ZodString;
    message: z.ZodString;
    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, z.core.$strip>;
export declare const zGetPopularLabelsGraphLabelPopularGetQuery: z.ZodObject<{
    limit: z.ZodDefault<z.ZodOptional<z.ZodInt>>;
}, z.core.$strip>;
export declare const zSearchLabelsGraphLabelSearchGetQuery: z.ZodObject<{
    q: z.ZodString;
    limit: z.ZodDefault<z.ZodOptional<z.ZodInt>>;
}, z.core.$strip>;
export declare const zGetKnowledgeGraphGraphsGetQuery: z.ZodObject<{
    label: z.ZodString;
    max_depth: z.ZodDefault<z.ZodOptional<z.ZodInt>>;
    max_nodes: z.ZodDefault<z.ZodOptional<z.ZodInt>>;
}, z.core.$strip>;
export declare const zCheckEntityExistsGraphEntityExistsGetQuery: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
export declare const zUpdateEntityGraphEntityEditPostBody: z.ZodObject<{
    entity_name: z.ZodString;
    updated_data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    allow_rename: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    allow_merge: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const zUpdateRelationGraphRelationEditPostBody: z.ZodObject<{
    source_id: z.ZodString;
    target_id: z.ZodString;
    updated_data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, z.core.$strip>;
export declare const zCreateEntityGraphEntityCreatePostBody: z.ZodObject<{
    entity_name: z.ZodString;
    entity_data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, z.core.$strip>;
export declare const zCreateRelationGraphRelationCreatePostBody: z.ZodObject<{
    source_entity: z.ZodString;
    target_entity: z.ZodString;
    relation_data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, z.core.$strip>;
export declare const zMergeEntitiesGraphEntitiesMergePostBody: z.ZodObject<{
    entities_to_change: z.ZodArray<z.ZodString>;
    entity_to_change_into: z.ZodString;
}, z.core.$strip>;
export declare const zLoginLoginPostBody: z.ZodObject<{
    grant_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    username: z.ZodString;
    password: z.ZodString;
    scope: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    client_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    client_secret: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
