<template>
  <NotionRenderer v-bind="pass" :contentId="aliasPointerId" />
</template>

<script>
import { Blockable, blockComputed } from "@/lib/blockable";

export default {
  extends: Blockable,
  name: "NotionPageAlias",
  computed: {
    ...blockComputed,
    aliasPointerId() {
      return this.format?.alias_pointer?.id;
    },
  },
};
</script>
