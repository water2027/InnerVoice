---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
---

<script setup>
import { ref } from "vue";

const friends = ref([

])

</script>

<div id="root">
    <div v-for="friend in friends" :key="friend.id" class="friend">
        <img :src="friend.avatar" />
        <div>
            <span>{{ friend.name }}</span>
            <p>{{ friend.description }}</p>
            <a :href="friend.link" target="_blank">让我看看</a>
        </div>
    </div>
</div>

<style scope>
#root{
    display:grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap:30px;
}
.friend{
    min-height:300px;
    height:auto;
    padding:10px;
    display:flex;
    flex-direction:row;
    background-color:var(--color-card-background);;
    box-shadow: var(--color-box-shadow) 0px 3px 8px;
}
.friend:hover{
    transform:scale(1.1);
    box-shadow: var(--color-box-shadow-hover) 0px 5px 10px;
}
.friend img{
    width:128px;
    height:128px;
    border-radius:50%;
    margin-right:20px;
}
.friend a:hover{
    background-color:var(--color-background-tag);
}
@media (max-width: 768px) {
    #root {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 10px;
    }
    .friend {
        margin-top:20px;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    .friend img {
        margin-right: 0;
        margin-bottom: 10px;
    }
}
</style>
