<template>
  <h1 class="notion-h1" v-if="type === 'header'">
    <NotionTextRenderer :text="title" v-bind="pass" />
  </h1>
  <h2 class="notion-h2" v-else-if="type === 'sub_header'">
    <NotionTextRenderer :text="title" v-bind="pass" />
  </h2>
  <h3 class="notion-h3" v-else-if="type === 'sub_sub_header'">
    <NotionTextRenderer :text="title" v-bind="pass" />
  </h3>
</template>

<script>
import { Blockable } from "@/lib/blockable";
import NotionTextRenderer from "@/blocks/helpers/text-renderer";

export default {
  extends: Blockable,
  name: "NotionHeader",
  components: { NotionTextRenderer },
};
</script>
