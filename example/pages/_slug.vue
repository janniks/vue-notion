<template>
  <NotionRenderer
    :blockMap="blockMap"
    :blockOverrides="blockOverrides"
    :pageLinkOptions="pageLinkOptions"
    fullPage
    prism
    katex
  />
</template>

<script>
import "prismjs";
import "prismjs/themes/prism.css";

export default {
  data() {
    return {
      blockOverrides: { code: "CustomCode" },
      pageLinkOptions: { component: "NuxtLink", href: "to" },
    };
  },
  async asyncData({ $notion, params, error }) {
    const pageTable = await $notion.getPageTable(
      "10327f9074b7433aad577ccd0020e971"
    );
    const page = pageTable.find(
      (item) => item.published && item.slug === params.slug
    );
    const blockMap = await $notion.getPageBlocks(page ? page.id : params.slug);
    if (!blockMap || blockMap.error) {
      return error({ statusCode: 404, message: "Post not found" });
    }

    return { blockMap };
  },
};
</script>

<style>
@import "vue-notion/src/styles.css";
</style>
