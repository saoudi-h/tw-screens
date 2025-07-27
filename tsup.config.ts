import { defineConfig } from 'tsup'
import pkg from './package.json'

export default defineConfig(({ watch }) => ({
    entry: ['src/index.ts'],
    treeshake: true,
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: !!watch,
    clean: true,
    splitting: true,
    target: 'esnext',
    external: Object.keys(pkg.peerDependencies),
    minify: !watch,
    jsx: 'transform',
}))
