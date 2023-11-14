<template>
  <p v-if="properties" :class="['notion-text', blockColorClass()]">
    <NotionTextRenderer :text="title" v-bind="pass" />
  </p>
  <div v-else class="notion-blank">&nbsp;</div>
</template>

<script>
  import { Blockable } from '../lib/blockable';
  import NotionTextRenderer from '../blocks/helpers/text-renderer.vue';

  export default {
    name: 'NotionText',
    components: { NotionTextRenderer },
    extends: Blockable,
  };
</script>
