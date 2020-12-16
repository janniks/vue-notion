<template>
  <div id="app">
    <notion-renderer :blockMap="blockMap" todo />
  </div>
</template>

<script>
import { NotionRenderer, getPageBlocks } from "@/entry";

export default {
  name: "ServeDev",
  components: {
    NotionRenderer,
  },
  data() {
    return { blockMap: null };
  },
  async created() {
    this.blockMap = await getPageBlocks("2e22de6b770e4166be301490f6ffd420");
  },
};
</script>

<style>
@import "./../src/styles.css";
body {
  margin: 0;
}
</style>
