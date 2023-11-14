<template>
  <details class="notion-toggle">
    <summary>
      <NotionTextRenderer :text="title" v-bind="pass" />
    </summary>
    <div>
      <slot />
    </div>
  </details>
</template>

<script>
  import { Blockable } from '../lib/blockable';
  import NotionTextRenderer from '../blocks/helpers/NotionTextRenderer.vue';

  export default {
    name: 'NotionToggle',
    components: { NotionTextRenderer },
    extends: Blockable,
  };
</script>
