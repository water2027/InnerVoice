<template>
	<ListModel :posts="posts" :len="totalNum" />
</template>

<script setup lang="ts">
import ListModel from '../components/ListModel.vue';
import { data } from '../posts.data.mts';
const { posts, totalNum } = data;
</script>
