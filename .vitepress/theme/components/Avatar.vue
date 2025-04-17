<template>
	<div class="card-root flex flex-col items-center h-xs mb-4 px-5px py-10px">
		<img
			class="rounded-full w-128px h-128px mb-2"
			src="/icon-512x512.webp"
			alt="avatar"
		/>
		<span class="text-2xl font-bold text-transparent">Water</span>
		<p>Just do it</p>
		<div class="flex flex-row justify-around w-full mt-1/10">
			<div class="flex flex-col scale-85">
				<div class="text-base font-bold text-center">博客文章</div>
				<div class="text-base font-bold text-center">{{ data.totalNum }}</div>
			</div>
			<div class="flex flex-col scale-85">
				<div class="text-base font-bold text-center">建站天数</div>
				<div class="text-base font-bold text-center">{{ days }}</div>
			</div>
			<div class="flex flex-col scale-85">
				<div class="text-base font-bold text-center">本月新增</div>
				<div class="text-base font-bold text-center">{{ monthNum }}</div>
			</div>
			<div class="flex flex-col scale-85">
				<div class="text-base font-bold text-center">总字数</div>
				<div class="text-base font-bold text-center">{{ data.totalWordCount }}</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { data } from '../posts.data.mts';

const start = new Date('2024-10-12');
const now = new Date()
const days = Math.floor((now.getTime() - start.getTime()) / 1000 / 60 / 60 / 24);

const currentMonth = now.getMonth() + 1;
const currentYear = now.getFullYear();

const monthNum = data.posts.filter((post) => {
	const postDate = new Date(post.date.time);
	return (
		postDate.getMonth() + 1 === currentMonth &&
		postDate.getFullYear() === currentYear
	);
}).length;
</script>

<style scoped>
.card-root {
	background-color: var(--color-card-background);
	box-shadow: var(--color-box-shadow) 0px 3px 8px;
}
.card-root span {
	background: var(--color-name);
	background-clip: text;
	-webkit-background-clip: text;
}
</style>
