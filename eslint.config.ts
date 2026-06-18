import type { Linter } from 'eslint'
import antfu from '@antfu/eslint-config'

const config = antfu(
  {
    markdown: false,
    formatters: {
      css: true,
    },
    e18e: false,
    pnpm: true,
    rules: {
      'style/multiline-ternary': 0,
      'jsdoc/empty-tags': 0,
      'node/prefer-global/process': 0,
      'no-console': 0,
      'no-cond-assign': 0,
      'no-alert': 0,
      'unused-imports/no-unused-vars': 0,
      'no-unused-expressions': 0,
      'no-sequences': 0,
      'style/max-statements-per-line': 0,
      'array-callback-return': 0,
      'regexp/no-unused-capturing-group': 0,
      'no-template-curly-in-string': 0,
      '@typescript-eslint/no-empty-object-type': 0,
      'vue/no-template-shadow': 0,
      'vue/one-component-per-file': 0,
      'perfectionist/sort-exports': 0,
      'style/quote-props': 0,
      '@typescript-eslint/no-non-null-asserted-optional-chain': 0,
      'test/prefer-lowercase-title': 0,
      'pnpm/yaml-enforce-settings': 0,
    },
  },
  {
    ignores: [
      'docs/icons/src/icons',
      'docs/src/assets/antd.css',
      'node_modules/',
      '**/dist/**',
      '**/*.spec.*',
      '*.html',
      '*.yaml',
    ],
  },
  {
    files: [
      'docs/**/*',
      'tests/**/*',
      'docs/**/tests/**/*',
      'playground',
    ],
    rules: {
      'no-console': 0,
      'no-restricted-globals': 0,
      'no-irregular-whitespace': 0,
    },
  },
) as Linter.Config

export default config
