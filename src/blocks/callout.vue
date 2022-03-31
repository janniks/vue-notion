<template>
  <div :class="['notion-callout', blockColorClass(), blockColorClass('_co')]">
    <div>
      <NotionPageIcon v-bind="pass" />
    </div>
    <div class="notion-callout-text">
      <NotionTextRenderer :text="title" v-bind="pass" />
    </div>
  </div>
</template>

<script>
import { Blockable } from "@/lib/blockable";
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
