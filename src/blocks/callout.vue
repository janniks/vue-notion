<template>
  <div class="notion-callout">
    <div>
      <NotionPageIcon v-bind="passProps" />
    </div>
    <div class="notion-callout-text">
      <NotionTextRenderer :title="title" />
    </div>
  </div>
</template>

<script>
// todo: add block color
import Blockable from "@/lib/blockable";
import NotionPageIcon from "@/blocks/page-icon";
import NotionTextRenderer from "@/blocks/helpers/text-renderer";

export default {
  extends: Blockable,
  name: "NotionCallout",
  components: {
    NotionPageIcon,
    NotionTextRenderer,
  },
};
</script>
