<script setup lang="ts">
import { useRoute } from 'vitepress'
import { themeConfig } from '../../../themeConfig.mts'

import ColorButton from '../utils/ColorButton.vue'

const { name, headerLinks = [], socialLinks = [] } = themeConfig

const route = useRoute()
</script>

<template>
  <header class="h-16 flex bg-$color-bg px-16 shadow-md transition-colors duration-500">
    <div class="flex items-center pl-4 sm:pl-16">
      <a
        class="font-bold"
        href="/"
      >{{ name }}</a>
    </div>
    <div class="ml-a h-full flex items-center gap-2 sm:pr-16">
      <nav class="flex gap-2">
        <div
          v-for="n in headerLinks"
          :key="n.text"
          class="h-full hover:text-$selected-title-color" :class="{
            'text-$selected-title-color': route.path === n.link,
          }"
        >
          <a :href="n.link">
            {{ n.text }}
          </a>
        </div>
      </nav>
      <div class="op-50">
        |
      </div>
      <div class="flex items-center gap-2">
        <!-- 明暗切换按钮 -->
        <ColorButton class="h-5 w-5" />
        <div class="op-50">
          |
        </div>
        <a
          v-for="link in socialLinks"
          :key="link.link"
          :href="link.link"
          class="inline-flex items-center justify-center overflow-hidden"
          style="width: 1em; height: 1em;"
          v-html="
            typeof link.icon === 'string'
              ? link.icon
              : link.icon.svg
          "
        />
      </div>
    </div>
  </header>
</template>
