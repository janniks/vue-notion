<template>
  <figure class="notion-asset-wrapper" :style="width">
    <NotionImage v-if="isType('image')" v-bind="pass" />
    <NotionAsset v-else-if="isType(['embed', 'video', 'figma'])" v-bind="pass" />
    <figcaption v-if="caption" class="notion-image-caption">
      <NotionTextRenderer :text="caption" v-bind="pass" />
    </figcaption>
  </figure>
</template>

<script>
import { Blockable } from "@/lib/blockable";
import NotionAsset from "@/blocks/helpers/asset.vue";
import NotionImage from "@/blocks/helpers/image.vue";
import NotionTextRenderer from "@/blocks/helpers/text-renderer.vue";

export default {
  extends: Blockable,
  name: "NotionFigure",
  components: {
    NotionAsset,
    NotionImage,
    NotionTextRenderer,
  },
};
</script>
