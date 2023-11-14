<template>
  <p v-if="properties" :class="['notion-text', blockColorClass()]">
    <NotionTextRenderer :text="title" v-bind="pass" />
  </p>
  <div v-else class="notion-blank">&nbsp;</div>
</template>

<script>
  import { Blockable } from '../lib/blockable';
  import NotionTextRenderer from './NotionTextRenderer.vue';

  export default {
    components: { NotionTextRenderer },
    extends: Blockable,
  };
</script>
