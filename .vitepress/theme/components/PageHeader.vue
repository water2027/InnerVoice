<script setup lang="ts">
import { themeConfig } from '../../themeConfig.mts'

const { name = 'InnerVoice', nav = [], socialLinks = [] } = themeConfig
</script>

<template>
  <header class="h-5 flex px-4 py-2">
    <div>
      <a class="font-bold" href="/">{{ name }}</a>
    </div>
    <div class="ml-a h-full flex">
      <nav>
        <a v-for="n in nav" :key="n.text" :href="n.link">{{ n.text }}</a>
      </nav>
      <div>
        <!-- 明暗切换按钮 -->
        <a v-for="link in socialLinks" :key="link.link" class="h-full" :href="link.link" v-html="typeof link.icon === 'string' ? link.icon : link.icon.svg" />
      </div>
    </div>
  </header>
</template>
