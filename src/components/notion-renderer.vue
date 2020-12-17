<template>
  <NotionBlock v-bind="pass" v-if="blockMap && value">
    <NotionRenderer
      v-for="contentId in value.content"
      :key="contentId"
      v-bind="pass"
      :level="level + 1"
      :content-id="contentId"
    />
  </NotionBlock>
</template>

<script>
import Blockable from "@/lib/blockable";
import NotionBlock from "@/components/block";

import { defaultMapImageUrl, defaultMapPageUrl } from "@/lib/utils";

export default {
  extends: Blockable,
  name: "NotionRenderer",
  components: {
    NotionBlock,
  },
  props: {
    blockMap: [Object],
    contentId: String,
    fullPage: { type: Boolean, default: false },
    hideList: { type: Array, default: () => [] },
    level: { type: Number, default: 0 },
    mapImageUrl: { type: Function, default: defaultMapImageUrl },
    mapPageUrl: { type: Function, default: defaultMapPageUrl },
    pageLinkOptions: Object,
    todo: { type: Boolean, default: false },
  },
};
</script>
