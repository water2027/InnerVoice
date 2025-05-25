<template>
	<div class="tags-view">
		<h2>Tags</h2>
		<ul>
			<li
				v-for="tag in data.tags"
				:key="tag"
			>
				<a :href="`/tags/${tag}`">
					{{ tag }}
				</a>
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
import { data } from '../posts.data.mts';
</script>
