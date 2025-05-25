<template>

</template>
<script lang="ts" setup>
defineProps<{
    post: {
        title: string;
        url: string;
        date: { string: string };
        tags: string[];
        excerpt?: string;
    };
}>()
</script>
<style lang="scss" scoped>
</style>