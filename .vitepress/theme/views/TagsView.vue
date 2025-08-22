<script lang="ts" setup>
import { data } from '../posts.data.mts'
</script>

<template>
  <div class="p-2">
    <main class="mx-a w-full px-4 pt-10" md="w-3/5">
      <h2>Tags</h2>
      <ul>
        <li
          v-for="tag in data.tags"
          :key="tag"
          class="my-1 list-disc"
        >
          <a class="border-none font-bold italic transition-colors duration-200 decoration-none!" hover="text-[hsl(0,0%,40%)]! border-0 border-b border-solid" :href="`/tags/${tag}`">{{ tag }}</a>
        </li>
      </ul>
    </main>
  </div>
</template>
