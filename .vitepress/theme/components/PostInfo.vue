<template>
	<div class="info-root">
		<span class="info-item">
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
			>
				<rect
					x="3"
					y="3"
					width="10"
					height="10"
					rx="2"
					stroke="currentColor"
				/>
				<path
					d="M3.5 6.5h9M6 2.5v2M10 2.5v2"
					stroke="currentColor"
					stroke-linecap="round"
				/>
			</svg>
			{{ post.date?.string }}
		</span>
		<span class="info-item">
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
			>
				<rect
					x="3"
					y="2"
					width="10"
					height="12"
					rx="1"
					stroke="currentColor"
				/>
				<path
					d="M5 5h6M5 8h6M5 11h4"
					stroke="currentColor"
					stroke-linecap="round"
				/>
			</svg>
			{{ post.wordCount }}
		</span>
		<span class="info-item">
			<svg
				class="icon"
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="currentColor"
			>
				<circle
					cx="8"
					cy="8"
					r="7"
					fill="none"
					stroke="currentColor"
				/>
				<path
					d="M8 4v4l3 2"
					stroke="currentColor"
					stroke-width="1.2"
					fill="none"
					stroke-linecap="round"
				/>
			</svg>
			{{ post.readingTime }}min
		</span>
	</div>
</template>
<script setup>
import { data } from '../posts.data.mjs';
import { ref, onMounted } from 'vue';
import { useData } from 'vitepress';

const frontmatterData = useData();
const post = ref({});

onMounted(() => {
	data.posts.forEach((item) => {
		if (item.title == frontmatterData.frontmatter.value.title) {
			post.value = item;
		}
	});
});
</script>
<style scoped>
.info-root {
	display: flex;
	align-items: center;
	gap: 16px;
	color: var(--vp-c-text-2);
	font-size: 14px;

    margin-bottom: -30px;
    margin-left: 20%;
}

.info-item {
	display: flex;
	align-items: center;
	gap: 4px;
}

.icon {
	width: 16px;
	height: 16px;
}
</style>
