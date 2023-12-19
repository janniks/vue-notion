<template>
  <img
    v-if="icon.includes('http')"
    :class="[
      format.page_cover && 'notion-page-icon-offset',
      big ? 'notion-page-icon-cover' : 'notion-page-icon',
    ]"
    :src="icon"
    :alt="title ? getTextContent(title) : 'Icon'" />
  <span
    v-else-if="icon"
    role="img"
    :aria-label="icon"
    :class="[
      'notion-emoji',
      format.page_cover && 'notion-page-icon-offset',
      big ? 'notion-page-icon-cover' : 'notion-page-icon',
    ]">
    {{ icon }}
  </span>
</template>

<script>
  import { Blockable, blockProps } from '../lib/blockable';
  export default {
    extends: Blockable,
    props: { ...blockProps, big: Boolean },
  };
</script>
