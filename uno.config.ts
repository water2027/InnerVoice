import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        tabler: () => import('@iconify-json/tabler/icons.json', {
          with: { type: 'json' },
        }).then(i => i.icons as any),
      },
    }),
  ],
  theme: {
    colors: {
      'default-font': 'var(--default-font-color)',
      'default-hover': 'var(--default-font-hover)',
    },
  },
})
