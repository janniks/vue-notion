<template>
  <NotionRenderer :blockMap="blockMap" :pageLinkOptions="pageLinkOptions" />
</template>

<script>
import {
  NotionRenderer,
  getPageBlocks,
  getPageTable,
} from "vue-notion/dist/esm";

export default {
  components: {
    NotionRenderer,
  },
  data() {
    return {
      pageLinkOptions: { component: "NuxtLink", href: "to" },
    };
  },
  async asyncData({ params, error }) {
    const pageTable = await getPageTable("10327f9074b7433aad577ccd0020e971");
    const page = pageTable.find(
      (item) => item.published && item.slug === params.slug
    );
    const blockMap = await getPageBlocks(page ? page.id : params.slug);
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
