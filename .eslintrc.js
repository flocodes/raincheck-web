module.exports = {
  env: {
    node: true
  },
  extends: [
    'standard',
    'standard-react'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    // 'camelcase': 'off',
    'comma-dangle': 'off',
    'max-len': ['warn', {'code': 150}],
    'no-multiple-empty-lines': ['warn', {'max': 2}],
    'no-trailing-spaces': ['warn', {'ignoreComments': true}],
    // Replace default eslint rule with typescript-specific one
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
  ignorePatterns: ['serviceWorker.ts', '*.test.*']
}
