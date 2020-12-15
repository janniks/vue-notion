<template>
  <NotionRenderer :blockMap="blockMap" />
</template>

<script>
import { NotionRenderer, getPageBlocks } from "../../dist/vue-notion.esm";

export default {
  components: {
    NotionRenderer,
  },
  async asyncData({ params }) {
    const slug = params.slug;
    const blockMap = await getPageBlocks(slug);
    return { blockMap, slug };
  },
};
</script>

<style>
@import "../../src/styles.css";
</style>
