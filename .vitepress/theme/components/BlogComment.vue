<template>
	<template v-if="showComment">
		<Giscus
			:repo="giscusConfig.repo"
			:repo-id="giscusConfig.categoryId"
			:category="giscusConfig.category"
			:category-id="giscusConfig.categoryId"
			:mapping="giscusConfig.mapping"
			strict="0"
			reactions-enabled="1"
			emit-metadata="0"
			input-position="top"
			:theme="giscusTheme"
			lang="zh-CN"
			loading="lazy"
			crossorigin="anonymous"
		/>
	</template>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const Giscus = defineAsyncComponent(() => import('@giscus/vue'));

import { ref, computed, watch, nextTick } from 'vue';
import { useData, useRoute } from 'vitepress';
import { type GiscusConfig, themeConfig } from '../../themeConfig.mts';

const { isDark } = useData();
const giscusConfig = themeConfig.giscus as GiscusConfig;
const giscusTheme = computed(() =>
	isDark.value ? 'noborder_dark' : 'noborder_light'
);
const route = useRoute();

const showComment = ref(true);
const stop = watch(
	() => route.path,
	() => {
		showComment.value = false;
		nextTick(() => {
			showComment.value = true;
		});
	},
	{
		immediate: true,
	}
);
if (!giscusConfig) {
	stop();
	showComment.value = false;
}
</script>
