import js from "@eslint/js"
import pluginNext from "@next/eslint-plugin-next"
import eslintConfigPrettier from "eslint-config-prettier"
import pluginReact from "eslint-plugin-react"
import pluginReactHooks from "eslint-plugin-react-hooks"
import globals from "globals"
import tseslint from "typescript-eslint"

/**
 * Standalone port of `@solarlayout/eslint-config/next-js`. The monorepo
 * package pulls in two bespoke rules (design-vocabulary, a11y-icon-button)
 * that police the shared design-system component API — this repo has no
 * design-system dependency, so they are intentionally absent.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      ".source/**",
      "out/**",
      "test-results/**",
      "playwright-report/**",
      "next-env.d.ts",
    ],
  },
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    plugins: { "@next/next": pluginNext },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
  {
    plugins: { "react-hooks": pluginReactHooks },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // Not needed with the modern JSX transform.
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  {
    files: ["scripts/**/*.mjs", "*.config.mjs", "*.config.js"],
    languageOptions: { globals: { ...globals.node } },
  },
]
