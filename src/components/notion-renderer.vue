<template>
  <NotionBlock v-bind="pass" v-if="blockMap && value">
    <NotionRenderer
      v-for="(contentId, contentIndex) in value.content"
      v-bind="pass"
      :key="contentId"
      :level="level + 1"
      :content-id="contentId"
      :content-index="contentIndex"
    />
  </NotionBlock>
</template>

<script>
import { Blockable } from "@/lib/blockable";
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
    contentIndex: { type: Number, default: 0 },
    fullPage: { type: Boolean, default: false },
    hideList: { type: Array, default: () => [] },
    level: { type: Number, default: 0 },
    mapImageUrl: { type: Function, default: defaultMapImageUrl },
    mapPageUrl: { type: Function, default: defaultMapPageUrl },
    pageLinkOptions: Object,
    imageOptions: Object,
    prism: { type: Boolean, default: false },
    todo: { type: Boolean, default: false },
  },
};
</script>
