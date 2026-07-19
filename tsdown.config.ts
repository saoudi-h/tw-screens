import type { UserConfig } from 'tsdown/config'
import { defineConfig } from 'tsdown/config'

const config: UserConfig = defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    treeshake: true,
    minify: true,
    target: 'esnext',
    sourcemap: false,
    deps: {
        neverBundle: ['react', 'tailwindcss']
    },
    onSuccess() {
        console.info(`✨ tw-screens build succeeded!`)
    },
})

export default config
