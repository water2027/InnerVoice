import { createContentLoader } from 'vitepress';

export interface Post {
	title: string;
	url: string;
	excerpt?: string;
	date: {
		time: number;
		string: string;
		year: string;
		monthDay: string;
	};
	tags: string[];
	id: number;
	wordCount: number;
	readingTime: number;
}

export interface Data {
	posts: Post[];
	totalNum: number;
	totalWordCount: number;
	tags: Array<string>;
}

export default createContentLoader('posts/**/*.md', {
	render: true,
	excerpt: (file) => {
		if(!file.content) {
			file.excerpt = ''
			return
		}
		const regex = /<!--desc\s*([\s\S]*?)\s*-->/;
		const match = file.content.match(regex);
		if (match && match[1]) {
			file.excerpt = match[1];
		} else {
			file.excerpt = '';
		}
	},
	transform(raw) {
		const posts = new Array<Post>();
		const tagsSet = new Set<string>()
		for (const file of raw) {
			const { url, frontmatter, html, excerpt } = file;
			if (frontmatter.hide) continue;
			const post: Post = {
				title: frontmatter.title,
				url,
				excerpt,
				date: formatDate('2023-01-01'),
				tags: frontmatter.tags,
				id: frontmatter.id || 0,
				wordCount: 0,
				readingTime: 0,
			};
			const paths = url.split('/').filter(Boolean);
			paths.pop();
			paths.shift();
			for (let i = 0; i < 3; ++i) {
				if (paths[i].length < 2) {
					paths[i] = '0' + paths[i];
				}
			}
			const time = paths.join('-');
			if (!html) {
				continue;
			}
			const content = html
				?.replace(/<pre.*?>.*?<\/pre>/gs, '') // 移除代码块
				.replace(/<[^>]+>/g, '') // 移除HTML标签
				.trim();
			const cnWords = (content?.match(/[\u4e00-\u9fa5]/g) || []).length;
			const enWords = content
				?.split(/\s+/)
				.filter((word) => word.length > 0).length;
			const codeWords = (html?.match(/<pre.*?>(.*?)<\/pre>/gs) || [])
				.map((code: string) => code.replace(/<[^>]+>/g, '').trim())
				.join(' ')
				.split(/\s+/)
				.filter((word) => word.length > 0).length;
			const readingTime = Math.ceil(
				(cnWords * 1.5 + (enWords || 0) * 2.5) / 400
			);
			post.wordCount = cnWords + (enWords || 0) + codeWords;
			post.readingTime = readingTime < 1 ? 1 : readingTime;
			post.date = formatDate(time);
			posts.push(post);
			if (post.tags) {
				post.tags.forEach((tag: string) => {
					tagsSet.add(tag);
				});
			}
		}
		posts.sort((a, b) => {
			if (b.date.time == a.date.time) {
				return b.id - a.id;
			}
			return b.date.time - a.date.time;
		});
		const tags = Array.from(tagsSet)
		return {
			posts: posts,
			totalNum: posts.length,
			totalWordCount: posts.reduce(
				(acc, post) => acc + post.wordCount,
				0
			),
			tags
		};
	},
});

declare const data: Data;
export { data };

function formatDate(raw: string) {
	const date = new Date(raw);
	date.setUTCHours(12);
	return {
		time: +date,
		string: date.toLocaleDateString('zh-Hans', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		}),
		year: date.toLocaleDateString('zh-Hans', {
			year: 'numeric',
		}),
		monthDay: date.toLocaleDateString('zh-Hans', {
			month: '2-digit',
			day: '2-digit',
		}),
	};
}
