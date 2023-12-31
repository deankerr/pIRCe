/** @type {import('prettier').Config} */
const config = {
  semi: false,
  printWidth: 100,
  singleQuote: true,
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '<TYPES>',
    '<TYPES>^[.]',
    '<BUILTIN_MODULES>',
    'react',
    '<THIRD_PARTY_MODULES>',
    '^[.]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
}

export default config
