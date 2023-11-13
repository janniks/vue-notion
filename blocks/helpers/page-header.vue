<template>
  <header class="notion-page-header">
    <div class="notion-nav-breadcrumbs">
      <!-- todo: breadcrumbs -->
    </div>
  </header>
</template>

<script>
  import { Blockable } from '../../lib/blockable';
  import Decorator from '../decorator.vue';

  export default {
    name: 'NotionPageHeader',
    components: { Decorator },
    extends: Blockable,
  };
</script>
