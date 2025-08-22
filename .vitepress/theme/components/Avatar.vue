<script setup lang="ts">
import { themeConfig } from '../../themeConfig.mts'
import { data } from '../posts.data.mts'

const start = new Date('2024-10-12')
const now = new Date()
const { description, author } = themeConfig
const days = Math.floor((now.getTime() - start.getTime()) / 1000 / 60 / 60 / 24)

const currentMonth = now.getMonth() + 1
const currentYear = now.getFullYear()

const monthNum = data.posts.filter((post) => {
  const postDate = new Date(post.date.time)
  return (
    postDate.getMonth() + 1 === currentMonth
    && postDate.getFullYear() === currentYear
  )
}).length
</script>

<template>
  <div class="card-root mb-4 h-xs flex flex-col items-center px-5px py-10px">
    <img
      class="mb-2 h-128px w-128px rounded-full"
      src="/icon-512x512.webp"
      alt="avatar"
    >
    <span class="text-2xl text-transparent font-bold">{{ author?.name || '' }}</span>
    <p>{{ description || '' }}</p>
    <div class="mt-1/10 w-full flex flex-row justify-around">
      <div class="flex flex-col scale-85">
        <div class="text-center text-base font-bold">
          博客文章
        </div>
        <div class="text-center text-base font-bold">
          {{ data.totalNum }}
        </div>
      </div>
      <div class="flex flex-col scale-85">
        <div class="text-center text-base font-bold">
          建站天数
        </div>
        <div class="text-center text-base font-bold">
          {{ days }}
        </div>
      </div>
      <div class="flex flex-col scale-85">
        <div class="text-center text-base font-bold">
          本月新增
        </div>
        <div class="text-center text-base font-bold">
          {{ monthNum }}
        </div>
      </div>
      <div class="flex flex-col scale-85">
        <div class="text-center text-base font-bold">
          总字数
        </div>
        <div class="text-center text-base font-bold">
          {{ data.totalWordCount }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-root {
  box-shadow: var(--color-box-shadow) 0px 3px 0px;
}
.card-root span {
  background: linear-gradient(90deg, #3097ff 0%, #0069d3 100%);
  background-clip: text;
  -webkit-background-clip: text;
}
</style>
