<template>
  <div id="app">
    <NotionRenderer :blockMap="blockMap" fullPage prism todo />
  </div>
</template>

<script>
import { NotionRenderer, getPageBlocks } from "@/entry";

import "prismjs";
import "prismjs/themes/prism.css";

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
    // Equation terser: add9966dd1ae4d839ccec39150f90c5d
    this.blockMap = await getPageBlocks("add9966dd1ae4d839ccec39150f90c5d");
  },
};
</script>

<style>
@import "./../src/styles.css";
body {
  margin: 0;
}
</style>
