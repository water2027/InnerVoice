import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  formatters: true,
  unocss: true,
  vue: true,
  rules: {
    'no-console': 'off',
  },
  ignores: [
    '**/*.md',
    '.vitepress/cache/**',
    '.vitepress/dist/**',
    'node_modules/**',
    'public/**',
    '*.tsx',
  ],
})
