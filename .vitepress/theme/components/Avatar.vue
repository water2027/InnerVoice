<template>
	<div class="card-root">
		<img
			src="/icon-512x512.webp"
			alt="avatar"
		/>
		<span>Water</span>
		<p>Just do it</p>
		<div class="informContainer">
			<div class="information">
				<div>博客文章</div><div>{{ data.totalNum }}</div>
			</div>
			<div class="information"><div>建站天数</div><div>{{ days }}</div></div>
			<div class="information"><div>本月新增</div><div>{{ monthNum }}</div></div>
			<div class="information"><div>总字数</div><div>{{ data.totalWordCount }}</div></div>
		</div>
	</div>
</template>

<script setup>
import { data } from '../posts.data.mjs'
import { ref, onMounted } from 'vue'

const days = ref(0)
const monthNum = ref(0)

onMounted(() => {
  const start = new Date('2024-10-12')
  days.value = Math.floor((new Date() - start) / 1000 / 60 / 60 / 24)

  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()
  
  monthNum.value = data.posts.filter(post => {
    const postDate = new Date(post.date.time)
    return postDate.getMonth() + 1 === currentMonth && 
           postDate.getFullYear() === currentYear
  }).length
})
</script>

<style scoped>
.card-root {
	height: 350px;
	margin-bottom: 15px;
	padding-left: 5px;
	padding-right: 5px;
	padding-top: 10px;
	padding-bottom: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: var(--color-card-background);
	box-shadow: var(--color-box-shadow) 0px 3px 8px;
}
.card-root img {
	width: 128px;
	height: 128px;
	border-radius: 50%;
	margin-bottom: 10px;
}
.card-root span {
	font-size: 24px;
	font-weight: bold;
	background: var(--color-name);
	background-clip: text;
	-webkit-background-clip: text;
	color: transparent;
}
.informContainer {
    display: flex;
    flex-direction: row !important;
    justify-content: space-around;
    width: 100%;
    margin-top: 10%;
}
.information {
    display: flex;
    flex-direction: column !important;
	scale: 0.85;
}
.information div {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}
@media (max-width: 768px) {
	.card-root {
		margin-top: 20px;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	.card-root img {
		margin-right: 0;
		margin-bottom: 10px;
	}
}
</style>
