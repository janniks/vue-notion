<template>
  <div class="notion-callout">
    <div>
      <NotionPageIcon v-bind="pass" />
    </div>
    <div class="notion-callout-text">
      <NotionTextRenderer :text="title" />
    </div>
  </div>
</template>

<script>
// todo: add block color
import Blockable from "@/lib/blockable";
import NotionPageIcon from "@/blocks/helpers/page-icon";
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
