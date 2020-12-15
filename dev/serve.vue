<template>
  <div id="app">
    <notion-renderer :blockMap="blockMap" todo />
  </div>
</template>

<script>
import { NotionRenderer } from "@/entry";

export default {
  name: "ServeDev",
  components: {
    NotionRenderer,
  },
  data() {
    return { blockMap: null };
  },
  async created() {
    this.blockMap = await fetch(
      "https://notion-api.splitbee.io/v1/page/2e22de6b770e4166be301490f6ffd420"
    ).then((res) => res.json());
  },
};
</script>

<style>
@import "./../src/styles.css";
</style>
