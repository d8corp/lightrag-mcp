#!/usr/bin/env node
import { program } from 'commander'

import { updateDotenv } from '../updateDotenv'

import type { LightRagServerParams } from '..'
import { LightRagServer } from '..'

updateDotenv()

program
  .version(process.env.__MCP__PACKAGE_VERSION!, '-v, --version')

program
  .description('Start LightRAG MCP server via stdio transport for integration with MCP clients (Claude Desktop, etc.)')
  .option('-t, --token <token>', 'API key for LightRAG authentication (overrides LIGHTRAG_API_KEY env variable)')
  .option('-u, --url <url>', 'LightRAG server URL (overrides LIGHTRAG_BASE_URL env variable)')
  .action(async ({ token, url }) => {
    const options: LightRagServerParams = url
      ? { apiKey: token, clientOptions: { baseUrl: url } }
      : { apiKey: token }

    const server = new LightRagServer(options)
    await server.start()
  })

program
  .parse(process.argv)
