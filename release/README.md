<div align="center">

# lightrag-mcp

[![NPM](https://img.shields.io/npm/v/lightrag-mcp.svg)](https://www.npmjs.com/package/lightrag-mcp)
[![downloads](https://img.shields.io/npm/dm/lightrag-mcp.svg)](https://www.npmjs.com/package/lightrag-mcp)
[![license](https://img.shields.io/npm/l/lightrag-mcp)](https://github.com/d8corp/lightrag-mcp/blob/main/LICENSE)

MCP server for [LightRAG](https://github.com/HKUDS/LightRAG) integration.

</div>

## Installation

```bash
npm i lightrag-mcp
```

dev:
```bash
npm i -D lightrag-mcp
```

global:
```bash
npm i -g lightrag-mcp
```

## Getting Started

### Quick Start

Start the MCP server with default settings (connects to `http://localhost:9621`):

```bash
npx lightrag-mcp
```

### With Environment Variables

Configure via environment variables:

```bash
LIGHTRAG_BASE_URL=https://rag.example.com  
LIGHTRAG_API_KEY=your-api-key
```

### With CLI Options

Override settings using command-line options:

```bash
npx lightrag-mcp --url https://rag.example.com --token your-api-key
```

## Configuration

### Environment Variables

| Variable            | Description                | Default                 |
|---------------------|----------------------------|-------------------------|
| `LIGHTRAG_BASE_URL` | LightRAG server URL        | `http://localhost:9621` |
| `LIGHTRAG_API_KEY`  | API key for authentication | -                       |

### CLI Options

| Option | Description |
|--------|-------------|
| `-u, --url <url>` | LightRAG server URL (overrides `LIGHTRAG_BASE_URL`) |
| `-t, --token <token>` | API key (overrides `LIGHTRAG_API_KEY`) |
| `-v, --version` | Display version |
| `-h, --help` | Display help |

## MCP Client Configuration

### Claude Desktop

Add to your Claude Desktop configuration file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "lightrag": {
      "command": "npx",
      "args": ["lightrag-mcp"],
      "env": {
        "LIGHTRAG_BASE_URL": "https://rag.example.com",
        "LIGHTRAG_API_KEY": "your-api-key"
      }
    }
  }
}
```

## Available Tools

The server provides **26 MCP tools** across 4 categories:

### 📝 Documents (11 tools)

- `insert_text` - Add text content to LightRAG
- `insert_texts` - Add multiple text documents
- `scan_documents` - Scan for new documents
- `get_documents_paginated` - Retrieve documents with pagination
- `get_document_status_counts` - Get document status counts
- `get_track_status` - Track document processing status
- `delete_document` - Delete documents by ID
- `clear_documents` - Clear all documents
- `clear_cache` - Clear LLM cache
- `reprocess_failed` - Reprocess failed documents

### 🔍 Queries (2 tools)

- `query_text` - Query the RAG system (local, global, hybrid, naive, mix, bypass modes)
- `query_data` - Get structured RAG data without LLM generation

### 🕸️ Knowledge Graph (11 tools)

- `get_graph_labels` - Get all graph labels
- `get_popular_labels` - Get most connected entities
- `search_labels` - Fuzzy search for labels
- `get_knowledge_graph` - Retrieve subgraph
- `check_entity_exists` - Check entity existence
- `create_entity` - Create new entity
- `update_entity` - Update entity properties
- `delete_entity` - Delete entity
- `merge_entities` - Merge duplicate entities
- `create_relation` - Create entity relationship
- `update_relation` - Update relationship
- `delete_relation` - Delete relationship

### ⚙️ System (2 tools)

- `get_pipeline_status` - Get indexing pipeline status
- `cancel_pipeline` - Cancel running pipeline

## Usage Examples

### Insert Text

```typescript
// Via MCP tool
{
  "tool": "insert_text",
  "arguments": {
    "text": "LightRAG is a simple and fast RAG system.",
    "file_source": "intro.txt"
  }
}
```

### Query with Different Modes

```typescript
// Hybrid mode (default)
{
  "tool": "query_text",
  "arguments": {
    "query": "What is LightRAG?",
    "mode": "hybrid"
  }
}

// Mix mode (knowledge graph + vector search)
{
  "tool": "query_text",
  "arguments": {
    "query": "Explain RAG systems",
    "mode": "mix"
  }
}
```

### Knowledge Graph Operations

```typescript
// Search for entities
{
  "tool": "search_labels",
  "arguments": {
    "q": "machine learning",
    "limit": 10
  }
}

// Get entity subgraph
{
  "tool": "get_knowledge_graph",
  "arguments": {
    "label": "LightRAG",
    "max_depth": 2,
    "max_nodes": 50
  }
}

// Merge duplicate entities
{
  "tool": "merge_entities",
  "arguments": {
    "entities_to_change": ["ML", "machine learning"],
    "entity_to_change_into": "Machine Learning"
  }
}
```

## Programmatic Usage

```typescript
import { LightRagServer } from 'lightrag-mcp'

const server = new LightRagServer({
  clientOptions: {
    baseUrl: 'https://rag.example.com',
  },
  apiKey: 'your-api-key',
})

await server.start()
```

## Requirements

- Node.js 18+
- Running LightRAG server (see [LightRAG documentation](https://github.com/HKUDS/LightRAG))

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Lint
npm run lint

# Update API types from OpenAPI spec
npm run update:api
```

## Architecture

- **MCP Protocol**: Uses stdio transport for communication with MCP clients
- **Type Safety**: Full TypeScript support with Zod validation
- **Auto-generated SDK**: Types and client generated from OpenAPI specification
- **26 Tools**: Complete coverage of LightRAG API functionality

## License

MIT © [Mikhail Lysikov](https://github.com/d8corp)

## Links

- [LightRAG](https://github.com/HKUDS/LightRAG) - The RAG system this server integrates with
- [Model Context Protocol](https://modelcontextprotocol.io/) - MCP specification
- [Issues](https://github.com/d8corp/lightrag-mcp/issues) - Report bugs or request features
