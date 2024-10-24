import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reportsDirectory: "./coverage", 
      all: true, 
      exclude: ["node_modules", "dist", "tests", "vitest.config.ts"],
    },
  },
  resolve: {
    alias: {
      "@": "/src", 
    },
  },
});
