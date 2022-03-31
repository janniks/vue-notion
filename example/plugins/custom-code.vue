<template>
  <pre
    class="notion-code-wrapper"
    :style="{
      border: '3px solid tomato',
    }"
  >
    <NotionCode v-bind="pass"/>
  </pre>
</template>

<script>
import { NotionCode, Blockable, blockComputed, blockProps } from "vue-notion";

export default {
  extends: Blockable,
  name: "CustomCode",
  components: {
    NotionCode,
  },
  props: {
    ...blockProps,
    //> your own additional props
  },
  computed: {
    ...blockComputed,
    //> your own additional `computed` methods go here
  },
};
</script>
