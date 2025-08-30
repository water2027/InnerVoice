<script setup lang="ts">
import type { Post } from '../posts.data.mts'
import { useTemplateRef } from 'vue'
import { data } from '../posts.data.mts'

interface PostGroups {
  [key: string]: Post[]
}

const postGroups: PostGroups = {}
data.posts.forEach((post) => {
  const year = post.date.year
  if (!(year in postGroups)) {
    postGroups[year] = []
  }
  postGroups[year].push(post)
})

const scrollContainer = useTemplateRef('scrollContainer')
function scrollToYear(year: string) {
  const targetElement = document.getElementById(year.toString().replace('年', ''))
  if (targetElement && scrollContainer.value) {
    const containerRect = scrollContainer.value.getBoundingClientRect()
    const targetRect = targetElement.getBoundingClientRect()

    const scrollTop = scrollContainer.value.scrollTop
    const targetPosition = targetRect.top - containerRect.top + scrollTop

    scrollContainer.value.scrollTo({
      top: targetPosition - 20, // 添加一点偏移量
      behavior: 'smooth',
    })
  }
}
</script>

<template>
  <div ref="scrollContainer" class="h-screen w-full flex overflow-auto pb-50">
    <div class="h-fit w-full p-4 sm:w-3/5 sm:p-16 sm:pl-64">
      <div
        v-for="(postGroup, year) of postGroups"
        :key="year"
        class="mb-20"
      >
        <h2
          :id="year.toString().replace('年', '')"
          class="post-title left-0 top-0 mb-1 border-0"
        >
          <div class="post-year font-900 -z-1">
            <em class="hollow-text">
              {{ year.toString().replace(/年/, '') }}
            </em>
          </div>
        </h2>
        <div
          v-for="post in postGroup"
          :key="post.url"
          class="post-container mx-0 flex justify-between"
        >
          <a class="border-0 border-b border-transparent border-solid text-4 font-bold italic text-$vp-c-text-1! text-default-font! decoration-none!" hover="text-default-hover! border-current" :href="post.url">{{ post.title }}</a>
          <span class="post-date op-60">
            {{ post.date.monthDay }}
          </span>
        </div>
      </div>
    </div>
    <div class="fixed right-0 hidden h-full sm:w-2/5 sm:flex">
      <!-- toc -->
      <div class="mx-a mb-a mt-16 h-fit w-2/5 rounded-2xl p-4">
        <h2 class="mb-4">
          时间轴
        </h2>
        <div v-for="(postGroup, year) of postGroups" :key="year" class="my-2">
          <a class="text-sm italic" hover="text-default-hover!" :href="`#${year.toString().replace('年', '')}`" @click="scrollToYear(year.toString())">{{ year }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.post-title {
  border-top: 0px;
  .post-year {
    top: -12px;
    left: -10px;

    opacity: 0.2;
    font-size: 86px;
  }
}

.hollow-text {
  color: var(--color-bg);
  -webkit-text-stroke: 1px var(--text-color);
}
</style>
