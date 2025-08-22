import type { Theme } from 'vitepress'
import DefaultTheme from './Layout.vue'

import '@fontsource/maple-mono/400.css' // Regular
import '@fontsource/maple-mono/700.css' // Bold

import './style.css'
import './custom.scss'
import 'virtual:uno.css'

export default {
  // extends: DefaultTheme,
  Layout: DefaultTheme,
} satisfies Theme
