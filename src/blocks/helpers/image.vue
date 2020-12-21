<template>
  <div v-if="f.block_aspect_ratio" :style="style">
    <img class="notion-image-inset" :alt="alt || 'Notion image'" :src="src" />
  </div>
  <img v-else :alt="caption" :src="src" />
</template>

<script>
import Blockable, { blockComputed } from "@/lib/blockable";
import NotionTextRenderer from "@/blocks/helpers/text-renderer";

export default {
  extends: Blockable,
  name: "NotionImage",
  components: { NotionTextRenderer },
  computed: {
    ...blockComputed,
    alt() {
      return this.caption?.[0][0];
    },
    src() {
      return this.mapImageUrl(this.properties?.source[0][0], this.block);
    },
    style() {
      const aspectRatio =
        this.f.block_aspect_ratio || this.f.block_height / this.f.block_width;
      return {
        paddingBottom: `${aspectRatio * 100}%`,
        position: "relative",
      };
    },
  },
};
</script>
