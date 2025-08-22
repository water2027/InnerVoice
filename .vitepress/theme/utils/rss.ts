import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { Feed } from 'feed'

import { createContentLoader } from 'vitepress'
import { themeConfig } from '../../themeConfig.mts'

interface Post {
  url: string
  html: string
  date: string
  frontmatter: Record<string, any>
}

const hostname = themeConfig.hostname
async function createRssFileZH(config) {
  if (!hostname) {
    return
  }
  const feed = new Feed({
    title: themeConfig.name || 'InnerVoice',
    description: themeConfig.description || '记录我的内心独白',
    id: hostname,
    link: hostname,
    language: 'zh-Hans',
    image: `${hostname}/icon-512x512.webp`,
    favicon: `${hostname}/favicon.ico`,
    copyright: `Copyright (c) 2024-present, ${
      themeConfig.author?.name || 'InnerVoice'
    }`,
  })

  const posts = await createContentLoader<Post[]>('posts/**/*.md', {
    render: true,
    transform(raw) {
      const _posts: Post[] = []
      for (const { url, frontmatter, html } of raw) {
        if (frontmatter.hide)
          continue
        const paths = url.split('/').filter(Boolean)
        paths.pop()
        paths.shift()
        for (let i = 0; i < 3; ++i) {
          if (paths[i].length < 2) {
            paths[i] = `0${paths[i]}`
          }
        }
        const time = paths.join('-')
        const post: Post = {
          url,
          html: html || '',
          date: time,
          frontmatter,
        }
        _posts.push(post)
      }
      return _posts
    },
  }).load()

  posts.sort((a, b) =>
    Number(+new Date(b.date) - +new Date(a.date)),
  )

  for (const { url, html, frontmatter, date } of posts) {
    // 仅保留最近 5 篇文章
    if (feed.items.length >= 5) {
      break
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
      date: new Date(date),
    })
  }

  writeFileSync(path.join(config.outDir, 'feed.xml'), feed.rss2(), 'utf-8')
}

export { createRssFileZH }
