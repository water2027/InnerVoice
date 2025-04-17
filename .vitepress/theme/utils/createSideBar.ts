import fs from 'fs';
import path from 'path';

/**
 * Sidebar item interface for VitePress sidebar configuration
 */
interface SidebarItem {
	text: string;
	link?: string;
	items?: SidebarItem[];
	collapsed?: boolean;
}

/**
 * VitePress sidebar type definition
 */
type Sidebar = SidebarItem[] | { [path: string]: SidebarItem[] };

/**
 * Creates a sidebar configuration for VitePress by reading markdown files
 * in the specified directory
 * @param notesDir Path to the notes directory relative to project root
 * @param baseUrl Base URL prefix for sidebar links (default: '/notes/')
 * @returns Sidebar configuration object for VitePress
 */
export function createSidebar(
	notesDir: string = 'notes',
	baseUrl: string = '/notes/'
): SidebarItem[] {
	const rootDir = path.resolve(process.cwd(), notesDir);

	// Check if directory exists
	if (!fs.existsSync(rootDir) || !fs.statSync(rootDir).isDirectory()) {
		throw new Error(`Directory not found: ${rootDir}`);
	}

	// Generate sidebar from directory structure
	return processDirectory(rootDir, baseUrl);
}

/**
 * Process a directory to create sidebar items
 * @param dirPath Path to process
 * @param baseUrl Base URL for links
 * @param relativePath Relative path from notes root
 * @returns Array of sidebar items
 */
function processDirectory(
	dirPath: string,
	baseUrl: string,
	relativePath: string = ''
): SidebarItem[] {
	const items: SidebarItem[] = [];
	const entries = fs.readdirSync(dirPath);

	// Process all files first (to maintain desired order)
	const files = entries
		.filter((entry) => {
			const fullPath = path.join(dirPath, entry);
			return (
				fs.statSync(fullPath).isFile() &&
				entry.endsWith('.md') &&
				entry !== 'index.md'
			);
		})
		.sort();

	for (const file of files) {
		const fullPath = path.join(dirPath, file);
		const fileRelativePath = path.join(relativePath, file);
		const linkPath = baseUrl + fileRelativePath.replace(/\.md$/, '').replace(/\\/g, '/');

		// Get title from file content or use filename
		const content = fs.readFileSync(fullPath, 'utf-8');
		const titleMatch = content.match(/^#\s+(.+)$/m);
		const text = titleMatch
			? titleMatch[1].trim()
			: file.replace(/\.md$/, '').replace(/-/g, ' ');

		items.push({
			text,
			link: linkPath,
		});
	}

	// Then process directories
	const directories = entries
		.filter((entry) => {
			const fullPath = path.join(dirPath, entry);
			return fs.statSync(fullPath).isDirectory();
		})
		.sort();

	for (const dir of directories) {
		const fullPath = path.join(dirPath, dir);
		const dirRelativePath = path.join(relativePath, dir);

		const childItems = processDirectory(fullPath, baseUrl, dirRelativePath);

		if (childItems.length > 0) {
			items.push({
				text: dir.replace(/-/g, ' '),
				collapsed: true,
				items: childItems,
			});
		}
	}

	return items;
}
