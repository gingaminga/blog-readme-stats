import { FlatCompat } from "@eslint/eslintrc";
import jseslint from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import unicorn from "eslint-plugin-unicorn";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: jseslint.configs.recommended });

export default [
  jseslint.configs.recommended,

  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },

  {
    ...unicorn.configs.recommended,
    rules: {
      ...unicorn.configs.recommended.rules,
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            kebabCase: true,
          },
        },
      ],
      "unicorn/no-anonymous-default-export": ["off"],
      "unicorn/no-null": ["off"],
      "unicorn/prevent-abbreviations": ["off"],
    },
  },

  {
    ...perfectionist.configs["recommended-alphabetical"],
    rules: {
      ...perfectionist.configs["recommended-alphabetical"].rules,
      "perfectionist/sort-imports": [
        "error",
        { newlinesBetween: "ignore", newlinesInside: "ignore", partitionByNewLine: true },
      ],
      "perfectionist/sort-union-types": [
        "error",
        {
          groups: ["named", "keyword", "nullish"],
        },
      ],
    },
  },

  ...compat.extends("prettier"),
];
