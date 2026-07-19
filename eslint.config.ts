import type { Config } from '@tala-tools/eslint'
import { base } from '@tala-tools/eslint'
import { defineConfig } from 'eslint/config'

const config: Config[] = defineConfig([
    ...base,
    {
        ignores: [
            'eslint.config.ts',
            'prettier.config.mjs',
            'tsdown.config.ts',
            'dist',
            'coverage',
        ],
    },
])

export default config
