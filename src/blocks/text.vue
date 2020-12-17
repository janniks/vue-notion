<template>
  <p v-if="properties" class="notion-text">
    <NotionTextRenderer :title="title" />
  </p>
  <div v-else class="notion-blank">&nbsp;</div>
</template>

<script>
import Blockable from "@/lib/blockable";
import NotionTextRenderer from "@/blocks/helpers/text-renderer";

export default {
  extends: Blockable,
  name: "NotionText",
  components: { NotionTextRenderer },
};
</script>
