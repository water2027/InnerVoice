<script setup lang="ts">
import type { Post } from '../posts.data.mts'
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
</script>

<template>
  <template
    v-for="(postGroup, year) of postGroups"
    :key="year"
  >
    <h2
      :id="year.toString().replace('年', '')"
      class="post-title relative left-0 top-0 mb-1 border-0"
    >
      <div class="post-year absolute font-900 -z-1">
        <em class="hollow-text">
          {{ year.toString().replace(/年/, '') }}
        </em>
      </div>
    </h2>
    <div
      v-for="post in postGroup"
      :key="post.url"
      class="post-container mx-0 my-3 flex justify-between"
    >
      <a class="border-0 border-b border-transparent border-solid text-4 font-bold italic text-$vp-c-text-1! text-default-font! decoration-none!" hover="text-default-hover! border-current" :href="post.url">{{ post.title }}</a>
      <span class="post-date op-60">
        {{ post.date.monthDay }}
      </span>
    </div>
  </template>
</template>

<style scoped>
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
  color: var(--vp-c-bg);
  -webkit-text-stroke: 1px var(--vp-c-text-2);
}
</style>
