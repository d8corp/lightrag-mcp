import { type Client, type Options as Options2, type TDataShape } from './client/index.js';
import type { CancelPipelineDocumentsCancelPipelinePostData, CancelPipelineDocumentsCancelPipelinePostResponses, ChatApiChatPostData, ChatApiChatPostResponses, CheckEntityExistsGraphEntityExistsGetData, CheckEntityExistsGraphEntityExistsGetErrors, CheckEntityExistsGraphEntityExistsGetResponses, ClearCacheDocumentsClearCachePostData, ClearCacheDocumentsClearCachePostErrors, ClearCacheDocumentsClearCachePostResponses, ClearDocumentsDocumentsDeleteData, ClearDocumentsDocumentsDeleteResponses, CreateEntityGraphEntityCreatePostData, CreateEntityGraphEntityCreatePostErrors, CreateEntityGraphEntityCreatePostResponses, CreateRelationGraphRelationCreatePostData, CreateRelationGraphRelationCreatePostErrors, CreateRelationGraphRelationCreatePostResponses, DeleteDocumentDocumentsDeleteDocumentDeleteData, DeleteDocumentDocumentsDeleteDocumentDeleteErrors, DeleteDocumentDocumentsDeleteDocumentDeleteResponses, DeleteEntityDocumentsDeleteEntityDeleteData, DeleteEntityDocumentsDeleteEntityDeleteErrors, DeleteEntityDocumentsDeleteEntityDeleteResponses, DeleteRelationDocumentsDeleteRelationDeleteData, DeleteRelationDocumentsDeleteRelationDeleteErrors, DeleteRelationDocumentsDeleteRelationDeleteResponses, DocumentsDocumentsGetData, DocumentsDocumentsGetResponses, GenerateApiGeneratePostData, GenerateApiGeneratePostResponses, GetAuthStatusAuthStatusGetData, GetAuthStatusAuthStatusGetResponses, GetDocumentsPaginatedDocumentsPaginatedPostData, GetDocumentsPaginatedDocumentsPaginatedPostErrors, GetDocumentsPaginatedDocumentsPaginatedPostResponses, GetDocumentStatusCountsDocumentsStatusCountsGetData, GetDocumentStatusCountsDocumentsStatusCountsGetResponses, GetGraphLabelsGraphLabelListGetData, GetGraphLabelsGraphLabelListGetResponses, GetKnowledgeGraphGraphsGetData, GetKnowledgeGraphGraphsGetErrors, GetKnowledgeGraphGraphsGetResponses, GetPipelineStatusDocumentsPipelineStatusGetData, GetPipelineStatusDocumentsPipelineStatusGetResponses, GetPopularLabelsGraphLabelPopularGetData, GetPopularLabelsGraphLabelPopularGetErrors, GetPopularLabelsGraphLabelPopularGetResponses, GetRunningModelsApiPsGetData, GetRunningModelsApiPsGetResponses, GetStatusHealthGetData, GetStatusHealthGetResponses, GetTagsApiTagsGetData, GetTagsApiTagsGetResponses, GetTrackStatusDocumentsTrackStatusTrackIdGetData, GetTrackStatusDocumentsTrackStatusTrackIdGetErrors, GetTrackStatusDocumentsTrackStatusTrackIdGetResponses, GetVersionApiVersionGetData, GetVersionApiVersionGetResponses, InsertTextDocumentsTextPostData, InsertTextDocumentsTextPostErrors, InsertTextDocumentsTextPostResponses, InsertTextsDocumentsTextsPostData, InsertTextsDocumentsTextsPostErrors, InsertTextsDocumentsTextsPostResponses, LoginLoginPostData, LoginLoginPostErrors, LoginLoginPostResponses, MergeEntitiesGraphEntitiesMergePostData, MergeEntitiesGraphEntitiesMergePostErrors, MergeEntitiesGraphEntitiesMergePostResponses, QueryDataQueryDataPostData, QueryDataQueryDataPostErrors, QueryDataQueryDataPostResponses, QueryTextQueryPostData, QueryTextQueryPostErrors, QueryTextQueryPostResponses, QueryTextStreamQueryStreamPostData, QueryTextStreamQueryStreamPostErrors, QueryTextStreamQueryStreamPostResponses, RedirectToWebuiGetData, RedirectToWebuiGetResponses, ReprocessFailedDocumentsDocumentsReprocessFailedPostData, ReprocessFailedDocumentsDocumentsReprocessFailedPostResponses, ScanForNewDocumentsDocumentsScanPostData, ScanForNewDocumentsDocumentsScanPostResponses, SearchLabelsGraphLabelSearchGetData, SearchLabelsGraphLabelSearchGetErrors, SearchLabelsGraphLabelSearchGetResponses, UpdateEntityGraphEntityEditPostData, UpdateEntityGraphEntityEditPostErrors, UpdateEntityGraphEntityEditPostResponses, UpdateRelationGraphRelationEditPostData, UpdateRelationGraphRelationEditPostErrors, UpdateRelationGraphRelationEditPostResponses, UploadToInputDirDocumentsUploadPostData, UploadToInputDirDocumentsUploadPostErrors, UploadToInputDirDocumentsUploadPostResponses } from './types.gen.js';
export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean, TResponse = unknown> = Options2<TData, ThrowOnError, TResponse> & {
    /**
     * You can provide a client instance returned by `createClient()` instead of
     * individual options. This might be also useful if you want to implement a
     * custom client.
     */
    client?: Client;
    /**
     * You can pass arbitrary values through the `meta` object. This can be
     * used to access values that aren't defined as part of the SDK function.
     */
    meta?: Record<string, unknown>;
};
/**
 * Scan For New Documents
 *
 * Trigger the scanning process for new documents.
 *
 * This endpoint initiates a background task that scans the input directory for new documents
 * and processes them. If a scanning process is already running, it returns a status indicating
 * that fact.
 *
 * Returns:
 * ScanResponse: A response object containing the scanning status and track_id
 */
export declare const scanForNewDocumentsDocumentsScanPost: <ThrowOnError extends boolean = false>(options?: Options<ScanForNewDocumentsDocumentsScanPostData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ScanForNewDocumentsDocumentsScanPostResponses, unknown, ThrowOnError, "fields">;
/**
 * Upload To Input Dir
 *
 * Upload a file to the input directory and index it.
 *
 * This API endpoint accepts a file through an HTTP POST request, checks if the
 * uploaded file is of a supported type, saves it in the specified input directory,
 * indexes it for retrieval, and returns a success status with relevant details.
 *
 * **File Size Limit:**
 * - Configurable via `MAX_UPLOAD_SIZE` environment variable (default: 100MB)
 * - Set to `None` or `0` for unlimited upload size
 * - Returns HTTP 413 (Request Entity Too Large) if file exceeds limit
 *
 * **Duplicate Detection Behavior:**
 *
 * This endpoint handles two types of duplicate scenarios differently:
 *
 * 1. **Filename Duplicate (Synchronous Detection)**:
 * - Detected immediately before file processing
 * - Returns `status="duplicated"` with the existing document's track_id
 * - Two cases:
 * - If filename exists in document storage: returns existing track_id
 * - If filename exists in file system only: returns empty track_id ("")
 *
 * 2. **Content Duplicate (Asynchronous Detection)**:
 * - Detected during background processing after content extraction
 * - Returns `status="success"` with a new track_id immediately
 * - The duplicate is detected later when processing the file content
 * - Use `/documents/track_status/{track_id}` to check the final result:
 * - Document will have `status="FAILED"`
 * - `error_msg` contains "Content already exists. Original doc_id: xxx"
 * - `metadata.is_duplicate=true` with reference to original document
 * - `metadata.original_doc_id` points to the existing document
 * - `metadata.original_track_id` shows the original upload's track_id
 *
 * **Why Different Behavior?**
 * - Filename check is fast (simple lookup), done synchronously
 * - Content extraction is expensive (PDF/DOCX parsing), done asynchronously
 * - This design prevents blocking the client during expensive operations
 *
 * Args:
 * background_tasks: FastAPI BackgroundTasks for async processing
 * file (UploadFile): The file to be uploaded. It must have an allowed extension.
 *
 * Returns:
 * InsertResponse: A response object containing the upload status and a message.
 * - status="success": File accepted and queued for processing
 * - status="duplicated": Filename already exists (see track_id for existing document)
 *
 * Raises:
 * HTTPException: If the file type is not supported (400), file too large (413), or other errors occur (500).
 */
export declare const uploadToInputDirDocumentsUploadPost: <ThrowOnError extends boolean = false>(options: Options<UploadToInputDirDocumentsUploadPostData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UploadToInputDirDocumentsUploadPostResponses, UploadToInputDirDocumentsUploadPostErrors, ThrowOnError, "fields">;
/**
 * Insert Text
 *
 * Insert text into the RAG system.
 *
 * This endpoint allows you to insert text data into the RAG system for later retrieval
 * and use in generating responses.
 *
 * Args:
 * request (InsertTextRequest): The request body containing the text to be inserted.
 * background_tasks: FastAPI BackgroundTasks for async processing
 *
 * Returns:
 * InsertResponse: A response object containing the status of the operation.
 *
 * Raises:
 * HTTPException: If an error occurs during text processing (500).
 */
export declare const insertTextDocumentsTextPost: <ThrowOnError extends boolean = false>(options: Options<InsertTextDocumentsTextPostData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<InsertTextDocumentsTextPostResponses, InsertTextDocumentsTextPostErrors, ThrowOnError, "fields">;
/**
 * Insert Texts
 *
 * Insert multiple texts into the RAG system.
 *
 * This endpoint allows you to insert multiple text entries into the RAG system
 * in a single request.
 *
 * Args:
 * request (InsertTextsRequest): The request body containing the list of texts.
 * background_tasks: FastAPI BackgroundTasks for async processing
 *
 * Returns:
 * InsertResponse: A response object containing the status of the operation.
 *
 * Raises:
 * HTTPException: If an error occurs during text processing (500).
 */
export declare const insertTextsDocumentsTextsPost: <ThrowOnError extends boolean = false>(options: Options<InsertTextsDocumentsTextsPostData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<InsertTextsDocumentsTextsPostResponses, InsertTextsDocumentsTextsPostErrors, ThrowOnError, "fields">;
/**
 * Clear Documents
 *
 * Clear all documents from the RAG system.
 *
 * This endpoint deletes all documents, entities, relationships, and files from the system.
 * It uses the storage drop methods to properly clean up all data and removes all files
 * from the input directory.
 *
 * Returns:
 * ClearDocumentsResponse: A response object containing the status and message.
 * - status="success":           All documents and files were successfully cleared.
 * - status="partial_success":   Document clear job exit with some errors.
 * - status="busy":              Operation could not be completed because the pipeline is busy.
 * - status="fail":              All storage drop operations failed, with message
 * - message: Detailed information about the operation results, including counts
 * of deleted files and any errors encountered.
 *
 * Raises:
 * HTTPException: Raised when a serious error occurs during the clearing process,
 * with status code 500 and error details in the detail field.
 */
export declare const clearDocumentsDocumentsDelete: <ThrowOnError extends boolean = false>(options?: Options<ClearDocumentsDocumentsDeleteData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ClearDocumentsDocumentsDeleteResponses, unknown, ThrowOnError, "fields">;
/**
 * Documents
 *
 * Get the status of all documents in the system. This endpoint is deprecated; use /documents/paginated instead.
 * To prevent excessive resource consumption, a maximum of 1,000 records is returned.
 *
 * This endpoint retrieves the current status of all documents, grouped by their
 * processing status (PENDING, PROCESSING, PREPROCESSED, PROCESSED, FAILED). The results are
 * limited to 1000 total documents with fair distribution across all statuses.
 *
 * Returns:
 * DocsStatusesResponse: A response object containing a dictionary where keys are
 * DocStatus values and values are lists of DocStatusResponse
 * objects representing documents in each status category.
 * Maximum 1000 documents total will be returned.
 *
 * Raises:
 * HTTPException: If an error occurs while retrieving document statuses (500).
 */
export declare const documentsDocumentsGet: <ThrowOnError extends boolean = false>(options?: Options<DocumentsDocumentsGetData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DocumentsDocumentsGetResponses, unknown, ThrowOnError, "fields">;
/**
 * Get Pipeline Status
 *
 * Get the current status of the document indexing pipeline.
 *
 * This endpoint returns information about the current state of the document processing pipeline,
 * including the processing status, progress information, and history messages.
 *
 * Returns:
 * PipelineStatusResponse: A response object containing:
 * - autoscanned (bool): Whether auto-scan has started
 * - busy (bool): Whether the pipeline is currently busy
 * - job_name (str): Current job name (e.g., indexing files/indexing texts)
 * - job_start (str, optional): Job start time as ISO format string
 * - docs (int): Total number of documents to be indexed
 * - batchs (int): Number of batches for processing documents
 * - cur_batch (int): Current processing batch
 * - request_pending (bool): Flag for pending request for processing
 * - latest_message (str): Latest message from pipeline processing
 * - history_messages (List[str], optional): List of history messages (limited to latest 1000 entries,
 * with truncation message if more than 1000 messages exist)
 *
 * Raises:
 * HTTPException: If an error occurs while retrieving pipeline status (500)
 */
export declare const getPipelineStatusDocumentsPipelineStatusGet: <ThrowOnError extends boolean = false>(options?: Options<GetPipelineStatusDocumentsPipelineStatusGetData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetPipelineStatusDocumentsPipelineStatusGetResponses, unknown, ThrowOnError, "fields">;
/**
 * Delete a document and all its associated data by its ID.
 *
 * Delete documents and all their associated data by their IDs using background processing.
 *
 * Deletes specific documents and all their associated data, including their status,
 * text chunks, vector embeddings, and any related graph data. When requested,
 * cached LLM extraction responses are removed after graph deletion/rebuild completes.
 * The deletion process runs in the background to avoid blocking the client connection.
 *
 * This operation is irreversible and will interact with the pipeline status.
 *
 * Args:
 * delete_request (DeleteDocRequest): The request containing the document IDs and deletion options.
 * background_tasks: FastAPI BackgroundTasks for async processing
 *
 * Returns:
 * DeleteDocByIdResponse: The result of the deletion operation.
 * - status="deletion_started": The document deletion has been initiated in the background.
 * - status="busy": The pipeline is busy with another operation.
 *
 * Raises:
 * HTTPException:
 * - 500: If an unexpected internal error occurs during initialization.
 */
export declare const deleteDocumentDocumentsDeleteDocumentDelete: <ThrowOnError extends boolean = false>(options: Options<DeleteDocumentDocumentsDeleteDocumentDeleteData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteDocumentDocumentsDeleteDocumentDeleteResponses, DeleteDocumentDocumentsDeleteDocumentDeleteErrors, ThrowOnError, "fields">;
/**
 * Clear Cache
 *
 * Clear all cache data from the LLM response cache storage.
 *
 * This endpoint clears all cached LLM responses regardless of mode.
 * The request body is accepted for API compatibility but is ignored.
 *
 * Args:
 * request (ClearCacheRequest): The request body (ignored for compatibility).
 *
 * Returns:
 * ClearCacheResponse: A response object containing the status and message.
 *
 * Raises:
 * HTTPException: If an error occurs during cache clearing (500).
 */
export declare const clearCacheDocumentsClearCachePost: <ThrowOnError extends boolean = false>(options: Options<ClearCacheDocumentsClearCachePostData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ClearCacheDocumentsClearCachePostResponses, ClearCacheDocumentsClearCachePostErrors, ThrowOnError, "fields">;
/**
 * Delete Entity
 *
 * Delete an entity and all its relationships from the knowledge graph.
 *
 * Args:
 * request (DeleteEntityRequest): The request body containing the entity name.
 *
 * Returns:
 * DeletionResult: An object containing the outcome of the deletion process.
 *
 * Raises:
 * HTTPException: If the entity is not found (404) or an error occurs (500).
 */
export declare const deleteEntityDocumentsDeleteEntityDelete: <ThrowOnError extends boolean = false>(options: Options<DeleteEntityDocumentsDeleteEntityDeleteData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteEntityDocumentsDeleteEntityDeleteResponses, DeleteEntityDocumentsDeleteEntityDeleteErrors, ThrowOnError, "fields">;
/**
 * Delete Relation
 *
 * Delete a relationship between two entities from the knowledge graph.
 *
 * Args:
 * request (DeleteRelationRequest): The request body containing the source and target entity names.
 *
 * Returns:
 * DeletionResult: An object containing the outcome of the deletion process.
 *
 * Raises:
 * HTTPException: If the relation is not found (404) or an error occurs (500).
 */
export declare const deleteRelationDocumentsDeleteRelationDelete: <ThrowOnError extends boolean = false>(options: Options<DeleteRelationDocumentsDeleteRelationDeleteData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<DeleteRelationDocumentsDeleteRelationDeleteResponses, DeleteRelationDocumentsDeleteRelationDeleteErrors, ThrowOnError, "fields">;
/**
 * Get Track Status
 *
 * Get the processing status of documents by tracking ID.
 *
 * This endpoint retrieves all documents associated with a specific tracking ID,
 * allowing users to monitor the processing progress of their uploaded files or inserted texts.
 *
 * Args:
 * track_id (str): The tracking ID returned from upload, text, or texts endpoints
 *
 * Returns:
 * TrackStatusResponse: A response object containing:
 * - track_id: The tracking ID
 * - documents: List of documents associated with this track_id
 * - total_count: Total number of documents for this track_id
 *
 * Raises:
 * HTTPException: If track_id is invalid (400) or an error occurs (500).
 */
export declare const getTrackStatusDocumentsTrackStatusTrackIdGet: <ThrowOnError extends boolean = false>(options: Options<GetTrackStatusDocumentsTrackStatusTrackIdGetData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetTrackStatusDocumentsTrackStatusTrackIdGetResponses, GetTrackStatusDocumentsTrackStatusTrackIdGetErrors, ThrowOnError, "fields">;
/**
 * Get Documents Paginated
 *
 * Get documents with pagination support.
 *
 * This endpoint retrieves documents with pagination, filtering, and sorting capabilities.
 * It provides better performance for large document collections by loading only the
 * requested page of data.
 *
 * Args:
 * request (DocumentsRequest): The request body containing pagination parameters
 *
 * Returns:
 * PaginatedDocsResponse: A response object containing:
 * - documents: List of documents for the current page
 * - pagination: Pagination information (page, total_count, etc.)
 * - status_counts: Count of documents by status for all documents
 *
 * Raises:
 * HTTPException: If an error occurs while retrieving documents (500).
 */
export declare const getDocumentsPaginatedDocumentsPaginatedPost: <ThrowOnError extends boolean = false>(options: Options<GetDocumentsPaginatedDocumentsPaginatedPostData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetDocumentsPaginatedDocumentsPaginatedPostResponses, GetDocumentsPaginatedDocumentsPaginatedPostErrors, ThrowOnError, "fields">;
/**
 * Get Document Status Counts
 *
 * Get counts of documents by status.
 *
 * This endpoint retrieves the count of documents in each processing status
 * (PENDING, PROCESSING, PROCESSED, FAILED) for all documents in the system.
 *
 * Returns:
 * StatusCountsResponse: A response object containing status counts
 *
 * Raises:
 * HTTPException: If an error occurs while retrieving status counts (500).
 */
export declare const getDocumentStatusCountsDocumentsStatusCountsGet: <ThrowOnError extends boolean = false>(options?: Options<GetDocumentStatusCountsDocumentsStatusCountsGetData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetDocumentStatusCountsDocumentsStatusCountsGetResponses, unknown, ThrowOnError, "fields">;
/**
 * Reprocess Failed Documents
 *
 * Reprocess failed and pending documents.
 *
 * This endpoint triggers the document processing pipeline which automatically
 * picks up and reprocesses documents in the following statuses:
 * - FAILED: Documents that failed during previous processing attempts
 * - PENDING: Documents waiting to be processed
 * - PROCESSING: Documents with abnormally terminated processing (e.g., server crashes)
 *
 * This is useful for recovering from server crashes, network errors, LLM service
 * outages, or other temporary failures that caused document processing to fail.
 *
 * The processing happens in the background and can be monitored by checking the
 * pipeline status. The reprocessed documents retain their original track_id from
 * initial upload, so use their original track_id to monitor progress.
 *
 * Returns:
 * ReprocessResponse: Response with status and message.
 * track_id is always empty string because reprocessed documents retain
 * their original track_id from initial upload.
 *
 * Raises:
 * HTTPException: If an error occurs while initiating reprocessing (500).
 */
export declare const reprocessFailedDocumentsDocumentsReprocessFailedPost: <ThrowOnError extends boolean = false>(options?: Options<ReprocessFailedDocumentsDocumentsReprocessFailedPostData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ReprocessFailedDocumentsDocumentsReprocessFailedPostResponses, unknown, ThrowOnError, "fields">;
/**
 * Cancel Pipeline
 *
 * Request cancellation of the currently running pipeline.
 *
 * This endpoint sets a cancellation flag in the pipeline status. The pipeline will:
 * 1. Check this flag at key processing points
 * 2. Stop processing new documents
 * 3. Cancel all running document processing tasks
 * 4. Mark all PROCESSING documents as FAILED with reason "User cancelled"
 *
 * The cancellation is graceful and ensures data consistency. Documents that have
 * completed processing will remain in PROCESSED status.
 *
 * Returns:
 * CancelPipelineResponse: Response with status and message
 * - status="cancellation_requested": Cancellation flag has been set
 * - status="not_busy": Pipeline is not currently running
 *
 * Raises:
 * HTTPException: If an error occurs while setting cancellation flag (500).
 */
export declare const cancelPipelineDocumentsCancelPipelinePost: <ThrowOnError extends boolean = false>(options?: Options<CancelPipelineDocumentsCancelPipelinePostData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CancelPipelineDocumentsCancelPipelinePostResponses, unknown, ThrowOnError, "fields">;
/**
 * Query Text
 *
 * Comprehensive RAG query endpoint with non-streaming response. Parameter "stream" is ignored.
 *
 * This endpoint performs Retrieval-Augmented Generation (RAG) queries using various modes
 * to provide intelligent responses based on your knowledge base.
 *
 * **Query Modes:**
 * - **local**: Focuses on specific entities and their direct relationships
 * - **global**: Analyzes broader patterns and relationships across the knowledge graph
 * - **hybrid**: Combines local and global approaches for comprehensive results
 * - **naive**: Simple vector similarity search without knowledge graph
 * - **mix**: Integrates knowledge graph retrieval with vector search (recommended)
 * - **bypass**: Direct LLM query without knowledge retrieval
 *
 * conversation_history parameteris sent to LLM only, does not affect retrieval results.
 *
 * **Usage Examples:**
 *
 * Basic query:
 * ```json
 * {
 * "query": "What is machine learning?",
 * "mode": "mix"
 * }
 * ```
 *
 * Bypass initial LLM call by providing high-level and low-level keywords:
 * ```json
 * {
 * "query": "What is Retrieval-Augmented-Generation?",
 * "hl_keywords": ["machine learning", "information retrieval", "natural language processing"],
 * "ll_keywords": ["retrieval augmented generation", "RAG", "knowledge base"],
 * "mode": "mix"
 * }
 * ```
 *
 * Advanced query with references:
 * ```json
 * {
 * "query": "Explain neural networks",
 * "mode": "hybrid",
 * "include_references": true,
 * "response_type": "Multiple Paragraphs",
 * "top_k": 10
 * }
 * ```
 *
 * Conversation with history:
 * ```json
 * {
 * "query": "Can you give me more details?",
 * "conversation_history": [
 * {"role": "user", "content": "What is AI?"},
 * {"role": "assistant", "content": "AI is artificial intelligence..."}
 * ]
 * }
 * ```
 *
 * Args:
 * request (QueryRequest): The request object containing query parameters:
 * - **query**: The question or prompt to process (min 3 characters)
 * - **mode**: Query strategy - "mix" recommended for best results
 * - **include_references**: Whether to include source citations
 * - **response_type**: Format preference (e.g., "Multiple Paragraphs")
 * - **top_k**: Number of top entities/relations to retrieve
 * - **conversation_history**: Previous dialogue context
 * - **max_total_tokens**: Token budget for the entire response
 *
 * Returns:
 * QueryResponse: JSON response containing:
 * - **response**: The generated answer to your query
 * - **references**: Source citations (if include_references=True)
 *
 * Raises:
 * HTTPException:
 * - 400: Invalid input parameters (e.g., query too short)
 * - 500: Internal processing error (e.g., LLM service unavailable)
 */
export declare const queryTextQueryPost: <ThrowOnError extends boolean = false>(options: Options<QueryTextQueryPostData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<QueryTextQueryPostResponses, QueryTextQueryPostErrors, ThrowOnError, "fields">;
/**
 * Query Text Stream
 *
 * Advanced RAG query endpoint with flexible streaming response.
 *
 * This endpoint provides the most flexible querying experience, supporting both real-time streaming
 * and complete response delivery based on your integration needs.
 *
 * **Response Modes:**
 * - Real-time response delivery as content is generated
 * - NDJSON format: each line is a separate JSON object
 * - First line: `{"references": [...]}` (if include_references=True)
 * - Subsequent lines: `{"response": "content chunk"}`
 * - Error handling: `{"error": "error message"}`
 *
 * > If stream parameter is False, or the query hit LLM cache, complete response delivered in a single streaming message.
 *
 * **Response Format Details**
 * - **Content-Type**: `application/x-ndjson` (Newline-Delimited JSON)
 * - **Structure**: Each line is an independent, valid JSON object
 * - **Parsing**: Process line-by-line, each line is self-contained
 * - **Headers**: Includes cache control and connection management
 *
 * **Query Modes (same as /query endpoint)**
 * - **local**: Entity-focused retrieval with direct relationships
 * - **global**: Pattern analysis across the knowledge graph
 * - **hybrid**: Combined local and global strategies
 * - **naive**: Vector similarity search only
 * - **mix**: Integrated knowledge graph + vector retrieval (recommended)
 * - **bypass**: Direct LLM query without knowledge retrieval
 *
 * conversation_history parameteris sent to LLM only, does not affect retrieval results.
 *
 * **Usage Examples**
 *
 * Real-time streaming query:
 * ```json
 * {
 * "query": "Explain machine learning algorithms",
 * "mode": "mix",
 * "stream": true,
 * "include_references": true
 * }
 * ```
 *
 * Bypass initial LLM call by providing high-level and low-level keywords:
 * ```json
 * {
 * "query": "What is Retrieval-Augmented-Generation?",
 * "hl_keywords": ["machine learning", "information retrieval", "natural language processing"],
 * "ll_keywords": ["retrieval augmented generation", "RAG", "knowledge base"],
 * "mode": "mix"
 * }
 * ```
 *
 * Complete response query:
 * ```json
 * {
 * "query": "What is deep learning?",
 * "mode": "hybrid",
 * "stream": false,
 * "response_type": "Multiple Paragraphs"
 * }
 * ```
 *
 * Conversation with context:
 * ```json
 * {
 * "query": "Can you elaborate on that?",
 * "stream": true,
 * "conversation_history": [
 * {"role": "user", "content": "What is neural network?"},
 * {"role": "assistant", "content": "A neural network is..."}
 * ]
 * }
 * ```
 *
 * **Response Processing:**
 *
 * ```python
 * async for line in response.iter_lines():
 * data = json.loads(line)
 * if "references" in data:
 * # Handle references (first message)
 * references = data["references"]
 * if "response" in data:
 * # Handle content chunk
 * content_chunk = data["response"]
 * if "error" in data:
 * # Handle error
 * error_message = data["error"]
 * ```
 *
 * **Error Handling:**
 * - Streaming errors are delivered as `{"error": "message"}` lines
 * - Non-streaming errors raise HTTP exceptions
 * - Partial responses may be delivered before errors in streaming mode
 * - Always check for error objects when processing streaming responses
 *
 * Args:
 * request (QueryRequest): The request object containing query parameters:
 * - **query**: The question or prompt to process (min 3 characters)
 * - **mode**: Query strategy - "mix" recommended for best results
 * - **stream**: Enable streaming (True) or complete response (False)
 * - **include_references**: Whether to include source citations
 * - **response_type**: Format preference (e.g., "Multiple Paragraphs")
 * - **top_k**: Number of top entities/relations to retrieve
 * - **conversation_history**: Previous dialogue context for multi-turn conversations
 * - **max_total_tokens**: Token budget for the entire response
 *
 * Returns:
 * StreamingResponse: NDJSON streaming response containing:
 * - **Streaming mode**: Multiple JSON objects, one per line
 * - References object (if requested): `{"references": [...]}`
 * - Content chunks: `{"response": "chunk content"}`
 * - Error objects: `{"error": "error message"}`
 * - **Non-streaming mode**: Single JSON object
 * - Complete response: `{"references": [...], "response": "complete content"}`
 *
 * Raises:
 * HTTPException:
 * - 400: Invalid input parameters (e.g., query too short, invalid mode)
 * - 500: Internal processing error (e.g., LLM service unavailable)
 *
 * Note:
 * This endpoint is ideal for applications requiring flexible response delivery.
 * Use streaming mode for real-time interfaces and non-streaming for batch processing.
 */
export declare const queryTextStreamQueryStreamPost: <ThrowOnError extends boolean = false>(options: Options<QueryTextStreamQueryStreamPostData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<QueryTextStreamQueryStreamPostResponses, QueryTextStreamQueryStreamPostErrors, ThrowOnError, "fields">;
/**
 * Query Data
 *
 * Advanced data retrieval endpoint for structured RAG analysis.
 *
 * This endpoint provides raw retrieval results without LLM generation, perfect for:
 * - **Data Analysis**: Examine what information would be used for RAG
 * - **System Integration**: Get structured data for custom processing
 * - **Debugging**: Understand retrieval behavior and quality
 * - **Research**: Analyze knowledge graph structure and relationships
 *
 * **Key Features:**
 * - No LLM generation - pure data retrieval
 * - Complete structured output with entities, relationships, and chunks
 * - Always includes references for citation
 * - Detailed metadata about processing and keywords
 * - Compatible with all query modes and parameters
 *
 * **Query Mode Behaviors:**
 * - **local**: Returns entities and their direct relationships + related chunks
 * - **global**: Returns relationship patterns across the knowledge graph
 * - **hybrid**: Combines local and global retrieval strategies
 * - **naive**: Returns only vector-retrieved text chunks (no knowledge graph)
 * - **mix**: Integrates knowledge graph data with vector-retrieved chunks
 * - **bypass**: Returns empty data arrays (used for direct LLM queries)
 *
 * **Data Structure:**
 * - **entities**: Knowledge graph entities with descriptions and metadata
 * - **relationships**: Connections between entities with weights and descriptions
 * - **chunks**: Text segments from documents with source information
 * - **references**: Citation information mapping reference IDs to file paths
 * - **metadata**: Processing information, keywords, and query statistics
 *
 * **Usage Examples:**
 *
 * Analyze entity relationships:
 * ```json
 * {
 * "query": "machine learning algorithms",
 * "mode": "local",
 * "top_k": 10
 * }
 * ```
 *
 * Explore global patterns:
 * ```json
 * {
 * "query": "artificial intelligence trends",
 * "mode": "global",
 * "max_relation_tokens": 2000
 * }
 * ```
 *
 * Vector similarity search:
 * ```json
 * {
 * "query": "neural network architectures",
 * "mode": "naive",
 * "chunk_top_k": 5
 * }
 * ```
 *
 * Bypass initial LLM call by providing high-level and low-level keywords:
 * ```json
 * {
 * "query": "What is Retrieval-Augmented-Generation?",
 * "hl_keywords": ["machine learning", "information retrieval", "natural language processing"],
 * "ll_keywords": ["retrieval augmented generation", "RAG", "knowledge base"],
 * "mode": "mix"
 * }
 * ```
 *
 * **Response Analysis:**
 * - **Empty arrays**: Normal for certain modes (e.g., naive mode has no entities/relationships)
 * - **Processing info**: Shows retrieval statistics and token usage
 * - **Keywords**: High-level and low-level keywords extracted from query
 * - **Reference mapping**: Links all data back to source documents
 *
 * Args:
 * request (QueryRequest): The request object containing query parameters:
 * - **query**: The search query to analyze (min 3 characters)
 * - **mode**: Retrieval strategy affecting data types returned
 * - **top_k**: Number of top entities/relationships to retrieve
 * - **chunk_top_k**: Number of text chunks to retrieve
 * - **max_entity_tokens**: Token limit for entity context
 * - **max_relation_tokens**: Token limit for relationship context
 * - **max_total_tokens**: Overall token budget for retrieval
 *
 * Returns:
 * QueryDataResponse: Structured JSON response containing:
 * - **status**: "success" or "failure"
 * - **message**: Human-readable status description
 * - **data**: Complete retrieval results with entities, relationships, chunks, references
 * - **metadata**: Query processing information and statistics
 *
 * Raises:
 * HTTPException:
 * - 400: Invalid input parameters (e.g., query too short, invalid mode)
 * - 500: Internal processing error (e.g., knowledge graph unavailable)
 *
 * Note:
 * This endpoint always includes references regardless of the include_references parameter,
 * as structured data analysis typically requires source attribution.
 */
export declare const queryDataQueryDataPost: <ThrowOnError extends boolean = false>(options: Options<QueryDataQueryDataPostData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<QueryDataQueryDataPostResponses, QueryDataQueryDataPostErrors, ThrowOnError, "fields">;
/**
 * Get Graph Labels
 *
 * Get all graph labels
 *
 * Returns:
 * List[str]: List of graph labels
 */
export declare const getGraphLabelsGraphLabelListGet: <ThrowOnError extends boolean = false>(options?: Options<GetGraphLabelsGraphLabelListGetData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetGraphLabelsGraphLabelListGetResponses, unknown, ThrowOnError, "fields">;
/**
 * Get Popular Labels
 *
 * Get popular labels by node degree (most connected entities)
 *
 * Args:
 * limit (int): Maximum number of labels to return (default: 300, max: 1000)
 *
 * Returns:
 * List[str]: List of popular labels sorted by degree (highest first)
 */
export declare const getPopularLabelsGraphLabelPopularGet: <ThrowOnError extends boolean = false>(options?: Options<GetPopularLabelsGraphLabelPopularGetData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetPopularLabelsGraphLabelPopularGetResponses, GetPopularLabelsGraphLabelPopularGetErrors, ThrowOnError, "fields">;
/**
 * Search Labels
 *
 * Search labels with fuzzy matching
 *
 * Args:
 * q (str): Search query string
 * limit (int): Maximum number of results to return (default: 50, max: 100)
 *
 * Returns:
 * List[str]: List of matching labels sorted by relevance
 */
export declare const searchLabelsGraphLabelSearchGet: <ThrowOnError extends boolean = false>(options: Options<SearchLabelsGraphLabelSearchGetData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<SearchLabelsGraphLabelSearchGetResponses, SearchLabelsGraphLabelSearchGetErrors, ThrowOnError, "fields">;
/**
 * Get Knowledge Graph
 *
 * Retrieve a connected subgraph of nodes where the label includes the specified label.
 * When reducing the number of nodes, the prioritization criteria are as follows:
 * 1. Hops(path) to the staring node take precedence
 * 2. Followed by the degree of the nodes
 *
 * Args:
 * label (str): Label of the starting node
 * max_depth (int, optional): Maximum depth of the subgraph,Defaults to 3
 * max_nodes: Maxiumu nodes to return
 *
 * Returns:
 * Dict[str, List[str]]: Knowledge graph for label
 */
export declare const getKnowledgeGraphGraphsGet: <ThrowOnError extends boolean = false>(options: Options<GetKnowledgeGraphGraphsGetData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetKnowledgeGraphGraphsGetResponses, GetKnowledgeGraphGraphsGetErrors, ThrowOnError, "fields">;
/**
 * Check Entity Exists
 *
 * Check if an entity with the given name exists in the knowledge graph
 *
 * Args:
 * name (str): Name of the entity to check
 *
 * Returns:
 * Dict[str, bool]: Dictionary with 'exists' key indicating if entity exists
 */
export declare const checkEntityExistsGraphEntityExistsGet: <ThrowOnError extends boolean = false>(options: Options<CheckEntityExistsGraphEntityExistsGetData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CheckEntityExistsGraphEntityExistsGetResponses, CheckEntityExistsGraphEntityExistsGetErrors, ThrowOnError, "fields">;
/**
 * Update Entity
 *
 * Update an entity's properties in the knowledge graph
 *
 * This endpoint allows updating entity properties, including renaming entities.
 * When renaming to an existing entity name, the behavior depends on allow_merge:
 *
 * Args:
 * request (EntityUpdateRequest): Request containing:
 * - entity_name (str): Name of the entity to update
 * - updated_data (Dict[str, Any]): Dictionary of properties to update
 * - allow_rename (bool): Whether to allow entity renaming (default: False)
 * - allow_merge (bool): Whether to merge into existing entity when renaming
 * causes name conflict (default: False)
 *
 * Returns:
 * Dict with the following structure:
 * {
 * "status": "success",
 * "message": "Entity updated successfully" | "Entity merged successfully into 'target_name'",
 * "data": {
 * "entity_name": str,        # Final entity name
 * "description": str,        # Entity description
 * "entity_type": str,        # Entity type
 * "source_id": str,         # Source chunk IDs
 * ...                       # Other entity properties
 * },
 * "operation_summary": {
 * "merged": bool,           # Whether entity was merged into another
 * "merge_status": str,      # "success" | "failed" | "not_attempted"
 * "merge_error": str | None, # Error message if merge failed
 * "operation_status": str,  # "success" | "partial_success" | "failure"
 * "target_entity": str | None, # Target entity name if renaming/merging
 * "final_entity": str,      # Final entity name after operation
 * "renamed": bool           # Whether entity was renamed
 * }
 * }
 *
 * operation_status values explained:
 * - "success": All operations completed successfully
 * * For simple updates: entity properties updated
 * * For renames: entity renamed successfully
 * * For merges: non-name updates applied AND merge completed
 *
 * - "partial_success": Update succeeded but merge failed
 * * Non-name property updates were applied successfully
 * * Merge operation failed (entity not merged)
 * * Original entity still exists with updated properties
 * * Use merge_error for failure details
 *
 * - "failure": Operation failed completely
 * * If merge_status == "failed": Merge attempted but both update and merge failed
 * * If merge_status == "not_attempted": Regular update failed
 * * No changes were applied to the entity
 *
 * merge_status values explained:
 * - "success": Entity successfully merged into target entity
 * - "failed": Merge operation was attempted but failed
 * - "not_attempted": No merge was attempted (normal update/rename)
 *
 * Behavior when renaming to an existing entity:
 * - If allow_merge=False: Raises ValueError with 400 status (default behavior)
 * - If allow_merge=True: Automatically merges the source entity into the existing target entity,
 * preserving all relationships and applying non-name updates first
 *
 * Example Request (simple update):
 * POST /graph/entity/edit
 * {
 * "entity_name": "Tesla",
 * "updated_data": {"description": "Updated description"},
 * "allow_rename": false,
 * "allow_merge": false
 * }
 *
 * Example Response (simple update success):
 * {
 * "status": "success",
 * "message": "Entity updated successfully",
 * "data": { ... },
 * "operation_summary": {
 * "merged": false,
 * "merge_status": "not_attempted",
 * "merge_error": null,
 * "operation_status": "success",
 * "target_entity": null,
 * "final_entity": "Tesla",
 * "renamed": false
 * }
 * }
 *
 * Example Request (rename with auto-merge):
 * POST /graph/entity/edit
 * {
 * "entity_name": "Elon Msk",
 * "updated_data": {
 * "entity_name": "Elon Musk",
 * "description": "Corrected description"
 * },
 * "allow_rename": true,
 * "allow_merge": true
 * }
 *
 * Example Response (merge success):
 * {
 * "status": "success",
 * "message": "Entity merged successfully into 'Elon Musk'",
 * "data": { ... },
 * "operation_summary": {
 * "merged": true,
 * "merge_status": "success",
 * "merge_error": null,
 * "operation_status": "success",
 * "target_entity": "Elon Musk",
 * "final_entity": "Elon Musk",
 * "renamed": true
 * }
 * }
 *
 * Example Response (partial success - update succeeded but merge failed):
 * {
 * "status": "success",
 * "message": "Entity updated successfully",
 * "data": { ... },  # Data reflects updated "Elon Msk" entity
 * "operation_summary": {
 * "merged": false,
 * "merge_status": "failed",
 * "merge_error": "Target entity locked by another operation",
 * "operation_status": "partial_success",
 * "target_entity": "Elon Musk",
 * "final_entity": "Elon Msk",  # Original entity still exists
 * "renamed": true
 * }
 * }
 */
export declare const updateEntityGraphEntityEditPost: <ThrowOnError extends boolean = false>(options: Options<UpdateEntityGraphEntityEditPostData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdateEntityGraphEntityEditPostResponses, UpdateEntityGraphEntityEditPostErrors, ThrowOnError, "fields">;
/**
 * Update Relation
 *
 * Update a relation's properties in the knowledge graph
 *
 * Args:
 * request (RelationUpdateRequest): Request containing source ID, target ID and updated data
 *
 * Returns:
 * Dict: Updated relation information
 */
export declare const updateRelationGraphRelationEditPost: <ThrowOnError extends boolean = false>(options: Options<UpdateRelationGraphRelationEditPostData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<UpdateRelationGraphRelationEditPostResponses, UpdateRelationGraphRelationEditPostErrors, ThrowOnError, "fields">;
/**
 * Create Entity
 *
 * Create a new entity in the knowledge graph
 *
 * This endpoint creates a new entity node in the knowledge graph with the specified
 * properties. The system automatically generates vector embeddings for the entity
 * to enable semantic search and retrieval.
 *
 * Request Body:
 * entity_name (str): Unique name identifier for the entity
 * entity_data (dict): Entity properties including:
 * - description (str): Textual description of the entity
 * - entity_type (str): Category/type of the entity (e.g., PERSON, ORGANIZATION, LOCATION)
 * - source_id (str): Related chunk_id from which the description originates
 * - Additional custom properties as needed
 *
 * Response Schema:
 * {
 * "status": "success",
 * "message": "Entity 'Tesla' created successfully",
 * "data": {
 * "entity_name": "Tesla",
 * "description": "Electric vehicle manufacturer",
 * "entity_type": "ORGANIZATION",
 * "source_id": "chunk-123<SEP>chunk-456"
 * ... (other entity properties)
 * }
 * }
 *
 * HTTP Status Codes:
 * 200: Entity created successfully
 * 400: Invalid request (e.g., missing required fields, duplicate entity)
 * 500: Internal server error
 *
 * Example Request:
 * POST /graph/entity/create
 * {
 * "entity_name": "Tesla",
 * "entity_data": {
 * "description": "Electric vehicle manufacturer",
 * "entity_type": "ORGANIZATION"
 * }
 * }
 */
export declare const createEntityGraphEntityCreatePost: <ThrowOnError extends boolean = false>(options: Options<CreateEntityGraphEntityCreatePostData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateEntityGraphEntityCreatePostResponses, CreateEntityGraphEntityCreatePostErrors, ThrowOnError, "fields">;
/**
 * Create Relation
 *
 * Create a new relationship between two entities in the knowledge graph
 *
 * This endpoint establishes an undirected relationship between two existing entities.
 * The provided source/target order is accepted for convenience, but the backend
 * stored edge is undirected and may be returned with the entities swapped.
 * Both entities must already exist in the knowledge graph. The system automatically
 * generates vector embeddings for the relationship to enable semantic search and graph traversal.
 *
 * Prerequisites:
 * - Both source_entity and target_entity must exist in the knowledge graph
 * - Use /graph/entity/create to create entities first if they don't exist
 *
 * Request Body:
 * source_entity (str): Name of the source entity (relationship origin)
 * target_entity (str): Name of the target entity (relationship destination)
 * relation_data (dict): Relationship properties including:
 * - description (str): Textual description of the relationship
 * - keywords (str): Comma-separated keywords describing the relationship type
 * - source_id (str): Related chunk_id from which the description originates
 * - weight (float): Relationship strength/importance (default: 1.0)
 * - Additional custom properties as needed
 *
 * Response Schema:
 * {
 * "status": "success",
 * "message": "Relation created successfully between 'Elon Musk' and 'Tesla'",
 * "data": {
 * "src_id": "Elon Musk",
 * "tgt_id": "Tesla",
 * "description": "Elon Musk is the CEO of Tesla",
 * "keywords": "CEO, founder",
 * "source_id": "chunk-123<SEP>chunk-456"
 * "weight": 1.0,
 * ... (other relationship properties)
 * }
 * }
 *
 * HTTP Status Codes:
 * 200: Relationship created successfully
 * 400: Invalid request (e.g., missing entities, invalid data, duplicate relationship)
 * 500: Internal server error
 *
 * Example Request:
 * POST /graph/relation/create
 * {
 * "source_entity": "Elon Musk",
 * "target_entity": "Tesla",
 * "relation_data": {
 * "description": "Elon Musk is the CEO of Tesla",
 * "keywords": "CEO, founder",
 * "weight": 1.0
 * }
 * }
 */
export declare const createRelationGraphRelationCreatePost: <ThrowOnError extends boolean = false>(options: Options<CreateRelationGraphRelationCreatePostData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<CreateRelationGraphRelationCreatePostResponses, CreateRelationGraphRelationCreatePostErrors, ThrowOnError, "fields">;
/**
 * Merge Entities
 *
 * Merge multiple entities into a single entity, preserving all relationships
 *
 * This endpoint consolidates duplicate or misspelled entities while preserving the entire
 * graph structure. It's particularly useful for cleaning up knowledge graphs after document
 * processing or correcting entity name variations.
 *
 * What the Merge Operation Does:
 * 1. Deletes the specified source entities from the knowledge graph
 * 2. Transfers all relationships from source entities to the target entity
 * 3. Intelligently merges duplicate relationships (if multiple sources have the same relationship)
 * 4. Updates vector embeddings for accurate retrieval and search
 * 5. Preserves the complete graph structure and connectivity
 * 6. Maintains relationship properties and metadata
 *
 * Use Cases:
 * - Fixing spelling errors in entity names (e.g., "Elon Msk" -> "Elon Musk")
 * - Consolidating duplicate entities discovered after document processing
 * - Merging name variations (e.g., "NY", "New York", "New York City")
 * - Cleaning up the knowledge graph for better query performance
 * - Standardizing entity names across the knowledge base
 *
 * Request Body:
 * entities_to_change (list[str]): List of entity names to be merged and deleted
 * entity_to_change_into (str): Target entity that will receive all relationships
 *
 * Response Schema:
 * {
 * "status": "success",
 * "message": "Successfully merged 2 entities into 'Elon Musk'",
 * "data": {
 * "merged_entity": "Elon Musk",
 * "deleted_entities": ["Elon Msk", "Ellon Musk"],
 * "relationships_transferred": 15,
 * ... (merge operation details)
 * }
 * }
 *
 * HTTP Status Codes:
 * 200: Entities merged successfully
 * 400: Invalid request (e.g., empty entity list, target entity doesn't exist)
 * 500: Internal server error
 *
 * Example Request:
 * POST /graph/entities/merge
 * {
 * "entities_to_change": ["Elon Msk", "Ellon Musk"],
 * "entity_to_change_into": "Elon Musk"
 * }
 *
 * Note:
 * - The target entity (entity_to_change_into) must exist in the knowledge graph
 * - Source entities will be permanently deleted after the merge
 * - This operation cannot be undone, so verify entity names before merging
 */
export declare const mergeEntitiesGraphEntitiesMergePost: <ThrowOnError extends boolean = false>(options: Options<MergeEntitiesGraphEntitiesMergePostData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<MergeEntitiesGraphEntitiesMergePostResponses, MergeEntitiesGraphEntitiesMergePostErrors, ThrowOnError, "fields">;
/**
 * Get Version
 *
 * Get Ollama version information
 */
export declare const getVersionApiVersionGet: <ThrowOnError extends boolean = false>(options?: Options<GetVersionApiVersionGetData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetVersionApiVersionGetResponses, unknown, ThrowOnError, "fields">;
/**
 * Get Tags
 *
 * Return available models acting as an Ollama server
 */
export declare const getTagsApiTagsGet: <ThrowOnError extends boolean = false>(options?: Options<GetTagsApiTagsGetData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetTagsApiTagsGetResponses, unknown, ThrowOnError, "fields">;
/**
 * Get Running Models
 *
 * List Running Models - returns currently running models
 */
export declare const getRunningModelsApiPsGet: <ThrowOnError extends boolean = false>(options?: Options<GetRunningModelsApiPsGetData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetRunningModelsApiPsGetResponses, unknown, ThrowOnError, "fields">;
/**
 * Generate
 *
 * Handle generate completion requests acting as an Ollama model
 * For compatibility purpose, the request is not processed by LightRAG,
 * and will be handled by underlying LLM model.
 * Supports both application/json and application/octet-stream Content-Types.
 */
export declare const generateApiGeneratePost: <ThrowOnError extends boolean = false>(options?: Options<GenerateApiGeneratePostData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GenerateApiGeneratePostResponses, unknown, ThrowOnError, "fields">;
/**
 * Chat
 *
 * Process chat completion requests by acting as an Ollama model.
 * Routes user queries through LightRAG by selecting query mode based on query prefix.
 * Detects and forwards OpenWebUI session-related requests (for meta data generation task) directly to LLM.
 * Supports both application/json and application/octet-stream Content-Types.
 */
export declare const chatApiChatPost: <ThrowOnError extends boolean = false>(options?: Options<ChatApiChatPostData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<ChatApiChatPostResponses, unknown, ThrowOnError, "fields">;
/**
 * Redirect To Webui
 *
 * Redirect root path based on WebUI availability
 */
export declare const redirectToWebuiGet: <ThrowOnError extends boolean = false>(options?: Options<RedirectToWebuiGetData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<RedirectToWebuiGetResponses, unknown, ThrowOnError, "fields">;
/**
 * Get Auth Status
 *
 * Get authentication status and guest token if auth is not configured
 */
export declare const getAuthStatusAuthStatusGet: <ThrowOnError extends boolean = false>(options?: Options<GetAuthStatusAuthStatusGetData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetAuthStatusAuthStatusGetResponses, unknown, ThrowOnError, "fields">;
/**
 * Login
 */
export declare const loginLoginPost: <ThrowOnError extends boolean = false>(options: Options<LoginLoginPostData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<LoginLoginPostResponses, LoginLoginPostErrors, ThrowOnError, "fields">;
/**
 * Get system health and configuration status
 *
 * Returns comprehensive system status including WebUI availability, configuration, and operational metrics
 */
export declare const getStatusHealthGet: <ThrowOnError extends boolean = false>(options?: Options<GetStatusHealthGetData, ThrowOnError>) => import("./client/types.gen.js").RequestResult<GetStatusHealthGetResponses, unknown, ThrowOnError, "fields">;
