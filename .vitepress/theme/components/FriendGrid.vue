<script setup lang="ts">
import type { Friend } from '../../themeConfig.mts'
export interface GridProps {
    friends: Friend[]
}
defineProps<GridProps>()
</script>
<template>
    <div id="root">
        <a v-for="friend in friends" :href="friend.link" target="_blank" :key="friend.name" class="group friend h-30 overflow-hidden relative bg-slate bg-op-20 rounded-xl hover:bg-slate-200 hover:bg-op-30">
            <div class="flex flex-row group-hover:-translate-x-[var(--friend-card-height)] duration-500">
                <img class="m-1 mr-4 rounded-full" :src="friend.avatar" />
                <div class="flex flex-col">
                    <p class="ml-1 mt-2">{{ friend.name }}</p>
                    <p class="text-black group-hover:w-full">{{ friend.description }}</p>
                </div>
            </div>
        </a>
    </div>
</template>

<style scope>
#root{
    display:grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap:30px;
}
.friend{
    --friend-card-height: 90px;
}
.friend:hover{
    box-shadow: var(--color-box-shadow-hover) 0px 5px 10px;
}
.friend img{
    width:calc(var(--friend-card-height)*0.9);
    height:calc(var(--friend-card-height)*0.9);
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

}
</style>