<template>
  <div v-if="isType('page')">
    <NotionPage v-bind="pass"><slot /></NotionPage>
  </div>
  <NotionHeader
    v-else-if="isType(['header', 'sub_header', 'sub_sub_header'])"
    v-bind="pass"
  />
  <NotionText v-else-if="isType('text')" v-bind="pass" />
  <NotionQuote v-else-if="isType('quote')" v-bind="pass" />
  <NotionCallout v-else-if="isType('callout')" v-bind="pass" />
  <NotionToggle v-else-if="isType('toggle')" v-bind="pass">
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
    v-bind="pass"
  >
    <slot />
  </NotionList>
  <NotionFigure
    v-else-if="isType(['image', 'embed', 'figma', 'video'])"
    v-bind="pass"
  />
  <hr v-else-if="isType('divider')" class="notion-hr" />
  <div v-else-if="todo && visible">todo: {{ type }}<slot /></div>
  <!-- todo: maybe add message on !production if block type unsupported -->
  <!-- <div v-else-if="visible"><slot /></div> -->
</template>

<script>
import Blockable, { blockComputed } from "@/lib/blockable";
import NotionCallout from "@/blocks/callout";
import NotionColumn from "@/blocks/column";
import NotionFigure from "@/blocks/helpers/figure";
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
    NotionFigure,
    NotionList,
    NotionPage,
    NotionHeader,
    NotionText,
    NotionToggle,
    NotionQuote,
  },
};
</script>
