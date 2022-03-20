<template>
  <pre
    :class="['notion-code', langClass]"
    :style="{
      border: '3px solid tomato',
    }"
  >
    <PrismComponent v-if="prism && supported" :language="lang">{{ properties.title[0][0] }}</PrismComponent>
    <code v-else :class="langClass">{{ properties.title[0][0] }}</code>
  </pre>
</template>

<script>
import Prism from "prismjs";
import PrismComponent from "vue-prism-component";

import { Blockable, blockComputed, blockProps } from "vue-notion";

export default {
  extends: Blockable,
  name: "CustomCode",
  components: { PrismComponent },
  props: { ...blockProps, overrideLang: String, overrideLangClass: String },
  data() {
    return { Prism };
  },
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
    supported() {
      return this.Prism.languages[this.lang];
    },
  },
};
</script>
