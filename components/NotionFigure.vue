<template>
  <figure class="notion-asset-wrapper" :style="width">
    <NotionImage v-if="isType('image')" v-bind="pass" />
    <NotionAsset
      v-else-if="isType(['embed', 'video', 'figma'])"
      v-bind="pass" />
    <figcaption v-if="caption" class="notion-image-caption">
      <NotionTextRenderer :text="caption" v-bind="pass" />
    </figcaption>
  </figure>
</template>

<script>
  import { Blockable } from '../lib/blockable';
  import NotionAsset from './NotionAsset.vue';
  import NotionImage from './NotionImage.vue';
  import NotionTextRenderer from './NotionTextRenderer.vue';

  export default {
    components: {
      NotionAsset,
      NotionImage,
      NotionTextRenderer,
    },
    extends: Blockable,
  };
</script>
