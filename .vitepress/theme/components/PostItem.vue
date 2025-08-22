<script setup lang="ts">
import type { Post } from '../posts.data.mts'

const { post } = defineProps<{
  post: Post
}>()

const displayDate = new Date(post.date.time).toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})
</script>

<template>
  <div class="px-1 py-2">
    <h2 :id="post.title">
      <a class="anchor-title border-none text-xl font-bold italic transition-colors duration-200" hover="text-[hsl(0,0%,40%)] border-0 border-b border-solid" :href="post.url">{{ post.title }}</a>
    </h2>
    <div>
      <span class="text-3">发布于</span>
      <time class="text-3 italic" :datetime="new Date(post.date.time).toISOString()">{{ displayDate }}</time>
    </div>
    <div class="flex flex-wrap">
      <a v-for="tag in post.tags" :key="tag" :href="`/tags/${tag}`" class="m-1 cursor-pointer border rounded-md border-solid p-1 transition-colors duration-200" hover="text-[hsl(0,0%,50%)]">{{ tag }}</a>
    </div>
    <div v-if="post.excerpt" class="break-after-all pt-1" v-html="post.excerpt" />
  </div>
</template>
