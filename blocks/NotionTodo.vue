<template>
  <div>
    <input
      type="checkbox"
      :value="title"
      :checked="properties.checked"
      disabled="disabled" />
    <label>
      <NotionTextRenderer :text="title" v-bind="pass" />
    </label>
  </div>
</template>

<script>
  // TODO: add notion styling
  // TODO: add strikethrough

  import { Blockable } from '../lib/blockable';
  import NotionTextRenderer from '../blocks/NotionTextRenderer.vue';

  export default {
    name: 'NotionTodo',
    components: {
      NotionTextRenderer,
    },
    extends: Blockable,
  };
</script>
