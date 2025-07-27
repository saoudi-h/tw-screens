import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./vitest.setup.mts'],
        coverage: {
            enabled: true,
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'examples',
                '__tests__',
                'tests',
                'node_modules',
                '**/index.ts',
                'src/utils/types.ts',
            ],
            include: ['src/**/*.ts', 'src/**/*.tsx'],
        },
        exclude: ['node_modules', 'dist', 'vitest.config.mts', 'examples'],
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
})
