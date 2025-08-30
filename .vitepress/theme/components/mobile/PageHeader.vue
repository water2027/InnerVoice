<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import { themeConfig } from '../../../themeConfig.mts'
import ColorButton from '../utils/ColorButton.vue'

const { name, headerLinks = [], socialLinks = [] } = themeConfig

const isOpen = ref(false)
const menuHeight = ref(0)
const menu = useTemplateRef('menu')

// 纯css方案感觉不完美, 还是用js吧
function toggleMenu() {
  const open = () => {
    isOpen.value = true
    if (!menu.value) {
      return
    }
    const animation = menu.value.animate([
      { height: '0' },
      { height: `${menuHeight.value}px` },
    ], {
      duration: 300,
      easing: 'ease-out',
      fill: 'forwards',
    })
    animation.onfinish = () => {
      if (!menu.value) {
        return
      }
      menu.value.style.overflow = 'visible'
    }
  }
  const close = () => {
    isOpen.value = false
    if (!menu.value) {
      return
    }
    menu.value.style.overflow = 'hidden'
    menu.value.animate([
      { height: `${menuHeight.value}px` },
      { height: '0' },
    ], {
      duration: 300,
      easing: 'ease-in',
      fill: 'forwards',
    })
  }
  if (isOpen.value) {
    close()
  }
  else {
    open()
  }
}

onMounted(() => {
  if (!menu.value) {
    return
  }
  const { offsetHeight } = menu.value
  menuHeight.value = offsetHeight
  menu.value.style.height = '0'
})
</script>

<template>
  <header class="relative h-16 flex bg-$color-bg px-4 shadow-md transition-colors duration-500">
    <div class="flex items-center pl-4 sm:pl-8">
      <a
        class="font-bold"
        href="/"
      >{{ name }}</a>
    </div>
    <div class="ml-a flex content-center justify-center p-2" @click="toggleMenu">
      <div class="i-tabler-menu-2 m-a h-full" />
    </div>
    <div ref="menu" class="absolute left-0 top-full z-1000 w-full overflow-hidden b-t b-t-$border-color bg-$color-bg shadow-md">
      <nav class="flex flex-col pt-2">
        <a
          v-for="n in headerLinks"
          :key="n.text"
          :href="n.link"
          class="block h-full b-b b-b-$border-color px-4 py-2 hover:text-$selected-title-color"
        >
          <span>
            {{ n.text }}
          </span>
        </a>
      </nav>
      <div class="flex items-center justify-center gap-2 b-t b-t-$border-color p-2">
        <span>切换模式</span>
        <ColorButton class="h-5 w-5" />
      </div>
      <div class="flex items-center justify-center gap-4 p-2 pb-8">
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
