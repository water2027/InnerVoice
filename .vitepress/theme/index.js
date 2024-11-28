import { h } from 'vue';
import Theme from 'vitepress/theme-without-fonts'; // https://vitepress.dev/zh/guide/extending-default-theme#using-different-fonts

import { useRoute } from 'vitepress';
import { registerSW } from 'virtual:pwa-register';

import BlogComment from './components/BlogComment.vue';
import Avatar from './components/Avatar.vue';
import PostInfo from './components/PostInfo.vue';

import './style.css';
import './custom.css';

export default {
	...Theme,
	Layout() {
		const route = useRoute();
		const notShowComment =
			route.path === '/' ||
			route.path === '/archive' ||
			route.path === '/about';
		const notShowAside = route.path.includes('/notes/');
		const shouldShowInfo = route.path.includes('/posts/');
		return h(Theme.Layout, null, {
			// https://vitepress.dev/guide/extending-default-theme#layout-slots
			'doc-top': () => (shouldShowInfo ? h(PostInfo) : null),
			'aside-top': () => (notShowAside ? null : h(Avatar)),
			'doc-after': () => (notShowComment ? null : h(BlogComment)),
		});
	},

	enhanceApp({ app, router }) {
		app.component('BlogComment', BlogComment);
		if (typeof window !== 'undefined') {
			// 只有生产环境才注册 Service Worker
			registerSW();
		}
	},
};
