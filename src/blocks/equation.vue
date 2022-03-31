<template>
  <div v-if="katex">
    <component :is="'katex-element'" :expression="equation" />
  </div>
  <NotionCode
    v-else
    v-bind="pass"
    overrideLang="latex"
    overrideLangClass="language-latex"
  />
</template>

<script>
import { Blockable, blockComputed } from "@/lib/blockable";
import NotionCode from "@/blocks/code";

export default {
  extends: Blockable,
  name: "NotionEquation",
  components: { NotionCode },
  computed: {
    ...blockComputed,
    equation() {
      return this.properties?.title?.[0]?.[0];
    },
  },
};
</script>
