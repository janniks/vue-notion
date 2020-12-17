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
    f() {
      // format with defaults if empty
      return {
        display_source: this.format?.display_source ?? undefined,
        block_aspect_ratio: this.format?.block_aspect_ratio ?? undefined,
        block_height: this.format?.block_height ?? 1,
        block_width: this.format?.block_width ?? 1,
      };
    },
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
