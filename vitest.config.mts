import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.mts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
    exclude: ["node_modules", "dist", "tests", "vitest.config.mts"],
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
