<script setup lang="ts">
import type { GiscusConfig } from '../../themeConfig.mts'

import { useData, useRoute } from 'vitepress'
import { computed, defineAsyncComponent, nextTick, ref, watch } from 'vue'
import { themeConfig } from '../../themeConfig.mts'

const Giscus = defineAsyncComponent(() => import('@giscus/vue'))

const { isDark } = useData()
const giscusConfig = themeConfig.giscus as GiscusConfig
const giscusTheme = computed(() =>
  isDark.value ? 'noborder_dark' : 'noborder_light',
)
const route = useRoute()

const showComment = ref(true)
const stop = watch(
  () => route.path,
  () => {
    showComment.value = false
    nextTick(() => {
      showComment.value = true
    })
  },
  {
    immediate: true,
  },
)
if (!giscusConfig) {
  stop()
  showComment.value = false
}
</script>

<template>
  <template v-if="showComment">
    <Giscus
      :repo="giscusConfig.repo"
      :repo-id="giscusConfig.categoryId"
      :category="giscusConfig.category"
      :category-id="giscusConfig.categoryId"
      :mapping="giscusConfig.mapping"
      strict="0"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="top"
      :theme="giscusTheme"
      lang="zh-CN"
      loading="lazy"
      crossorigin="anonymous"
    />
  </template>
</template>
