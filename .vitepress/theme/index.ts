// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import { useRoute } from 'vitepress';
import { registerSW } from 'virtual:pwa-register';

import BlogComment from './components/BlogComment.vue';
import Avatar from './components/Avatar.vue';
import PostInfo from './components/PostInfo.vue';

import './style.css'
import './custom.css';
import 'virtual:uno.css'

export default {
  extends: DefaultTheme,
	Layout() {
		const route = useRoute();
		const notShowComment =
			route.path === '/' ||
			route.path === '/archive' ||
			route.path === '/about' || route.path.startsWith('/tags');
		const notShowAside = route.path.includes('/notes/');
		const shouldShowInfo = route.path.includes('/posts/');
		return h(DefaultTheme.Layout, null, {
			'doc-before': () => (shouldShowInfo ? h(PostInfo) : null),
			'aside-top': () => (notShowAside ? null : h(Avatar)),
			'doc-after': () => (notShowComment ? null : h(BlogComment)),
		});
	},
	enhanceApp({ app, router }) {
		if (typeof window !== 'undefined') {
			// 只有生产环境才注册 Service Worker
			registerSW();
		}
	},
} satisfies Theme
