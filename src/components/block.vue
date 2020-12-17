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
  <NotionQuote v-else-if="type === 'quote' && visible" v-bind="passProps" />
  <NotionCallout v-else-if="type === 'callout' && visible" v-bind="passProps" />
  <div v-else-if="type === 'column_list' && visible" class="notion-row">
    <slot />
  </div>
  <NotionColumn v-else-if="type === 'column' && visible" :format="format">
    <slot />
  </NotionColumn>
  <NotionList
    v-else-if="['bulleted_list', 'numbered_list'].includes(type) && visible"
    v-bind="passProps"
  >
    <slot />
  </NotionList>
  <div v-else-if="todo && visible">todo: {{ type }}<slot /></div>
  <div v-else-if="visible"><slot /></div>
</template>

<script>
import Blockable, { blockComputed } from "@/lib/blockable";
import NotionCallout from "@/blocks/callout";
import NotionColumn from "@/blocks/column";
import NotionList from "@/blocks/list";
import NotionPage from "@/blocks/page";
import NotionHeader from "@/blocks/header";
import NotionText from "@/blocks/text";
import NotionQuote from "@/blocks/quote";

export default {
  extends: Blockable,
  name: "NotionBlock",
  components: {
    NotionCallout,
    NotionColumn,
    NotionList,
    NotionPage,
    NotionHeader,
    NotionText,
    NotionQuote,
  },
  computed: {
    ...blockComputed,
    visible() {
      return !this.hideList.includes(this.type);
    },
  },
};
</script>
