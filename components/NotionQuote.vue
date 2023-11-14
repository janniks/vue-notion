<template>
  <blockquote v-if="properties" class="notion-quote">
    <NotionTextRenderer :text="title" v-bind="pass" />
  </blockquote>
</template>

<script>
  import { Blockable } from '../lib/blockable';
  import NotionTextRenderer from './NotionTextRenderer.vue';

  export default {
    components: { NotionTextRenderer },
    extends: Blockable,
  };
</script>
