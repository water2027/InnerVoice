<script setup lang="ts">
import { useData } from 'vitepress'
import { onMounted, onUnmounted, provide, ref } from 'vue'
import PageHeader from './components/PageHeader.vue'

const { page, frontmatter } = useData()

const isMobile = ref(false)
function resizeHandler() {
  isMobile.value = window.innerWidth <= 768
}
onMounted(() => {
  isMobile.value = window.innerWidth <= 768

  window.addEventListener('resize', resizeHandler)
})
onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler)
})

provide('isMobile', isMobile)
</script>

<template>
  <!-- Header -->
  <PageHeader />
  <template v-if="frontmatter.layout === 'doc'">
    <!-- 约定doc就是markdown文件 -->
    <Content />
  </template>
  <template v-else>
    <Content />
  </template>
</template>

<!-- <style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style> -->
