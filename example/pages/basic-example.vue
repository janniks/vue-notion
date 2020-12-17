<template>
  <NotionRenderer :blockMap="blockMap" fullPage />
</template>

<script>
import { NotionRenderer, getPageBlocks } from "vue-notion";

export default {
  components: { NotionRenderer },
  data: () => ({ blockMap: null }),
  async created() {
    this.blockMap = await getPageBlocks("8c1ab01960b049f6a282dda64a94afc7");
  },
};
</script>

<style>
@import "vue-notion/src/styles.css"; /* optional notion-like styles */
</style>
