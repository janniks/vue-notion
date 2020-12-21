<template>
  <pre
    v-if="prism"
    :class="['notion-code', langClass]"
  ><Prism :language="lang">{{ properties.title[0][0] }}</Prism></pre>
  <pre
    v-else
    :class="['notion-code', langClass]"
  ><code :class="langClass">{{ properties.title[0][0] }}</code></pre>
</template>

<script>
import Prism from "vue-prism-component";
import Blockable, { blockComputed } from "@/lib/blockable";

export default {
  extends: Blockable,
  name: "NotionCode",
  components: { Prism },
  computed: {
    ...blockComputed,
    lang() {
      return this.properties?.language?.[0]?.[0]?.toLowerCase();
    },
    langClass() {
      return `language-${this.lang}`;
    },
  },
};
</script>
