<script setup lang="ts">
import { ref } from 'vue'

const isDark = ref(document.documentElement.classList.contains('dark'))

async function changeAppearance() {
  document.documentElement.classList.toggle('dark')
  isDark.value = !isDark.value

  const body = document.body
  let animations: Parameters<typeof body.animate>[0] = []
  if (isDark.value) {
    animations = [
      { backgroundColor: 'rgb(255, 255, 255)' },
      { backgroundColor: 'rgb(27, 27, 31)' },
    ]
  }
  else {
    animations = [
      { backgroundColor: 'rgb(27, 27, 31)' },
      { backgroundColor: 'rgb(255, 255, 255)' },
    ]
  }

  body.animate(
    animations,
    {
      duration: 500,
      easing: 'ease-in-out',
    },
  )
}
</script>

<template>
  <div class="flex items-center justify-center border rounded-full p-0.5">
    <button
      type="button" class="h-full w-full" :class="{
        'i-tabler-sun': !isDark,
        'i-tabler-moon': isDark,
      }" @click="changeAppearance"
    />
  </div>
</template>

<style>
</style>
