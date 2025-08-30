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
  name: string
  description: string
  hostname: string
  friends?: {
    [key: string]: Friend[]
  }
  author?: {
    name: string
    email: string
  }
  giscus?: GiscusConfig
  /**
   * 页面顶部的导航栏
   */
  headerLinks?: Array<{
    text: string
    link: string
    activeMatch?: string
  }>
  footerLinks?: Array<
    {
      text: string
      link: string
    }
    | {
      icon: string
      link: string
      title?: string
    }
  >
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
  headerLinks: [
    { text: '博客', link: '/' },
    { text: '归档', link: '/archive', activeMatch: '/archive' },
    { text: '分类', link: '/tags/', activeMatch: '/tags' },
    { text: '笔记', link: '/notes/', activeMatch: '/notes/' },
    { text: '关于', link: '/about', activeMatch: '/about' },
    { text: '友链', link: '/friends', activeMatch: '/friends' },
  ],
  socialLinks: [
    {
      icon: {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/><script xmlns=""/></svg>',
      },
      link: 'https://github.com/water2027',
    },
    {
      icon: {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>RSS</title><path fill="currentColor" d="M108.56,342.78a60.34,60.34,0,1,0,60.56,60.44A60.63,60.63,0,0,0,108.56,342.78Z"/><path fill="currentColor" d="M48,186.67v86.55c52,0,101.94,15.39,138.67,52.11s52,86.56,52,138.67h86.66C325.33,312.44,199.67,186.67,48,186.67Z"/><path fill="currentColor" d="M48,48v86.56c185.25,0,329.22,144.08,329.22,329.44H464C464,234.66,277.67,48,48,48Z"/></svg>',
      },
      link: 'https://www.w4ter.com/feed.xml',
    },
    {
      icon: {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M448 96v256c0 51.8-61.6 96-130 96l63 49.7C386.9 502.4 383.6 512 376 512H72c-7.6 0-10.9-9.6-5-14.3L130 448C61.8 448 0 404 0 352V96C0 43 64 0 128 0h192c65 0 128 43 128 96zM200 232V120c0-13.3-10.7-24-24-24H72c-13.3 0-24 10.7-24 24v112c0 13.3 10.7 24 24 24h104c13.3 0 24-10.7 24-24zm200 0V120c0-13.3-10.7-24-24-24H272c-13.3 0-24 10.7-24 24v112c0 13.3 10.7 24 24 24h104c13.3 0 24-10.7 24-24zm-48 56c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm-256 0c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z"/></svg>`,
      },
      link: 'https://www.travellings.cn/go.html',
    },
  ],
}
