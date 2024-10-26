import { defineConfig } from "tsup";

export default defineConfig(({ watch }) => ({
  entry: ["src/index.ts"],
  treeshake: true,
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: true,
  target: "esnext",
  external: ["react"],
  minify: !watch,
  jsx: "transform",
}));
