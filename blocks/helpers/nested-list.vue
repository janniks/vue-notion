<template>
  <ul v-if="type === 'bulleted_list'" class="notion-list notion-list-disc">
    <slot />
  </ul>
  <ol v-else class="notion-list notion-list-numbered">
    <slot />
  </ol>
</template>

<script>
import { Blockable, blockComputed } from "@/lib/blockable";

import { getListNumber } from "@/lib/utils";

export default {
  extends: Blockable,
  name: "NotionNestedList",
  computed: {
    ...blockComputed,
    start() {
      return getListNumber(this.value?.id, this.blockMap);
    },
  },
};
</script>
