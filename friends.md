---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
---

<script setup>
import { ref } from "vue";

const friends = ref([
    {
        id:1,
        name:'Jerry',
        link: 'https://jerrylingj.top',
        description: 'qwq',
        avatar: 'https://sse-market-source-1320172928.cos.ap-guangzhou.myqcloud.com/src/images/uploads/1729130790695993497_头像1.jpg',
    },
    {
        id:2,
        name:'math-zhuxy',
        link:'https://www.mathzhuxy.top',
        description: 'hello~',
        avatar: 'https://sse-market-source-1320172928.cos.ap-guangzhou.myqcloud.com/src/images/uploads/1728918801765528128_%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20241014222719.jpg'
    },
    {
        id:3,
        name:'thinkerhui',
        link:'https://thinkerhui.site',
        description:'MBTI是ENFP。热爱AI等前沿技术，喜欢倾听用户反馈，不断迭代升级项目。掌握初级Web全栈开发，擅长前端开发。有人工智能相关科研经历。',
        avatar:'https://sse-market-source-1320172928.cos.ap-guangzhou.myqcloud.com/src/images/resized/1700193342453573764_mmexport1699801185607_[B@32573fa.jpg'
    },
    {
        id:4,
        name:'神烦老狗',
        link:'https://www.laogou717.com/',
        description:'倘若生活太苦，我便往里加点糖✨',
        avatar:'https://cdn.jsdelivr.net/gh/JonasTech0/Jonas-imgs-240211/2024-02-11-Web%E9%A6%96%E9%A1%B5%E5%8A%A0%E8%BD%BD%E5%9B%BE/shouye2.png'
    },
    {
        id:5,
        name:'Peter',
        link:'https://peter267.zeabur.app/',
        description:'无限进步',
        avatar:'https://wmimg.com/i/1169/2024/09/66ec1739c38a0.png'
    }
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
