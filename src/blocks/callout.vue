<template>
  <div class="notion-callout">
    <div>
      <NotionPageIcon v-bind="passProps" />
    </div>
    <div class="notion-callout-text">
      <NotionDecorator v-for="(t, i) in titles" :key="i" :content="t" />
    </div>
  </div>
</template>

<script>
// todo: add block color
import Blockable from "@/lib/blockable";
import NotionDecorator from "@/blocks/decorator";
import NotionPageIcon from "@/blocks/page-icon";

export default {
  extends: Blockable,
  name: "NotionCallout",
  components: {
    NotionDecorator,
    NotionPageIcon,
  },
};
</script>
