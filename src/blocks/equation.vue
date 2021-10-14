<template>
  <div v-if="katex">
    <KatexElement :expression="equation" />
  </div>
  <pre v-else-if="prism && supported" :class="['notion-code', langClass]">
    <PrismComponent :language="lang">{{ equation }}</PrismComponent>
  </pre>
  <pre v-else :class="['notion-code', langClass]">
    <code :class="langClass">{{ equation }}</code>
  </pre>
</template>

<script>
import KatexElement from "vue-katex";
import Blockable, { blockComputed } from "@/lib/blockable";

export default {
  extends: Blockable,
  name: "NotionCode",
  components: { KatexElement },
  data() {
    return { Prism, lang: "latex", langClass: "language-latex" };
  },
  computed: {
    ...blockComputed,
    equation() {
      return this.properties?.title?.[0]?.[0];
    },
  },
};
</script>
