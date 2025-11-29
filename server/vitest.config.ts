import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./test/setup.ts"],

    coverage: {
      provider: "v8",
      reportsDirectory: "./coverage",

      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/build/**",
        "**/*.config.*",
        "src/**/*.{test,spec}.{ts,js}",
        "test/**",
        "src/index.ts",
        "src/app.ts",
        "src/cors_config.ts",
        "src/db/**",
        "src/db/migrations/**",
        "src/db/seeds/**",
        "src/clients/**",
        "src/config/**",
        "src/validators/**",
        "src/middleware/validate.ts",
        "src/types/**",
        "src/utils/",
        "src/queries/",
        "src/routes/",
      ],
    },
  },
});
