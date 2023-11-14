<template>
  <blockquote v-if="properties" class="notion-quote">
    <NotionTextRenderer :text="title" v-bind="pass" />
  </blockquote>
</template>

<script>
  import { Blockable } from '../lib/blockable';
  import NotionTextRenderer from '../blocks/helpers/NotionTextRenderer.vue';

  export default {
    name: 'NotionQuote',
    components: { NotionTextRenderer },
    extends: Blockable,
  };
</script>
