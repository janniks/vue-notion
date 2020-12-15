<template>
  <div v-if="type === 'page' && visible">
    <NotionPage v-bind="passProps"><slot /></NotionPage>
  </div>
  <NotionHeader
    v-bind="passProps"
    v-else-if="
      ['header', 'sub_header', 'sub_sub_header'].includes(type) && visible
    "
  />
  <NotionText v-else-if="type === 'text' && visible" v-bind="passProps" />
  <NotionCallout v-else-if="type === 'callout' && visible" v-bind="passProps" />
  <div v-else-if="type === 'column_list' && visible" class="notion-row">
    <slot />
  </div>
  <NotionColumn v-else-if="type === 'column' && visible" :format="format">
    <slot />
  </NotionColumn>
  <div v-else-if="todo && visible">todo: {{ type }}<slot /></div>
  <div v-else-if="visible"><slot /></div>
</template>

<script>
import Blockable, { blockComputed } from "@/lib/blockable";
import NotionCallout from "@/blocks/callout";
import NotionColumn from "@/blocks/column";
import NotionPage from "@/blocks/page";
import NotionHeader from "@/blocks/header";
import NotionText from "@/blocks/text";

export default {
  extends: Blockable,
  name: "NotionBlock",
  components: {
    NotionCallout,
    NotionColumn,
    NotionPage,
    NotionHeader,
    NotionText,
  },
  computed: {
    ...blockComputed,
    visible() {
      return !this.hideList.includes(this.type);
    },
  },
};
</script>
