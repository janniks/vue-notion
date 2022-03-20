<template>
  <pre
    v-if="prism && supported"
    :class="['notion-code', langClass]"
  ><PrismComponent :language="lang">{{ properties.title[0][0] }}</PrismComponent></pre>
  <pre
    v-else
    :class="['notion-code', langClass]"
  ><code :class="langClass">{{ properties.title[0][0] }}</code></pre>
</template>

<script>
import Prism from "prismjs";
import PrismComponent from "vue-prism-component";
import { Blockable, blockComputed, blockProps } from "@/lib/blockable";

export default {
  extends: Blockable,
  name: "NotionCode",
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
