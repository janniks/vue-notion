<template>
  <blockquote v-if="properties" class="notion-quote">
    <NotionTextRenderer :text="title" v-bind="pass" />
  </blockquote>
</template>

<script>
import { Blockable } from "@/lib/blockable";
import NotionTextRenderer from "@/blocks/helpers/text-renderer";

export default {
  extends: Blockable,
  name: "NotionQuote",
  components: { NotionTextRenderer },
};
</script>
