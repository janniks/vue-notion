<template>
  <img
    v-if="icon.includes('http')"
    :class="big ? 'notion-page-icon-cover' : 'notion-page-icon'"
    :src="mapImageUrl(icon, block)"
    :alt="titles ? getTextContent(titles) : 'Icon'"
  />
  <span
    v-else-if="icon"
    role="img"
    :aria-label="icon"
    :class="[
      'notion-emoji',
      big ? 'notion-page-icon-cover' : 'notion-page-icon',
    ]"
  >
    {{ icon }}
  </span>
</template>

<script>
import Blockable, { blockProps } from "@/lib/blockable";
export default {
  extends: Blockable,
  name: "NotionPageIcon",
  props: { ...blockProps, big: Boolean },
};
</script>
