<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import { computed, defineAsyncComponent, nextTick, provide } from 'vue'

const BlogComment = defineAsyncComponent(() => import('./components/BlogComment.vue'))
const PostInfo = defineAsyncComponent(() => import('./components/PostInfo.vue'))
const Avatar = defineAsyncComponent(() => import('./components/Avatar.vue'))
const route = useRoute()
const notShowComment = computed(() => route.path === '/' || route.path === '/archive' || route.path === '/about' || route.path.startsWith('/tags'))
const showAside = computed(() => route.path === '/about')
const shouldShowInfo = computed(() => route.path.includes('/posts/'))

const { isDark } = useData()

function enableTransitions() {
  return 'startViewTransition' in document
    && window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )
})
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-before>
      <PostInfo v-if="shouldShowInfo" />
    </template>
    <template #aside-top>
      <Avatar v-if="showAside" />
    </template>
    <template #doc-after>
      <BlogComment v-if="!notShowComment" />
    </template>
  </DefaultTheme.Layout>
</template>

<style>
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
</style>
