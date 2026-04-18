import { config } from 'dotenv'
import { expand } from 'dotenv-expand'

export function updateDotenv () {
  const { __MCP__PACKAGE_VERSION: before } = process.env
  delete process.env.__MCP__PACKAGE_VERSION

  expand(config())

  if (!('__MCP__PACKAGE_VERSION' in process.env)) {
    process.env.__MCP__PACKAGE_VERSION = before
  }
}
