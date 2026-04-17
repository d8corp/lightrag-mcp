import { McpServer, StdioServerTransport } from '@modelcontextprotocol/server';
import type { CallToolResult } from '@modelcontextprotocol/server';
import * as z from 'zod/v4';

const server = new McpServer({
  name: 'lightrag-mcp',
  version: '1.0.0'
});

server.registerTool(
  'insert_text',
  {
    title: 'Insert Text',
    description: 'Insert text content into LightRAG with custom filename',
    inputSchema: z.object({
      text: z.string().describe('Text content to insert'),
      title: z.string().optional().describe('Optional title (used as filename)')
    })
  },
  async ({ text, title }): Promise<CallToolResult> => {
    const filename = title ? `${title}.txt` : 'text_input.txt';

    try {
      const response = await fetch('http://localhost:9621/documents/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          file_source: filename
        })
      });

      if (!response.ok) {
        return {
          content: [{
            type: 'text',
            text: `HTTP ${response.status}: ${response.statusText}`
          }],
          isError: true
        };
      }

      const result = await response.json();

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: `Failed: ${error instanceof Error ? error.message : String(error)}`
        }],
        isError: true
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  process.on('SIGINT', async () => {
    await server.close();
    process.exit(0);
  });
}

main().catch(console.error);
