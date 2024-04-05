<template>
  <div>
    <p v-if="properties" :class="['notion-text', blockColorClass()]">
      <NotionTextRenderer :text="title" v-bind="pass" />
    </p>
    <div v-else class="notion-blank">&nbsp;</div>
    <div v-if="hasContent" class="notion-indent">
      <slot />
    </div>
  </div>
</template>

<script>
import { Blockable, blockComputed } from "@/lib/blockable";
import NotionTextRenderer from "@/blocks/helpers/text-renderer";

export default {
  extends: Blockable,
  name: "NotionText",
  components: { NotionTextRenderer },
  computed: {
    ...blockComputed,
    hasContent() {
      return this.value?.content?.length > 0;
    },
  },
};
</script>
