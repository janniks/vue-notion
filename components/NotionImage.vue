<template>
  <div v-if="f.block_aspect_ratio" :style="aspectRatioStyle">
    <img class="notion-image-inset" :alt="alt || 'Notion image'" :src="src" />
  </div>
  <img v-else :alt="alt" :src="src" :style="basicStyle" />
</template>

<script>
  import { Blockable, blockComputed } from '../lib/blockable';

  export default {
    extends: Blockable,
    computed: {
      ...blockComputed,
      hasImageComponent() {
        return !!this.imageOptions?.component;
      },
      basicStyle() {
        return {
          width: this.f.block_width == 1 ? '100%' : `${this.f.block_width}px`,
          height:
            this.f.block_height == 1 ? '100%' : `${this.f.block_height}px`,
        };
      },
      aspectRatioStyle() {
        let aspectRatio =
          this.f.block_width == 1 ||
          this.f.block_height == 1 ||
          this.f.block_aspect_ratio
            ? 1 / this.f.block_aspect_ratio
            : `${this.f.block_width} / ${this.f.block_height} `;

        return {
          width: `${this.f.block_width}px`,
          height: `100%`,
          maxWidth: '100%',
          position: 'relative',
          aspectRatio,
        };
      },
    },
  };
</script>
