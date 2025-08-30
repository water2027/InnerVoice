<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref } from 'vue'
import PageHeader from './components/PageHeader.vue'

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
  <Content />
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
