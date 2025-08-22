<script setup lang="ts">
import { computed } from 'vue'

const { pageSize, total, currentPage } = defineProps<{
  pageSize: number
  total: number
  currentPage: number
}>()

defineEmits<{
  changePage: [number]
}>()

const totalPage = computed(() => {
  return Math.ceil(total / pageSize)
})
</script>

<template>
  <div>
    <div class="pb-1">
      <span>第{{ currentPage }}页/共{{ totalPage }}页</span>
    </div>
    <div class="flex">
      <button
        v-if="currentPage !== 1"
        class="mr-1 block rounded-md border-none bg-transparent p-1 text-center text-4 transition-colors duration-300"
        hover="bg-[hsl(0,0%,50%)]"
        @click="$emit('changePage', currentPage - 1)"
      >
        <span class="text-center">
          上一页
        </span>
      </button>
      <button
        v-if="currentPage !== totalPage"
        class="ml-1 block rounded-md border-none bg-transparent p-1 text-center text-4 transition-colors duration-300"
        hover="bg-[hsl(0,0%,50%)]"
        @click="$emit('changePage', currentPage + 1)"
      >
        <span class="text-center">
          下一页
        </span>
      </button>
    </div>
  </div>
</template>
