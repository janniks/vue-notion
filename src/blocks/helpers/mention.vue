<template>
  <a :href="mention.href" class="notion-text-mention">
    <img
      class="notion-text-mention-icon"
      v-if="mention.icon_url"
      :src="mention.icon_url"
    />
    <span class="notion-text-mention-title">{{ mention.title }}</span>
  </a>
</template>

<script>
import { Blockable, blockComputed, blockProps } from "@/lib/blockable";

export default {
  extends: Blockable,
  name: "NotionMention",
  props: { ...blockProps, mention: Object },
  computed: {
    ...blockComputed,
  },
};
</script>
