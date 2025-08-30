<script setup lang="ts">
import { defineAsyncComponent, inject } from 'vue'

const PcPageHeader = defineAsyncComponent(() => import('./pc/PageHeader.vue'))
const MobilePageHeader = defineAsyncComponent(() => import('./mobile/PageHeader.vue'))

const isMobile = inject('isMobile')
</script>

<template>
  <template v-if="isMobile">
    <MobilePageHeader />
  </template>
  <template v-else>
    <PcPageHeader />
  </template>
</template>
