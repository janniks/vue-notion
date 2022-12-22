<template>
  <pre :class="['notion-code', langClass]"><code :class="langClass">{{ properties.title[0][0] }}</code></pre>
</template>

<script>
import { Blockable, blockComputed, blockProps } from "@/lib/blockable";

export default {
  extends: Blockable,
  name: "NotionCode",
  props: { ...blockProps, overrideLang: String, overrideLangClass: String },

  computed: {
    ...blockComputed,
    lang() {
      return (
        this.overrideLang || this.properties?.language?.[0]?.[0]?.toLowerCase()
      );
    },
    langClass() {
      return this.overrideLangClass || `language-${this.lang}`;
    },
  },
};
</script>
