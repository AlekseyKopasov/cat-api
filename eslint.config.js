import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import typescriptEsLintPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'

const browserGlobals = globals.browser
Object.assign(browserGlobals, globals.jest)

export default [
  {
    files: ['**/*.{ts,tsx}'], // Применять правила ко всем TSX/TSC файлам
    languageOptions: {
      parser: typescriptParser,
      sourceType: 'module',
      ecmaVersion: 2020,
      globals: browserGlobals, // Глобальные переменные браузера + Jest
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': typescriptEsLintPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptEsLintPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
