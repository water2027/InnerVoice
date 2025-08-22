import {
  defineConfig,
  presetAttributify,
  presetUno,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
  ],
  theme: {
    colors: {
      'default-font': 'var(--default-font-color)',
      'default-hover': 'var(--default-font-hover)'
    }
  }
})
