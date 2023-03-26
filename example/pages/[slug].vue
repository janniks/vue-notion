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

<script lang="ts" setup>
import "prismjs";
import "prismjs/themes/prism.css";

const route = useRoute();
const { $notion } = useNuxtApp();

const blockOverrides = { code: "CustomCode" };

// dynamic components need resolveComponent instance of `NuxtLink`, rather than string
const NuxtLink = resolveComponent("NuxtLink");
const pageLinkOptions = { component: NuxtLink, href: "to" };

const { data: blockMap } = await useAsyncData(
  `page_by_slug_${route.params.slug}`,
  async () => {
    const pageTable = await $notion.getPageTable(
      "10327f9074b7433aad577ccd0020e971"
    );
    const page = pageTable.find(
      (item) => item.published && item.slug === route.params.slug
    );
    const blockMap = await $notion.getPageBlocks(
      page ? page.id : route.params.slug
    );
    if (!blockMap || blockMap.error) {
      throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
    }
    return blockMap;
  }
);
</script>

<style>
@import "vue-notion/src/styles.css";
@import "katex/dist/katex.min.css";
</style>
