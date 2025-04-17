<template>
	<template
		v-for="(postGroup, year) of postGroups"
		:key="year"
	>
		<h2
			:id="year.toString().replace(/年/, '')"
			class="post-title mb-1 relative top-0 left-0"
		>
			<a
				class="header-anchor"
				:href="`#${year.toString().replace(/年/, '')}`"
				:aria-label="`Permalink to &quot;${year}&quot;`"
				/>
			<div class="post-year hollow-text absolute -z-1 font-900">
				{{ year.toString().replace(/年/, '') }}
			</div>
		</h2>
		<div
			class="post-container flex justify-between mx-0 my-3"
			v-for="post in postGroup"
			:key="post.url"
		>
			<a
				:href="post.url"
				class="title"
				>{{ post.title }}</a
			>
			<span class="post-date">
				{{ post.date.monthDay }}
			</span>
		</div>
	</template>
</template>

<script setup lang="ts">
import { data, type Post } from '../posts.data.mts';

interface PostGroups {
	[key: string]: Post[];
}

let postGroups: PostGroups = {};
data.posts.forEach((post) => {
	const year = post.date.year; 
	if (!postGroups.hasOwnProperty(year)) {
		postGroups[year] = [];
	}
	postGroups[year].push(post);
});
</script>
<style scoped>
.post-title {
	border-top: 0px;
	.post-year {
		top: -6px;
		left: -10px;

		opacity: 0.12;
		font-size: 86px;
	}
}

.post-container {
	.title {
		color: var(--color-title);
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
		opacity: 0.6;
	}
}

.hollow-text {
	/* 设置文本颜色为透明 */
	color: var(--vp-c-bg);

	-webkit-text-stroke: 1px var(--vp-c-text-1);
}
</style>
