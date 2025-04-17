<template></template>
<script setup lang="ts">
import { useRouter } from 'vitepress';

import { data as notes } from '../notes.data.mts';

const router = useRouter();

const firstItemLink = notes[0].url;
router.go(firstItemLink);
</script>
<style scoped></style>
