<template>
  <NotionRenderer :blockMap="blockMap" fullPage />
</template>

<script lang="ts" setup>
const { $notion } = useNuxtApp();

// use Notion module to get Notion blocks from the API via a Notion pageId
const { data: blockMap } = useAsyncData("page_nuxt", () =>
  $notion.getPageBlocks("8c1ab01960b049f6a282dda64a94afc7")
);
</script>

<style>
@import "vue-notion/src/styles.css"; /* optional Notion-like styles */
</style>
