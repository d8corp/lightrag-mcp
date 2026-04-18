import { defineConfig, type UserConfig } from '@hey-api/openapi-ts'

const config: UserConfig = {
  input: 'http://localhost:9621/openapi.json',
  output: './src/gen',
  plugins: [
    '@hey-api/typescript',
    {
      name: '@hey-api/client-fetch',
      baseUrl: '/',
    },
    '@hey-api/transformers',
    {
      name: 'zod',
    },
    {
      name: '@hey-api/sdk',
      validator: 'zod',
    },
  ],
}

export default defineConfig(config)
