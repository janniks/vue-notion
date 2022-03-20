<template>
  <div v-if="f.block_aspect_ratio" :style="style">
    <component
      v-if="hasImageComponent"
      :is="imageOptions.component"
      class="notion-image-inset"
      :alt="alt || 'Notion image'"
      v-bind="imageProps"
    />
    <img
      v-else
      class="notion-image-inset"
      :alt="alt || 'Notion image'"
      v-bind="imageProps"
    />
  </div>
  <component
    v-else-if="hasImageComponent"
    :is="imageOptions.component"
    :alt="alt || 'Notion image'"
    v-bind="imageProps"
  />
  <img v-else :alt="alt" v-bind="imageProps" />
</template>

<script>
import { Blockable, blockComputed } from "@/lib/blockable";

export default {
  extends: Blockable,
  name: "NotionImage",
  computed: {
    ...blockComputed,
    hasImageComponent() {
      return !!this.imageOptions?.component;
    },
    imageProps() {
      const { component, ...attrs } = this.imageOptions || {};
      return {
        ...attrs,
        [this.imageOptions?.src || "src"]: this.src,
      };
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
