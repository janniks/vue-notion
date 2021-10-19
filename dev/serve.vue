<template>
  <div id="app">
    <NotionRenderer :blockMap="blockMap" fullPage prism katex todo />
  </div>
</template>

<script>
import { NotionRenderer, getPageBlocks } from "@/entry";

import "prismjs";
import "prismjs/themes/prism.css";
import "katex/dist/katex.min.css";

export default {
  name: "ServeDev",
  components: {
    NotionRenderer,
  },
  data() {
    return { blockMap: null };
  },
  async created() {
    // react-notion tester: 2e22de6b770e4166be301490f6ffd420
    // equation tester: 2a1d5226d68246deba627012081693f9
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
