<template>
  <pre :class="['notion-code', langClass]">
    <code :class="langClass">{{ properties.title[0][0] }}</code>
  </pre>
</template>

<script>
import Blockable, { blockComputed } from "@/lib/blockable";

export default {
  extends: Blockable,
  name: "NotionCode",
  computed: {
    ...blockComputed,
    langClass() {
      const language = this.properties.language[0][0];
      return `language-${language.toLowerCase()}`;
    },
  },
};
</script>
