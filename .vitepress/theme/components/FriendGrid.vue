<script setup lang="ts">
import type { Friend } from '../../themeConfig.mts'

export interface GridProps {
  friends: Friend[]
}
defineProps<GridProps>()
</script>

<template>
  <div id="root">
    <a v-for="friend in friends" :key="friend.name" :href="friend.link" target="_blank" class="group friend relative h-30 overflow-hidden rounded-xl bg-slate bg-op-20 hover:bg-slate-200 hover:bg-op-30">
      <div class="flex flex-row duration-500 group-hover:-transform-translate-x-[var(--friend-card-height)]">
        <img class="m-1 mr-4 rounded-full" :src="friend.avatar">
        <div class="flex flex-col">
          <p class="ml-1 mt-2">{{ friend.name }}</p>
          <p class="group-hover:w-full">{{ friend.description }}</p>
        </div>
      </div>
    </a>
  </div>
</template>

<style scope>
#root {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 30px;
}
.friend {
  --friend-card-height: 90px;
}
.friend:hover {
  box-shadow: var(--color-box-shadow-hover) 0px 5px 10px;
}
.friend img {
  width: calc(var(--friend-card-height) * 0.9);
  height: calc(var(--friend-card-height) * 0.9);
}
.friend a:hover {
  background-color: var(--color-background-tag);
}

@media (max-width: 768px) {
  #root {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
  }
  .friend {
    margin-top: 20px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
