<script lang="ts" setup>
import { useData } from 'vitepress'
import ListModel from '../components/ListModel.vue'
import { data } from '../posts.data.mts'

const { params } = useData()

const posts = (() => {
  if (!params.value || !params.value.tag)
    return []
  const tag = params.value.tag as string
  const _posts = data.posts.filter((post) => {
    if (!post.tags)
      return false
    return post.tags.includes(tag)
  })
  return _posts
})()
const totalNum = posts.length
</script>

<template>
  <ListModel :posts="posts" :len="totalNum" />
</template>
