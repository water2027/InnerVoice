<script setup lang="ts">
import type { Friend } from '../../themeConfig.mts'
import { themeConfig } from '../../themeConfig.mts'

import BlogComment from '../components/BlogComment.vue'
import FriendAnnounce from '../components/FriendAnnounce.vue'
import FriendGrid from '../components/FriendGrid.vue'

const friendsGroup = themeConfig.friends

let allFriends: Friend[] = []

for (const [_, friends] of Object.entries(friendsGroup || {})) {
  allFriends = allFriends.concat(friends as [])
}

function randomGo() {
  const index = Math.floor(
    Math.random() * (allFriends.length),
  )
  const link = allFriends[index].link
  window.open(link)
}
</script>

<template>
  <FriendAnnounce
    class="mx-a mt-2 w-11/12 sm:w-4/5"
    :friends="allFriends"
  />
  <div class="mx-a mt-2 w-11/12 flex sm:w-4/5">
    <button
      class="mx-a border-2 border-gray-500 rounded-lg border-solid bg-transparent px-4 py-2 text-gray-700 transition-colors duration-300 dark:border-gray-400 dark:bg-transparent hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      @click="randomGo"
    >
      随机访问
    </button>
    <button
      class="mx-a border-2 border-gray-500 rounded-lg border-solid bg-transparent px-4 py-2 text-gray-700 transition-colors duration-300 dark:border-gray-400 dark:bg-transparent hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    >
      <a href="#comment"> 申请友链 </a>
    </button>
  </div>
  <template v-for="(friends, groupName) of friendsGroup" :key="groupName">
    <h2 class="mx-a mt-2 w-11/12 sm:w-4/5">
      {{ groupName }}
    </h2>
    <FriendGrid
      class="mx-a mt-2 w-11/12 sm:w-4/5"
      :friends="friends"
    />
  </template>
  <div
    id="comment"
    class="mx-a w-11/12 sm:w-4/5"
  >
    <BlogComment />
  </div>
</template>
