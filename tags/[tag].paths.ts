import fs from 'fs';
import matter from 'gray-matter';
interface Path {
	params: {
		tag: string;
	};
}
export default {
	paths() {
		const paths: Path[] = [];
		const tags = new Set<string>();
		fs.globSync('posts/**/*.md').forEach((file) => {
			const content = fs.readFileSync(file, 'utf-8');
			const { data } = matter(content);
			if (data.tags && Array.isArray(data.tags)) {
				data.tags.forEach((tag: string) => {
					tags.add(tag);
				});
			}
		});
		for (const tag of tags) {
			paths.push({ params: { tag } });
		}
		return paths;
	},
};
