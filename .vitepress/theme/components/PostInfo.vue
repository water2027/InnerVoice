<script setup lang="ts">
import { useData } from 'vitepress'
import { data } from '../posts.data.mts'

const { frontmatter } = useData()

const post = (() => {
  const posts = data.posts
  for (const p of posts) {
    if (p.title === frontmatter.value.title) {
      return p
    }
  }
})()
</script>

<template>
  <div class="info-root mb-2 flex items-center gap-4 text-sm">
    <span class="mb-1 flex items-center gap-1">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <rect
          x="3"
          y="3"
          width="10"
          height="10"
          rx="2"
          stroke="currentColor"
        />
        <path
          d="M3.5 6.5h9M6 2.5v2M10 2.5v2"
          stroke="currentColor"
          stroke-linecap="round"
        />
      </svg>
      {{ post?.date?.string }}
    </span>
    <span class="mb-1 flex items-center gap-1">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <rect
          x="3"
          y="2"
          width="10"
          height="12"
          rx="1"
          stroke="currentColor"
        />
        <path
          d="M5 5h6M5 8h6M5 11h4"
          stroke="currentColor"
          stroke-linecap="round"
        />
      </svg>
      {{ post?.wordCount }}
    </span>
    <span class="mb-1 flex items-center gap-1">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <circle
          cx="8"
          cy="8"
          r="7"
          fill="none"
          stroke="currentColor"
        />
        <path
          d="M8 4v4l3 2"
          stroke="currentColor"
          stroke-width="1.2"
          fill="none"
          stroke-linecap="round"
        />
      </svg>
      {{ post?.readingTime }}min
    </span>
  </div>
</template>

<style scoped>
.info-root {
  color: var(--vp-c-text-2);
  border-bottom: 1px solid rgb(19, 19, 19);
}

html.dark .info-root {
  border-bottom: 1px solid rgb(110, 110, 110);
}
</style>
