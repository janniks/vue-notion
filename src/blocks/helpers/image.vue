<template>
  <div v-if="f.block_aspect_ratio" :style="style">
    <component v-if="hasImageComponent" :is="imageOptions.component" class="notion-image-inset" :alt="alt || 'Notion image'" :src="src" v-bind="attrs"/>
    <img v-else class="notion-image-inset" :alt="alt || 'Notion image'" :src="src" v-bind="attrs" />
  </div>
  <component v-else-if="hasImageComponent" :is="imageOptions.component" :alt="alt || 'Notion image'" :src="src" v-bind="attrs" />
  <img v-else :alt="caption" :src="src" v-bind="attrs" />
</template>

<script>
import Blockable from "@/lib/blockable";

export default {
  extends: Blockable,
  name: "NotionImage",
  computed: {
    alt() {
      return this.caption?.[0][0];
    },
    src() {
      return this.mapImageUrl(this.properties?.source[0][0], this.block);
    },
    attrs() {
      const {component, ...attrs} = this.imageOptions || {}
      return attrs;  
    },
    hasImageComponent() {
      return !!this.imageOptions?.component;
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
