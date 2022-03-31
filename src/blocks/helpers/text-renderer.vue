<template>
  <span>
    <NotionDecorator
      v-for="(t, i) in text"
      :key="i"
      :content="t"
      v-bind="pass"
    />
  </span>
</template>

<script>
import { Blockable, blockProps } from "@/lib/blockable";

import NotionDecorator from "@/blocks/decorator";

export default {
  extends: Blockable,
  name: "NotionTextRenderer",
  props: { ...blockProps, text: Array },
  components: {
    NotionDecorator,
  },
};
</script>
