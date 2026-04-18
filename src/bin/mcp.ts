#!/usr/bin/env node
import { program } from 'commander'

import { updateDotenv } from '../updateDotenv'

import { LightRagServer } from '..'

updateDotenv()

program
  .version(process.env.__MCP__PACKAGE_VERSION!, '-v, --version')

program
  .description('Start LightRAG MCP server via stdio transport for integration with MCP clients (Claude Desktop, etc.)')
  .action(async () => {
    const server = new LightRagServer()
    await server.start()
  })

program
  .parse(process.argv)
