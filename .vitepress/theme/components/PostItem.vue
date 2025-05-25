<template>
	<div>
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
		<div
			v-if="post.excerpt"
			v-html="post.excerpt"
		></div>
	</div>
</template>
<script setup lang="ts">
import type { Post } from '../posts.data.mts';
defineProps<{
	post: Post;
}>();
</script>
<style lang="scss" scoped>
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
</style>
