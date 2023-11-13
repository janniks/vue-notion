<template>
  <div :style="style">
    <iframe class="notion-image-inset" :src="src" :allow="embedAllow" />
  </div>
</template>

<script>
import { Blockable, blockComputed } from "@/lib/blockable";

export default {
  extends: Blockable,
  name: "NotionAsset",
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
