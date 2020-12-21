<template>
  <div :style="style">
    <iframe class="notion-image-inset" :src="src" />
  </div>
</template>

<script>
import Blockable, { blockComputed } from "@/lib/blockable";
import NotionTextRenderer from "@/blocks/helpers/text-renderer";

export default {
  extends: Blockable,
  name: "NotionAsset",
  components: { NotionTextRenderer },
  computed: {
    ...blockComputed,
    src() {
      return this.type === "figma"
        ? this.properties.source[0][0]
        : this.f.display_source;
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
