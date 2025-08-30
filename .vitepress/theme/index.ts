import type { Theme } from 'vitepress'
import DefaultTheme from './Layout.vue'
import MyLayout from './MyLayout.vue'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import '@fontsource/maple-mono/400.css' // Regular
import '@fontsource/maple-mono/700.css' // Bold

import './style.css'
import './custom.scss'

export default {
  // extends: DefaultTheme,
  Layout: MyLayout,
  // Layout: DefaultTheme,
} satisfies Theme
