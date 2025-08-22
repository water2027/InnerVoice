import { defineConfigWithTheme } from 'vitepress';

import { type ThemeConfig, themeConfig } from './themeConfig.mts';

import { createSidebar } from './theme/utils/createSideBar';
import { createRssFileZH } from './theme/utils/rss';
import UnoCSS from 'unocss/vite';

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ThemeConfig>({
	title: themeConfig.name || 'InnerVoice',
	description: themeConfig.description || '记录我的内心独白',
	head: [
		[
			'link',
			{
				rel: 'icon',
				href: '/favicon.ico',
			},
		],
		[
			'link',
			{
				rel: 'apple-touch-icon',
				href: '/apple-touch-icon.png',
			},
		],
	],
	lastUpdated: true,
	cleanUrls: true,
	ignoreDeadLinks: true,
	transformHead({ assets }) {
		const fontFile = assets
			.map((asset) => {
				if (asset.endsWith('.woff2') || asset.endsWith('.woff')) {
					return asset;
				}
				return '';
			})
			.filter((asset) => asset !== '');
		return fontFile.map((file) => [
			'link',
			{
				rel: 'preload',
				href: file,
				as: 'font',
				type: file.endsWith('.woff2') ? 'font/woff2' : 'font/woff',
				crossorigin: '',
			},
		]);
	},
	buildEnd: (config) => {
		createRssFileZH(config);
	},
	themeConfig: {
		...themeConfig,
		search: {
			provider: 'local',
		},
		nav: [
			{ text: '博客', link: '/' },
			{ text: '归档', link: '/archive', activeMatch: '/archive' },
			{ text: '分类', link: '/tags/', activeMatch: '/tags' },
			{ text: '笔记', link: '/notes/', activeMatch: '/notes/' },
			{ text: '关于', link: '/about', activeMatch: '/about' },
			{ text: '友链', link: '/friends', activeMatch: '/friends' },
		],
		docFooter: {
			prev: '上一篇',
			next: '下一篇',
		},
		sidebar: {
			'/notes/': (function () {
				const sidebar = createSidebar();
				if (sidebar.length > 0) {
					sidebar[0].collapsed = false;
				}
				return sidebar;
			})(),
		},
		lastUpdated: {
			text: '最近更新时间',
		},
		outline: {
			label: '当前页面',
			level: [2, 5],
		},
		returnToTopLabel: '回到顶部',
		sidebarMenuLabel: '目录',
		darkModeSwitchLabel: '深色模式',
		externalLinkIcon: true,
	},
	sitemap: {
		hostname: themeConfig.hostname || 'https://your-domain.com',
		lastmodDateOnly: true,
	},
	markdown: {
		math: true,
		image: {
			lazyLoading: true,
		},
		toc: {
			level: [2, 3, 4, 5],
		},
	},
	vite: {
		plugins: [UnoCSS()],
	},
});
