import { config } from 'dotenv'
import { expand } from 'dotenv-expand'

export function updateDotenv () {
  const { __MCP__PACKAGE_VERSION: before } = process.env
  delete process.env.__MCP__PACKAGE_VERSION

  expand(config({ quiet: true }))

  if (!process.env.__MCP__PACKAGE_VERSION) {
    process.env.__MCP__PACKAGE_VERSION = before
  }
}
