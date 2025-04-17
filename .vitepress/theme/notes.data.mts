import { createContentLoader } from 'vitepress';

export interface Note {
	title: string;
	url: string;
	id: number;
}

export default createContentLoader('notes/**/*.md', {
	transform(raw) {
		if (!raw) return [];
		const result: Note[] = [];
		for (const { url, frontmatter } of raw) {
			if(!url) continue
			if(frontmatter.hide) continue
			const slice = url.split('/').slice(1, -1);
			if (slice.length <= 1) {
				continue
			}
			result.push({
				title: frontmatter.title,
				url,
				id: frontmatter.id || 0,
			});
		}
		return result
	},
});

declare const data: Note[];
export { data };
