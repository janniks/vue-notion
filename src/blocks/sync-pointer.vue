<template>
  <NotionRenderer
    v-bind="pass"
    :blockMap="blockMap"
    :contentId="referencePointerId"
  />
</template>

<script>
import { Blockable, blockComputed } from "@/lib/blockable";

export default {
  extends: Blockable,
  name: "NotionSyncPointer",
  computed: {
    ...blockComputed,
    referencePointerId() {
      return this.format?.transclusion_reference_pointer?.id;
    },
  },
};
</script>
