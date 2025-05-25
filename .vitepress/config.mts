import { defineConfigWithTheme } from 'vitepress';
import { withPwa } from '@vite-pwa/vitepress';

import { type ThemeConfig, themeConfig } from './themeConfig.mts';

import { createSidebar } from './theme/utils/createSideBar';
import { createRssFileZH } from './theme/utils/rss';
import UnoCSS from 'unocss/vite';

// https://vitepress.dev/reference/site-config
export default withPwa<ThemeConfig>(
	defineConfigWithTheme<ThemeConfig>({
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
			socialLinks: [],
		},
		markdown: {
			math: true,
			image: {
				lazyLoading: true,
			},
		},
		pwa: {
			outDir: '.vitepress/dist',
			registerType: 'autoUpdate',
			includeManifestIcons: false,
			manifest: {
				name: themeConfig.name || 'InnerVoice',
				short_name: 'blog',
				description: themeConfig.description || '记录我的内心独白',
				theme_color: '#000000',
				background_color: '#000000',
				display_override: [
					'fullscreen',
					'minimal-ui',
					'standalone',
					'window-controls-overlay',
				],
				display: 'fullscreen',
				screenshots: [
					{
						src: 'desktop-wide-screenshot.webp',
						sizes: '2559x1528',
						type: 'image/webp',
						form_factor: 'wide',
					},
					{
						src: 'mobile-screenshot.webp',
						sizes: '591x1221',
						type: 'image/webp',
					},
				],
				start_url: '/',
				icons: [
					{
						src: 'icon-192x192.webp',
						sizes: '192x192',
						type: 'image/webp',
					},
					{
						src: 'icon-512x512.webp',
						sizes: '512x512',
						type: 'image/webp',
					},
				],
			},
			injectManifest: {
				injectionPoint: undefined,
			},
			devOptions: {
				enabled: false,
				type: 'module',
			},
		},
		vite: {
			plugins: [UnoCSS()],
		},
	})
);
