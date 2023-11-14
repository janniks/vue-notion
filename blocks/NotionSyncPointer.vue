<template>
  <NotionRenderer
    v-bind="pass"
    :block-map="blockMap"
    :content-id="referencePointerId" />
</template>

<script>
  import { Blockable, blockComputed } from '../lib/blockable';

  export default {
    extends: Blockable,
    computed: {
      ...blockComputed,
      referencePointerId() {
        return this.format?.transclusion_reference_pointer?.id;
      },
    },
  };
</script>
