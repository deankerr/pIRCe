// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  // Standard prettier options
  semi: false,
  singleQuote: true,
  printWidth: 100,
  // Since prettier 3.0, manually specifying plugins is required
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  // This plugin's options
  importOrder: ['^@core/(.*)$', '', '^@server/(.*)$', '', '^@ui/(.*)$', '', '^[./]'],
  importOrderParserPlugins: ['typescript'],
  importOrderTypeScriptVersion: '5.0.0',
}
