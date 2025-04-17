<template>
	<template
		v-for="post in curPosts"
		:key="post.url"
	>
		<h2
			:id="post.title"
			class="post-title"
		>
			<a
				:href="post.url"
				class="title"
				>{{ post.title }}</a
			>
			<a
				class="header-anchor title"
				:href="`#${post.title}`"
				:aria-label="`Permalink to &quot;${post.title}&quot;`"
				/>
			<div
				id="date"
				class="post-date hollow-text absolute -z-1 sm:text-7xl text-5xl font-900"
				:data="post.date.string"
			></div>
		</h2>
		<span
			v-for="tag in post.tags"
			class="tag"
			>{{ tag }}</span
		>
		<p
			v-if="post.excerpt"
			v-html="post.excerpt"
		/>
	</template>

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
import { ref, computed } from 'vue';

import { data } from '../posts.data.mts';
import WPagination from '../components/WPagination.vue';

const search = window.location.search.slice(1);
const searchParams = new URLSearchParams(search);
const page = searchParams.get('page') || 1;

const current = ref(+page);
const pageSize = 10;
const total = data.totalNum;

const curPosts = computed(() => {
	return data.posts.slice(
		(current.value - 1) * pageSize,
		current.value * pageSize
	);
});

const onCurrentChange = (index:number) => {
	const url = new URL(window.location.href);
	url.searchParams.set('page', index.toString());
	window.history.replaceState({}, '', url);

	window.scrollTo({
		top: 0,
	});
};
</script>

<style scoped>
.pagination-container {
	margin-top: 60px;

	:deep(li) {
		margin-top: 0px;
	}
}

.tag {
	margin-left: 2px;
	margin-right: 2px;
	margin-top: 2px;
	padding: 5px;
	border: var(--color-border-tag) 2px solid;
	border-radius: 10px;
	background-color: var(--color-background-tag);
}

.post-title {
	margin-bottom: 6px;
	border-top: 0px;
	position: relative;
	top: 0;
	left: 0;

	.title {
		color: var(--color-title);
		font-size: 26px;
		background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
		background-repeat: no-repeat;
		background-size: 0 2px;
		background-position: right bottom;
		transition: background-size 0.5s ease-in, color 0.5s ease-in;
	}
	.title:hover {
		background-size: 100% 2px;
		background-position: left bottom;
		color: var(--color-hover-title);
	}

	.post-date {
		top: -6px;
		left: -10px;

		opacity: 0.12;
		font-weight: 900;
	}
}

#date::after {
	content: attr(data);
}

.hollow-text {
	/* 设置文本颜色为透明 */
	color: var(--vp-c-bg);

	-webkit-text-stroke: 1px var(--vp-c-text-1);
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
