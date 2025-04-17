<script setup lang="ts">
import type { Friend } from '../../themeConfig.mts';
import { themeConfig } from '../../themeConfig.mts';

import CardGrid from '../components/CardGrid.vue';
import FriendAnnounce from '../components/FriendAnnounce.vue';
import BlogComment from '../components/BlogComment.vue';

const friendsGroup = themeConfig.friends

let allFriends:Friend[] = []

for(const [_, friends] of Object.entries(friendsGroup||{})) {
	allFriends = allFriends.concat(friends as [])
}

const randomGo = () => {
	const index = Math.floor(
		Math.random() * (allFriends.length)
	);
	const link = allFriends[index].link;
	window.open(link);
};
</script>
<template>
	<FriendAnnounce
		class="sm:w-4/5 w-11/12 mx-a mt-2"
		:friends="allFriends"
	/>
	<div class="sm:w-4/5 w-11/12 mx-a mt-2 flex">
		<button
			class="mx-a px-4 py-2 border-2 border-gray-500 dark:border-gray-400 text-gray-700 dark:text-gray-300 bg-transparent dark:bg-transparent rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
			@click="randomGo"
		>
			随机访问
		</button>
		<button
			class="mx-a px-4 py-2 border-2 border-gray-500 dark:border-gray-400 text-gray-700 dark:text-gray-300 bg-transparent dark:bg-transparent rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
		>
			<a href="#comment"> 申请友链 </a>
		</button>
	</div>
	<template v-for="(friends, groupName) of friendsGroup">
		<h2 class="sm:w-4/5 w-11/12 mx-a mt-2">{{ groupName }}</h2>
		<CardGrid
			class="sm:w-4/5 w-11/12 mx-a mt-2"
			:friends="friends"
		/>
	</template>
	<div
		id="comment"
		class="w-11/12 mx-a sm:w-4/5"
	>
		<BlogComment />
	</div>
</template>
