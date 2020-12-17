<template>
  <div v-if="isType('page')">
    <NotionPage v-bind="passProps"><slot /></NotionPage>
  </div>
  <NotionHeader
    v-else-if="isType(['header', 'sub_header', 'sub_sub_header'])"
    v-bind="passProps"
  />
  <NotionText v-else-if="isType('text')" v-bind="passProps" />
  <NotionQuote v-else-if="isType('quote')" v-bind="passProps" />
  <NotionCallout v-else-if="isType('callout')" v-bind="passProps" />
  <NotionToggle v-else-if="isType('toggle')" v-bind="passProps">
    <slot />
  </NotionToggle>
  <div v-else-if="isType('column_list')" class="notion-row">
    <slot />
  </div>
  <NotionColumn v-else-if="isType('column')" :format="format">
    <slot />
  </NotionColumn>
  <NotionList
    v-else-if="isType(['bulleted_list', 'numbered_list'])"
    v-bind="passProps"
  >
    <slot />
  </NotionList>
  <hr v-else-if="isType('divider')" className="notion-hr" />
  <div v-else-if="todo && visible">todo: {{ type }}<slot /></div>
  <!-- todo: maybe add message on !production if block type unsupported -->
  <!-- <div v-else-if="visible"><slot /></div> -->
</template>

<script>
import Blockable, { blockComputed } from "@/lib/blockable";
import NotionCallout from "@/blocks/callout";
import NotionColumn from "@/blocks/column";
import NotionList from "@/blocks/list";
import NotionPage from "@/blocks/page";
import NotionHeader from "@/blocks/header";
import NotionText from "@/blocks/text";
import NotionToggle from "@/blocks/toggle";
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
    NotionToggle,
    NotionQuote,
  },
  computed: {
    ...blockComputed,
    visible() {
      return !this.hideList.includes(this.type);
    },
  },
  methods: {
    isType(t) {
      if (Array.isArray(t)) {
        return t.includes(type) && this.visible;
      }

      return this.type === t && this.visible;
    },
  },
};
</script>
