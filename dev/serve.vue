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
    // sync tester: c10e1556bec44f23a20f71497b3d98c4
    // table tester: bd1de400a8b349dc824f4f00e61d0797
    // todo tester: 235057194b954a60ace89c052a65d102
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
