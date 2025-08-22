<script setup lang="ts">
import type { Post } from '../posts.data.mts'

import { computed, onMounted, ref } from 'vue'
import PostItem from './PostItem.vue'
import WaterPager from './WaterPager.vue'

const { posts, len } = defineProps<{
  posts: Post[]
  len: number
}>()

const current = ref(1)
const pageSize = 9
const total = len

const curPosts = computed(() => {
  return posts.slice(
    (current.value - 1) * pageSize,
    current.value * pageSize,
  )
})

function onChangePage(index: number) {
  const url = new URL(window.location.href)
  url.searchParams.set('page', index.toString())
  window.history.replaceState({}, '', url)
  current.value = index

  window.scrollTo({
    top: 0,
  })
}
onMounted(() => {
  const search = window.location.search.slice(1)
  const searchParams = new URLSearchParams(search)
  const num = searchParams.get('page') || 1
  current.value = Number(num)
})
</script>

<template>
  <div class="p-2">
    <main class="mx-a w-full px-1 pt-10" md="w-3/5">
      <PostItem
        v-for="post in curPosts"
        :key="post.url"
        :post="post"
        class="my-1"
      />
      <WaterPager class="ml-2 mt-4" md="" :page-size="pageSize" :total="total" :current-page="current" @change-page="onChangePage" />
    </main>
  </div>
</template>
