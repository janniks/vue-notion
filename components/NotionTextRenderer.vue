<template>
  <span>
    <NotionDecorator
      v-for="(t, i) in text"
      :key="i"
      :content="t"
      v-bind="pass" />
  </span>
</template>

<script>
  import { Blockable, blockProps } from '../lib/blockable';

  import NotionDecorator from './NotionDecorator.vue';

  export default {
    components: {
      NotionDecorator,
    },
    extends: Blockable,
    props: { ...blockProps, text: Array },
  };
</script>
