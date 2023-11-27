<template>
  <component
    :is="blockOverrides[type]"
    v-if="blockOverrides.hasOwnProperty(type)"
    v-bind="pass" />
  <div v-else-if="isType('page')">
    <NotionPage v-bind="pass">
      <slot />
    </NotionPage>
  </div>
  <NotionHeader
    v-else-if="isType(['header', 'sub_header', 'sub_sub_header'])"
    v-bind="pass" />
  <NotionTableOfContents
    v-else-if="isType('table_of_contents')"
    v-bind="pass" />
  <NotionBookmark v-else-if="isType('bookmark')" v-bind="pass" />
  <NotionCallout v-else-if="isType('callout')" v-bind="pass" />
  <NotionCode v-else-if="isType('code')" v-bind="pass" />
  <NotionEquation v-else-if="isType('equation')" v-bind="pass" />
  <NotionText v-else-if="isType('text')" v-bind="pass" />
  <NotionQuote v-else-if="isType('quote')" v-bind="pass" />
  <NotionTodo v-else-if="isType('to_do')" v-bind="pass" />
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
    v-bind="pass">
    <slot />
  </NotionList>
  <NotionFigure
    v-else-if="isType(['image', 'embed', 'figma', 'video', 'audio'])"
    v-bind="pass" />
  <NotionTable v-else-if="isType('table')" v-bind="pass">
    <slot />
  </NotionTable>
  <NotionSyncPointer
    v-else-if="isRendererRegistered && isType('transclusion_reference')"
    v-bind="pass" />
  <div
    v-else-if="isRendererRegistered && isType('transclusion_container')"
    class="notion-sync-block">
    <slot />
  </div>
  <NotionTableRow v-else-if="isType('table_row')" v-bind="pass" />
  <hr v-else-if="isType('divider')" class="notion-hr" />
  <div v-else-if="todo && visible">
    todo: {{ type }}
    <slot />
  </div>
</template>

<script>
  import { getCurrentInstance } from 'vue';

  import { Blockable, blockComputed } from '../lib/blockable';

  import NotionBookmark from './NotionBookmark.vue';
  import NotionCallout from './NotionCallout.vue';
  import NotionCode from './NotionCode.vue';
  import NotionColumn from './NotionColumn.vue';
  import NotionEquation from './NotionEquation.vue';
  import NotionFigure from './NotionFigure.vue';
  import NotionHeader from './NotionHeader.vue';
  import NotionList from './NotionList.vue';
  import NotionPage from './NotionPage.vue';
  import NotionQuote from './NotionQuote.vue';
  import NotionSyncPointer from './NotionSyncPointer.vue';
  import NotionTable from './NotionTable.vue';
  import NotionTableRow from './NotionTableRow.vue';
  import NotionText from './NotionText.vue';
  import NotionTodo from './NotionTodo.vue';
  import NotionToggle from './NotionToggle.vue';
  import NotionTableOfContents from './NotionTableOfContents.vue';

  export default {
    components: {
      NotionBookmark,
      NotionCallout,
      NotionCode,
      NotionColumn,
      NotionEquation,
      NotionEquation,
      NotionFigure,
      NotionHeader,
      NotionList,
      NotionPage,
      NotionQuote,
      NotionSyncPointer,
      NotionTable,
      NotionTableRow,
      NotionText,
      NotionTodo,
      NotionToggle,
      NotionTableOfContents,
    },
    extends: Blockable,
    computed: {
      ...blockComputed,
      isRendererRegistered() {
        return 'NotionRenderer' in getCurrentInstance().appContext.components;
      },
    },
  };
</script>
