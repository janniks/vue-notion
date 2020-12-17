<template>
  <blockquote v-if="properties" class="notion-quote">
    <NotionTextRenderer :title="title" />
  </blockquote>
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
