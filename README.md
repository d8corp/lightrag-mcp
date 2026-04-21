<div align="center">

# lightrag-mcp

[![NPM](https://img.shields.io/npm/v/lightrag-mcp.svg)](https://www.npmjs.com/package/lightrag-mcp)
[![downloads](https://img.shields.io/npm/dm/lightrag-mcp.svg)](https://www.npmjs.com/package/lightrag-mcp)
[![install size](https://packagephobia.com/badge?p=lightrag-mcp)](https://packagephobia.com/result?p=lightrag-mcp)
[![license](https://img.shields.io/npm/l/lightrag-mcp)](https://github.com/d8corp/lightrag-mcp/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

Model Context Protocol server for seamless [LightRAG](https://github.com/HKUDS/LightRAG) integration.
</div>

<blockquote>
  ┌ 📋 <a href="#requirements">Requirements</a><br>
  ├ 📦 <a href="#installation">Installation</a><br>
  ├ 🚀 <a href="#getting-started">Getting Started</a><br>
  ├ ⚙️ <a href="#configuration">Configuration</a><br>
  ├ 🔌 <a href="#mcp-client-configuration">MCP Client Configuration</a><br>
  ├ 🛠️ <a href="#available-tools">Tools (26)</a><br>
  ├ 🎯 <a href="#usage-examples">Usage Examples</a><br>
  ├ 💻 <a href="#programmatic-usage">Programmatic Usage</a><br>
  ├ 🔧 <a href="#development">Development</a><br>
  ├ 🔧 <a href="#troubleshooting">Troubleshooting</a><br>
  └ 🔗 <a href="#links">Links</a>
</blockquote>

**lightrag-mcp** is a Model Context Protocol (MCP) server that bridges AI assistants with [LightRAG](https://github.com/HKUDS/LightRAG)'s powerful knowledge graph capabilities.
It enables your AI tools like Claude Desktop, Cline, or custom integrations to interact with LightRAG's Retrieval-Augmented Generation system through a standardized protocol.

- 🔌 **MCP Protocol** - Stdio transport for seamless client integration
- 🛡️ **Type Safety** - Full TypeScript support with Zod validation
- 🤖 **Auto-generated SDK** - Types and client from OpenAPI spec
- 🧰 **26 Tools** - Complete LightRAG API coverage
- 📊 **Knowledge Graphs** - Build and explore entity relationships
- 🔍 **Multiple Query Modes** - Local, global, hybrid, and more
- 📝 **Document Management** - Insert, track, and reprocess documents
- ⚡ **Fast & Lightweight** - Minimal dependencies, maximum performance


[![stars](https://img.shields.io/github/stars/d8corp/lightrag-mcp?style=social)](https://github.com/d8corp/lightrag-mcp/stargazers)
[![watchers](https://img.shields.io/github/watchers/d8corp/lightrag-mcp?style=social)](https://github.com/d8corp/lightrag-mcp/watchers)

## Requirements
###### [🏠︎](#lightrag-mcp) / Requirements [↓](#installation)

Before you begin, make sure your environment meets these requirements:

- Node.js 18+ (LTS recommended)
- Running LightRAG server (default port 9621)
- API key for authentication

## Installation
###### [🏠︎](#lightrag-mcp) / Installation [↑](#requirements) [↓](#getting-started)

Choose the installation method that fits your use case:

Install globally (for CLI usage):
```sh
npm i -g lightrag-mcp
```

Add to project dependencies:
```sh
npm i lightrag-mcp
```

Add as dev dependency (for development tools):
```sh
npm i -D lightrag-mcp
```

## Getting Started
###### [🏠︎](#lightrag-mcp) / Getting Started [↑](#installation) [↓](#configuration)

LightRAG MCP server connects your AI assistant to LightRAG's knowledge graph capabilities through the Model Context Protocol. The server runs as a stdio transport, making it compatible with any MCP client like Claude Desktop, Cline, or custom integrations.

```
┌─────────────────────┐
│   MCP Client        │
│  (Claude Desktop,   │
│   Cline, Custom)    │
└──────────┬──────────┘
           │ stdio
           │ (MCP Protocol)
           ▼
┌─────────────────────┐
│  MCP Server         │
│ (lightrag-mcp)      │
└──────────┬──────────┘
           │ HTTP/REST
           │ (OpenAPI)
           ▼
┌─────────────────────┐
│  LightRAG Server    │
└─────────────────────┘
```

**How it works:**
1. **MCP Client** sends tool requests via stdio transport
2. **lightrag-mcp** validates requests and translates them to LightRAG API calls
3. **LightRAG Server** processes requests and returns results
4. **lightrag-mcp** formats responses back to MCP protocol
5. **MCP Client** receives structured data for the AI assistant

With this server, you can:
- **Build knowledge graphs** from your documents automatically
- **Query information** using multiple search strategies (local, global, hybrid)
- **Manage entities and relationships** in your knowledge base
- **Track document processing** and reprocess failed items
- **Explore connections** between concepts through graph visualization

While MCP servers are designed to work with MCP clients, you can test them directly:

**Using MCP Inspector (recommended for testing):**
```sh
npx @modelcontextprotocol/inspector lightrag-mcp --token your-api-key
```

**Direct stdio testing with echo:**
```sh
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"query_text","arguments":{"query":"What is LightRAG?","mode":"hybrid"}}}' | lightrag-mcp --token your-api-key
```

**Note:** Replace `your-api-key` with your actual API key and add `-u https://your-server.com` if using a remote LightRAG server.

## Configuration
###### [🏠︎](#lightrag-mcp) / Configuration [↑](#getting-started) [↓](#mcp-client-configuration)

You can configure the lightrag-mcp server in multiple ways, with the following priority (highest to lowest):

1. **CLI options** - Direct command-line arguments
2. **Environment variables** - System or shell environment
3. **`.env` file** - Local configuration file
4. **MCP client configuration** - Settings in your MCP client (Claude Desktop, etc.)

### CLI Options

Pass configuration directly via command-line flags:

| Option                | Description                                         |
|-----------------------|-----------------------------------------------------|
| `-u, --url <url>`     | LightRAG server URL (overrides `LIGHTRAG_BASE_URL`) |
| `-t, --token <token>` | API key (overrides `LIGHTRAG_API_KEY`)              |
| `-v, --version`       | Display version                                     |
| `-h, --help`          | Display help                                        |

**Example:**
```sh
lightrag-mcp --url https://rag.example.com --token your-api-key
```

### Environment Variables

Set configuration via environment variables:

| Variable            | Description                | Default                 |
|---------------------|----------------------------|-------------------------|
| `LIGHTRAG_BASE_URL` | LightRAG server URL        | `http://localhost:9621` |
| `LIGHTRAG_API_KEY`  | API key for authentication | -                       |

**Example:**
```sh
export LIGHTRAG_BASE_URL=https://rag.example.com
export LIGHTRAG_API_KEY=your-api-key
lightrag-mcp
```

### `.env` File

Create a `.env` file in your project root:

```sh
LIGHTRAG_BASE_URL=https://rag.example.com
LIGHTRAG_API_KEY=your-api-key
```

Then simply run:
```sh
lightrag-mcp
```

## MCP Client Configuration
###### [🏠︎](#lightrag-mcp) / MCP Client Configuration [↑](#configuration) [↓](#available-tools)

### Claude Desktop

Add to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`  
**Linux**: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "lightrag": {
      "command": "lightrag-mcp",
      "env": {
        "LIGHTRAG_BASE_URL": "https://rag.example.com",
        "LIGHTRAG_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Other MCP Clients (YAML)

For MCP clients and plugins that support YAML configuration:

```yaml
name: LightRAG MCP Server
version: 0.0.1
schema: v1
mcpServers:
  - name: LightRag
    type: stdio
    command: lightrag-mcp
    env:
      LIGHTRAG_BASE_URL: "https://rag.example.com"
      LIGHTRAG_API_KEY: "your-api-key"
```

## Available Tools
###### [🏠︎](#lightrag-mcp) / Available Tools [↑](#mcp-client-configuration) [↓](#usage-examples)

The server provides **26 MCP tools** organized into 4 categories:

<details>
<summary><b>📝 Documents (11 tools)</b> - Manage your knowledge base</summary>

### Document Management

#### `insert_text`
Add text content to LightRAG knowledge base.

```typescript
interface InsertTextParams {
  text: string          // Text content to add
  file_source?: string  // Optional source identifier
}
```

**Example:**
```json
{
  "tool": "insert_text",
  "arguments": {
    "text": "TypeScript is a typed superset of JavaScript",
    "file_source": "docs/typescript.md"
  }
}
```

#### `insert_texts`
Add multiple text documents at once.

```typescript
interface InsertTextsParams {
  texts: string[]         // Array of text contents
  file_sources?: string[] // Optional source identifiers
}
```

#### `scan_documents`
Trigger scanning process for new documents in the input directory.

#### `get_documents_paginated`
Retrieve documents with pagination support.

```typescript
interface GetDocumentsPaginatedParams {
  status_filter?: 'pending' | 'processing' | 'completed' | 'failed'
  page?: number           // Default: 1
  page_size?: number      // Default: 20
  sort_field?: string
  sort_direction?: 'asc' | 'desc'
}
```

#### `get_document_status_counts`
Get counts of documents by status.

#### `get_track_status`
Get the processing status of documents by tracking ID.

```typescript
interface GetTrackStatusParams {
  track_id: string
}
```

#### `delete_document`
Delete documents by their IDs.

```typescript
interface DeleteDocumentParams {
  doc_ids: string[]           // Document IDs to delete
  delete_file?: boolean       // Delete source files
  delete_llm_cache?: boolean  // Clear LLM cache
}
```

#### `clear_documents`
Clear all documents from the RAG system.

#### `clear_cache`
Clear all cache data from the LLM response cache storage.

#### `reprocess_failed`
Reprocess failed and pending documents.

</details>

<details>
<summary><b>🔍 Queries (2 tools)</b> - Search and retrieve information</summary>

### Query Operations

#### `query_text`
Query the RAG system with various modes.

```typescript
interface QueryTextParams {
  query: string
  mode?: 'local' | 'global' | 'hybrid' | 'naive' | 'mix' | 'bypass'
  top_k?: number
  enable_rerank?: boolean
  include_references?: boolean
}
```

**Modes:**
- `local` - Search within local context
- `global` - Global knowledge graph search
- `hybrid` - Combines local and global (default)
- `naive` - Simple vector search
- `mix` - Knowledge graph + vector search
- `bypass` - Direct LLM query without RAG

**Example:**
```json
{
  "tool": "query_text",
  "arguments": {
    "query": "What is LightRAG?",
    "mode": "hybrid",
    "top_k": 5,
    "enable_rerank": true
  }
}
```

#### `query_data`
Advanced data retrieval endpoint for structured RAG analysis without LLM generation.

</details>

<details>
<summary><b>🕸️ Knowledge Graph (11 tools)</b> - Build and explore entity relationships</summary>

### Graph Operations

#### `get_graph_labels`
Get all graph labels (entity types).

#### `get_popular_labels`
Get popular labels by node degree (most connected entities).

```typescript
interface GetPopularLabelsParams {
  limit?: number  // Default: 10
}
```

#### `search_labels`
Search labels with fuzzy matching.

```typescript
interface SearchLabelsParams {
  q: string       // Search query
  limit?: number  // Default: 10
}
```

**Example:**
```json
{
  "tool": "search_labels",
  "arguments": {
    "q": "machine learning",
    "limit": 10
  }
}
```

#### `get_knowledge_graph`
Retrieve a connected subgraph of nodes.

```typescript
interface GetKnowledgeGraphParams {
  label: string       // Starting entity label
  max_depth?: number  // Default: 2
  max_nodes?: number  // Default: 50
}
```

**Example:**
```json
{
  "tool": "get_knowledge_graph",
  "arguments": {
    "label": "LightRAG",
    "max_depth": 2,
    "max_nodes": 50
  }
}
```

#### `check_entity_exists`
Check if an entity with the given name exists.

```typescript
interface CheckEntityExistsParams {
  name: string
}
```

#### `create_entity`
Create a new entity in the knowledge graph.

```typescript
interface CreateEntityParams {
  entity_name: string
  entity_data: {
    entity_type?: string
    description?: string
    source_id?: string
  }
}
```

#### `update_entity`
Update an entity's properties.

```typescript
interface UpdateEntityParams {
  entity_name: string
  updated_data: object
  allow_rename?: boolean   // Allow renaming entity
  allow_merge?: boolean    // Allow merging with existing
}
```

#### `delete_entity`
Remove an entity and all its relationships.

```typescript
interface DeleteEntityParams {
  entity_name: string
}
```

#### `merge_entities`
Merge multiple entities into a single entity, preserving all relationships.

```typescript
interface MergeEntitiesParams {
  entities_to_change: string[]    // Entities to merge
  entity_to_change_into: string   // Target entity
}
```

**Example:**
```json
{
  "tool": "merge_entities",
  "arguments": {
    "entities_to_change": ["ML", "machine learning"],
    "entity_to_change_into": "Machine Learning"
  }
}
```

#### `create_relation`
Create a new relationship between two entities.

```typescript
interface CreateRelationParams {
  source_entity: string
  target_entity: string
  relation_data: {
    keywords?: string
    weight?: number
    description?: string
    source_id?: string
  }
}
```

#### `update_relation`
Update a relation's properties.

```typescript
interface UpdateRelationParams {
  source_id: string
  target_id: string
  updated_data: object
}
```

#### `delete_relation`
Remove a relationship between two entities.

```typescript
interface DeleteRelationParams {
  source_entity: string
  target_entity: string
}
```

</details>

<details>
<summary><b>⚙️ System (2 tools)</b> - Monitor and control pipeline</summary>

### System Management

#### `get_pipeline_status`
Get the current status of the document indexing pipeline.

#### `cancel_pipeline`
Request cancellation of the currently running pipeline.

</details>

## Usage Examples
###### [🏠︎](#lightrag-mcp) / Usage Examples [↑](#available-tools) [↓](#programmatic-usage)

<details>
<summary><b>📚 Basic Workflow</b> - Insert, process, and query documents</summary>

### Basic Workflow

Insert documents
```json
{
  "tool": "insert_text",
  "arguments": {
    "text": "LightRAG is a simple and fast RAG system.",
    "file_source": "intro.txt"
  }
}
```

Wait for processing
```json
{
  "tool": "get_pipeline_status"
}
```

Query your knowledge base
```json
{
  "tool": "query_text",
  "arguments": {
    "query": "What is LightRAG?",
    "mode": "hybrid"
  }
}
```

</details>

<details>
<summary><b>🔍 Query with Different Modes</b> - Explore various search strategies</summary>

### Query Modes

Hybrid mode (default)
```json
{
  "tool": "query_text",
  "arguments": {
    "query": "What is LightRAG?",
    "mode": "hybrid"
  }
}
```

Mix mode (knowledge graph + vector search)
```json
{
  "tool": "query_text",
  "arguments": {
    "query": "Explain RAG systems",
    "mode": "mix"
  }
}
```

</details>

<details>
<summary><b>🕸️ Knowledge Graph Operations</b> - Manage entities and relationships</summary>

### Graph Management

Search for entities
```json
{
  "tool": "search_labels",
  "arguments": {
    "q": "machine learning",
    "limit": 10
  }
}
```

Get entity subgraph
```json
{
  "tool": "get_knowledge_graph",
  "arguments": {
    "label": "LightRAG",
    "max_depth": 2,
    "max_nodes": 50
  }
}
```

Merge duplicate entities
```json
{
  "tool": "merge_entities",
  "arguments": {
    "entities_to_change": ["ML", "machine learning"],
    "entity_to_change_into": "Machine Learning"
  }
}
```

</details>

## Programmatic Usage
###### [🏠︎](#lightrag-mcp) / Programmatic Usage [↑](#usage-examples) [↓](#development)

```ts server.ts
import { LightRagServer } from 'lightrag-mcp'

const server = new LightRagServer({
  clientOptions: {
    baseUrl: 'https://rag.example.com',
  },
  apiKey: 'your-api-key',
})

await server.start()
```

## Development
###### [🏠︎](#lightrag-mcp) / Development [↑](#programmatic-usage) [↓](#troubleshooting)

```sh
# Install dependencies
npm install

# Build
npm run build

# Lint
npm run lint

# Update API types from OpenAPI spec
npm run update:api
```

## Troubleshooting
###### [🏠︎](#lightrag-mcp) / Troubleshooting [↑](#development) [↓](#links)

<details>
<summary><b>🔑 API key not found</b></summary>

**Symptoms:** `Error: Use apiKey option or LIGHTRAG_API_KEY`

**Solution:**
- Set `LIGHTRAG_API_KEY` in your `.env` file
- Pass via `--token` flag in CLI
- Provide in constructor options

```sh
# .env
LIGHTRAG_API_KEY=your-secret-key
```

</details>

<details>
<summary><b>🔌 Cannot connect to LightRAG</b></summary>

**Symptoms:** `Connection refused` or `ECONNREFUSED`

**Solution:**
- Verify LightRAG server is running on port 9621
- Check `LIGHTRAG_BASE_URL` configuration
- Verify firewall settings
- Test connection: `curl http://localhost:9621/health`

</details>

<details>
<summary><b>⏳ Documents not processing</b></summary>

**Symptoms:** Documents stuck in `pending` or `processing` state

**Check pipeline status:**
```sh
# Using CLI
curl http://localhost:9621/health

# Or use MCP tool
{
  "tool": "get_pipeline_status"
}
```

**Common causes:**
- LightRAG server overloaded
- Document format not supported
- Insufficient memory

**Solutions:**
- Check pipeline status: use `get_pipeline_status` tool
- Review LightRAG server logs
- Try reprocessing: use `reprocess_failed` tool
- Verify document format and size limits
- Increase server resources
- Split large documents

</details>

<details>
<summary><b>🕸️ Knowledge graph queries return empty results</b></summary>

**Symptoms:** `get_knowledge_graph` returns no nodes

**Solution:**
- Verify entity exists: use `check_entity_exists`
- Try fuzzy search: use `search_labels`
- Check if documents are fully processed
- Increase `max_depth` and `max_nodes` parameters

</details>

## Links
###### [🏠︎](#lightrag-mcp) / Links [↑](#troubleshooting) [↓](#issues)

You can find more MCP servers and tools on [NPM](https://www.npmjs.com/search?q=mcp)

- [LightRAG](https://github.com/HKUDS/LightRAG) - Knowledge graph-powered RAG system
- [MCP Specification](https://modelcontextprotocol.io/) - Model Context Protocol documentation

## Issues
###### [🏠︎](#lightrag-mcp) / Issues [↑](#links)

If you find a bug or have a suggestion, please file an issue on [GitHub](https://github.com/d8corp/lightrag-mcp/issues)

[![issues](https://img.shields.io/github/issues-raw/d8corp/lightrag-mcp)](https://github.com/d8corp/lightrag-mcp/issues)
