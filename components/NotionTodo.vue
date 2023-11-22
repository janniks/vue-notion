<template>
  <label class="notion-to-do-item">
    <span class="notion-checkbox-wrapper">
      <input
        type="checkbox"
        :value="properties.checked"
        :checked="properties.checked"
        disabled="true" />
    </span>
    <div :class="{ 'notion-to-do-checked': checked }">
      <NotionTextRenderer :text="title" v-bind="pass" />
    </div>
  </label>
</template>

<script>
  import { Blockable } from '../lib/blockable';
  import NotionTextRenderer from './NotionTextRenderer.vue';

  export default {
    components: {
      NotionTextRenderer,
    },
    extends: Blockable,
  };
</script>
