import { writeFileSync } from 'fs';
import { Feed } from 'feed';
import path from 'path';
import { createContentLoader } from 'vitepress';

import { themeConfig } from '../../themeConfig.mts'

const hostname = themeConfig.hostname;
const createRssFileZH = async (config) => {
	if(!hostname) {
		return
	}
	const feed = new Feed({
		title: themeConfig.name||'InnerVoice',
		description:
			themeConfig.description ||'记录我的内心独白',
		id: hostname,
		link: hostname,
		language: 'zh-Hans',
		image: `${hostname}/icon-512x512.webp`,
		favicon: `${hostname}/favicon.ico`,
		copyright: `Copyright (c) 2024-present, ${themeConfig.author?.name || 'InnerVoice'}`,
	});

	const posts = await createContentLoader('posts/**/*.md', {
		render: true,
	}).load();

	posts.sort((a, b) =>
		Number(+new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
	);

	for (const { url, html, frontmatter } of posts) {
		// 仅保留最近 5 篇文章
		if (feed.items.length >= 5) {
			break;
		}

		feed.addItem({
			title: frontmatter.title,
			id: `${hostname}${url}`,
			link: `${hostname}${url}`,
			description: frontmatter.desc,
			content: html,
			author: [
				{
					...themeConfig.author,
					link: hostname,
				},
			],
			date: frontmatter.date,
		});
	}

	writeFileSync(path.join(config.outDir, 'feed.xml'), feed.rss2(), 'utf-8');
};

export { createRssFileZH };