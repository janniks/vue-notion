<template>
  <NotionRenderer :blockMap="blockMap" :pageLinkOptions="pageLinkOptions" />
</template>

<script>
import { NotionRenderer, getPageBlocks } from "../../dist/vue-notion.esm";

const pageLinkOptions = {
  component: "NuxtLink",
  href: "to",
};

export default {
  components: {
    NotionRenderer,
  },
  data() {
    return { pageLinkOptions };
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
