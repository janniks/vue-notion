<template>
  <ul
    v-if="isTopLevel && type === 'bulleted_list'"
    class="notion-list notion-list-disc"
  >
    <li><NotionTextRenderer :text="title" v-bind="pass" /></li>
    <NotionNestedList v-if="value.content" v-bind="pass">
      <slot />
    </NotionNestedList>
  </ul>
  <ol
    v-else-if="isTopLevel && type === 'numbered_list'"
    class="notion-list notion-list-numbered"
    :start="start"
  >
    <li><NotionTextRenderer :text="title" v-bind="pass" /></li>
    <NotionNestedList v-if="value.content" v-bind="pass">
      <slot />
    </NotionNestedList>
  </ol>
  <span v-else>
    <li><NotionTextRenderer :text="title" v-bind="pass" /></li>
    <NotionNestedList v-if="value.content" v-bind="pass">
      <slot />
    </NotionNestedList>
  </span>
</template>

<script>
import { Blockable, blockComputed } from "@/lib/blockable";
import NotionNestedList from "@/blocks/helpers/nested-list";
import NotionTextRenderer from "@/blocks/helpers/text-renderer";

import { getListNumber } from "@/lib/utils";

export default {
  extends: Blockable,
  name: "NotionList",
  components: { NotionNestedList, NotionTextRenderer },
  computed: {
    ...blockComputed,
    start() {
      return getListNumber(this.value?.id, this.blockMap);
    },
    isTopLevel() {
      return this.type !== this.blockMap[this.value?.parent_id]?.value?.type;
    },
  },
};
</script>
