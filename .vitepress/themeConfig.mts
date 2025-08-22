import type { Mapping, Repo } from '@giscus/vue'

import type { DefaultTheme } from 'vitepress'

export interface Friend {
  name: string
  link: string
  description: string
  avatar: string
}

export interface GiscusConfig {
  repo: Repo
  repoId: string
  category: string
  categoryId: string
  mapping: Mapping
}

export interface ThemeConfig extends DefaultTheme.Config {
  name?: string
  description?: string
  hostname?: string
  friends?: {
    [key: string]: Friend[]
  }
  author?: {
    name: string
    email: string
  }
  giscus?: GiscusConfig
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
  author: {
    name: '',
    email: '',
  },
  friends: {
    友情链接: [
      {
        name: 'Water',
        link: 'https://www.w4ter.com',
        description: '上善若水',
        avatar: 'https://www.w4ter.com/icon-512x512.webp',
      },
    ],
  },
  nav: [
    { text: '博客', link: '/' },
    { text: '归档', link: '/archive', activeMatch: '/archive' },
    { text: '分类', link: '/tags/', activeMatch: '/tags' },
    { text: '笔记', link: '/notes/', activeMatch: '/notes/' },
    { text: '关于', link: '/about', activeMatch: '/about' },
    { text: '友链', link: '/friends', activeMatch: '/friends' },
  ],
}
