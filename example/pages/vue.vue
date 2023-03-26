<template>
  <NotionRenderer :blockMap="blockMap" fullPage />
</template>

<script lang="ts">
import { NotionRenderer, getPageBlocks } from "vue-notion";

// instead the following works in a ES module environment
// import { NotionRenderer, getPageBlocks } from "vue-notion";

export default {
  components: { NotionRenderer },
  data: () => ({ blockMap: null }),
  async created() {
    // get Notion blocks from the API via a Notion pageId
    this.blockMap = await getPageBlocks("8c1ab01960b049f6a282dda64a94afc7");
  },
};
</script>

<style>
/* optional Notion-like styles */
@import "vue-notion/src/styles.css";
</style>
