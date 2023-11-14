<template>
  <div :class="['notion-callout', blockColorClass(), blockColorClass('_co')]">
    <div>
      <NotionPageIcon v-bind="pass" />
    </div>
    <div class="notion-callout-text">
      <NotionRenderer
        v-if="block.value.content"
        v-for="(contentId, contentIndex) in block.value.content"
        v-bind="pass"
        :key="contentId"
        :level="pass.level + 1"
        :content-id="contentId"
        :content-index="contentIndex"
      />
      <NotionTextRenderer v-else :text="title" v-bind="pass" />
    </div>
  </div>
</template>

<script>
import { Blockable } from "@/lib/blockable";
import NotionPageIcon from "@/blocks/helpers/page-icon.vue";
import NotionRenderer from "@/components/NotionRenderer.vue";
import NotionTextRenderer from "@/blocks/helpers/text-renderer.vue";

export default {
  extends: Blockable,
  name: "NotionCallout",
  components: {
    NotionPageIcon,
    NotionTextRenderer,
  },
};
</script>
