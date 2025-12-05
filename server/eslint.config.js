import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["dist", "**/dist/**", "node_modules", "coverage", "build"],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2020,
      sourceType: "module",

      globals: {
        console: "readonly",
        process: "readonly",
        module: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        exports: "readonly",
        require: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  },

  {
    files: ["**/*.js", "scripts/**/*.{js,ts}", "src/db/seeds/**/*.{js,ts}"],
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
        module: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        exports: "readonly",
        require: "readonly",
      },
    },
  },

  {
    files: [
      "**/*.test.ts",
      "**/*.test.js",
      "**/tests/**/*.ts",
      "**/tests/**/*.js",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
