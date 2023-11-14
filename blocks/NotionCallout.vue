<template>
  <div :class="['notion-callout', blockColorClass(), blockColorClass('_co')]">
    <div>
      <NotionPageIcon v-bind="pass" />
    </div>
    <div class="notion-callout-text">
      <NotionTextRenderer :text="title" v-bind="pass" />
    </div>
  </div>
</template>

<script>
  import { Blockable } from '../lib/blockable';
  import NotionPageIcon from '../blocks/NotionPageIcon.vue';
  import NotionTextRenderer from '../blocks/NotionTextRenderer.vue';

  export default {
    components: {
      NotionPageIcon,
      NotionTextRenderer,
    },
    extends: Blockable,
  };
</script>
