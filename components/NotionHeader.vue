<template>
  <h1 v-if="type === 'header'" class="notion-h1">
    <NotionTextRenderer :text="title" v-bind="pass" />
  </h1>
  <h2 v-else-if="type === 'sub_header'" class="notion-h2">
    <NotionTextRenderer :text="title" v-bind="pass" />
  </h2>
  <h3 v-else-if="type === 'sub_sub_header'" class="notion-h3">
    <NotionTextRenderer :text="title" v-bind="pass" />
  </h3>
</template>

<script>
  import { Blockable } from '../lib/blockable';
  import NotionTextRenderer from './NotionTextRenderer.vue';

  export default {
    components: { NotionTextRenderer },
    extends: Blockable,
  };
</script>
