import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigESLint from "eslint-config-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...eslintConfigESLint.configs.recommended
];