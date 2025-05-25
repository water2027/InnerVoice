<template>
	<PostItem
		v-for="post in curPosts"
		:key="post.url"
		:post="post"
	/>

	<div class="pagination-container">
		<WPagination
			v-model="current"
			:pageSize="pageSize"
			:total="total"
			size="small"
			:showPageSize="false"
			@current-change="onCurrentChange"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

import WPagination from '../components/WPagination.vue';
import PostItem from '../components/PostItem.vue';
import type { Post } from '../posts.data.mts';

const { posts, len } = defineProps<{
	posts: Post[];
	len: number;
}>();

const page = ref(1);

const current = ref(+page.value);
const pageSize = 9;
const total = len;

const curPosts = computed(() => {
	return posts.slice(
		(current.value - 1) * pageSize,
		current.value * pageSize
	);
});

const onCurrentChange = (index: number) => {
	const url = new URL(window.location.href);
	url.searchParams.set('page', index.toString());
	window.history.replaceState({}, '', url);

	window.scrollTo({
		top: 0,
	});
};
onMounted(() => {
	const search = window.location.search.slice(1);
	const searchParams = new URLSearchParams(search);
	const num = searchParams.get('page') || 1;
	page.value = Number(num);
});
</script>

<style scoped>
.pagination-container {
	margin-top: 60px;

	:deep(li) {
		margin-top: 0px;
	}
}

.pagination-container {
	height: 100px;
	width: 100%;
}
WPagination {
	width: 100%;
	height: 100%;
}
</style>
