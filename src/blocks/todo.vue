<template>
  <div>
    <input
      type="checkbox"
      :value="title"
      :checked="properties.checked"
      disabled="disabled"
    />
    <label>
      <NotionTextRenderer :text="title" v-bind="pass" />
    </label>
  </div>
</template>

<script>
// TODO: add notion styling
// TODO: add strikethrough

import { Blockable } from "@/lib/blockable";
import NotionTextRenderer from "@/blocks/helpers/text-renderer";

export default {
  extends: Blockable,
  name: "NotionTodo",
  components: {
    NotionTextRenderer,
  },
};
</script>
