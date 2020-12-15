<template>
  <p v-if="properties" class="notion-text">
    <NotionDecorator v-for="(t, i) in titles" :key="i" :content="t" />
  </p>
  <div v-else class="notion-blank">&nbsp;</div>
</template>

<script>
import Blockable from "@/lib/blockable";
import NotionDecorator from "@/blocks/decorator";

export default {
  extends: Blockable,
  name: "NotionText",
  components: { NotionDecorator },
};
</script>
