import { DefaultTheme } from 'vitepress';

import type { Repo, Mapping } from '@giscus/vue';
export interface Friend {
	name: string;
	link: string;
	description: string;
	avatar: string;
}

export interface GiscusConfig {
	repo: Repo;
	repoId: string;
	category: string;
	categoryId: string;
	mapping: Mapping;
}

export interface ThemeConfig extends DefaultTheme.Config {
	name?: string;
	description?: string;
	hostname?: string;
	friends?: {
		[key: string]: Friend[];
	};
	author?: {
		name: string;
		email: string;
	};
	giscus?: GiscusConfig;
}

export const themeConfig: ThemeConfig = {
	name: 'InnerVoice',
	description: 'InnerVoice - 记录我的内心独白',
	hostname: 'https://www.example.com',
	giscus: {
		repo: 'water2027/InnerVoice',
		repoId: 'repoId',
		category: 'Announcements',
		categoryId: 'categoryId',
		mapping: 'pathname',
	},
	author:{
		name: '',
		email: ''
	},
	friends: {

	},
};
