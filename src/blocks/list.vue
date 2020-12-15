<template></template>

<script>
import Blockable from "@/lib/blockable";
import NotionDecorator from "@/blocks/decorator.vue";

export default {
  extends: Blockable,
  name: "NotionHeader",
  components: { NotionDecorator },
};
</script>
