import { defineConfig } from 'vitepress';
import { withPwa } from '@vite-pwa/vitepress';

import { createRssFileZH } from './theme/utils/rss';
import { createSideBar } from './theme/utils/createSideBar';

// https://vitepress.dev/reference/site-config
export default withPwa(
	defineConfig({
		title: "water's blog",
		description: 'blog',
		lastUpdated: true,
		cleanUrls: true,
		ignoreDeadLinks: true,
		buildEnd: (config) => {
			createRssFileZH(config);
		},
		themeConfig: {
			search: {
				provider: 'local',
			},
			appearance: true,
			nav: [
				{ text: '博客', link: '/' },
				{ text: '归档', link: '/archive', activeMatch: '/archive' },
				{ text: '笔记', link: '/notes/', activeMatch: '/notes/' },
				{ text: '关于', link: '/about', activeMatch: '/about' },
				{ text: '友链', link: '/friends', activeMatch: '/friends' },
			],
			docFooter: {
				prev: '上一篇',
				next: '下一篇',
			},
			outlineTitle: '当前页面',
			lastUpdatedText: '最近更新时间',
			returnToTopLabel: '回到顶部',
			sidebarMenuLabel: '目录',
			darkModeSwitchLabel: '深色模式',
			sidebar: createSideBar(),
			outline: [2, 5],
			externalLinkIcon: true,
			socialLinks: [
				{
					icon: {
						svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/><script xmlns=""/></svg>',
					},
					link: 'https://github.com/water2027',
				},
				{
					icon: {
						svg: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>RSS</title><path d="M108.56,342.78a60.34,60.34,0,1,0,60.56,60.44A60.63,60.63,0,0,0,108.56,342.78Z"/><path d="M48,186.67v86.55c52,0,101.94,15.39,138.67,52.11s52,86.56,52,138.67h86.66C325.33,312.44,199.67,186.67,48,186.67Z"/><path d="M48,48v86.56c185.25,0,329.22,144.08,329.22,329.44H464C464,234.66,277.67,48,48,48Z"/></svg>',
					},
					link: '/feed.xml',
				},
			],
		},
		sitemap: {
			hostname: 'https://www.w4ter.com/',
			lastmodDateOnly: true,
		},
		theme: {
			custom: true,
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
				name: `water's blog`,
				short_name: 'blog',
				description: '日志',
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
			workbox: {
				// 定制缓存策略
				runtimeCaching: [
					{
						urlPattern:/app.+\.js$/,
						handler:'StaleWhileRevalidate',
						options: {
							cacheName: 'appJs',
							expiration: {
								maxEntries: 100, // 最多缓存100篇文章
								maxAgeSeconds: 7 * 24 * 60 * 60, // 缓存一周
							},
						},
					},
					{
						// 匹配文章相关的js文件
						urlPattern: /posts.+\.js$/,
						handler: 'StaleWhileRevalidate',
						options: {
							cacheName: 'article-content',
							expiration: {
								maxEntries: 100, // 最多缓存100篇文章
								maxAgeSeconds: 7 * 24 * 60 * 60, // 缓存一周
							},
						},
					},
					{
						urlPattern: /friends\.md.+\.js$/,
						handler: 'StaleWhileRevalidate',
						options: {
							cacheName: 'friends-content',
							expiration: {
								maxEntries: 1,
								maxAgeSeconds: 7 * 24 * 60 * 60,
							},
						},
					},
					{
						urlPattern: /notes.+\.js$/,
						handler: 'StaleWhileRevalidate',
						options: {
							cacheName: 'article-content',
							expiration: {
								maxEntries: 100,
								maxAgeSeconds: 7 * 24 * 60 * 60,
							},
						},
					},
					{
						// 其他静态资源
						urlPattern: '/',
						handler: 'CacheFirst',
						options: {
							cacheName: 'index-resources',
							expiration: {
								maxEntries: 60,
								maxAgeSeconds: 30 * 24 * 60 * 60, // 缓存一个月
							},
						},
					},
					{
						urlPattern: ({ request }) =>
							request.mode === 'navigate',
						handler: 'StaleWhileRevalidate',
						options: {
							cacheName: 'offline-pages',
							plugins: [
								{
									handlerDidError: async () => {
										// 当网络请求失败时返回离线页面
										return caches.match('/offline.html');
									},
								},
							],
						},
					},
					{
						// 其他静态资源
						urlPattern: /\.(css|js)$/,
						handler: 'CacheFirst',
						options: {
							cacheName: 'static-resources',
							expiration: {
								maxEntries: 60,
								maxAgeSeconds: 30 * 24 * 60 * 60, // 缓存一个月
							},
						},
					},
					{
						// 图片资源
						urlPattern: /\.(png|jpg|jpeg|webp|svg|gif|ico)$/,
						handler: 'CacheFirst',
						options: {
							cacheName: 'images',
							expiration: {
								maxEntries: 60,
								maxAgeSeconds: 30 * 24 * 60 * 60,
							},
						},
					},
				],
				// 预缓存重要资源
				globPatterns: [
					'/',
					'**/*.{css,ico,webp}',
					'index.html',
					'offline.html',
				],
				skipWaiting: true,
				clientsClaim: true,
			},
			devOptions: {
				enabled: false,
				type: 'module',
			},
		},
	})
);
