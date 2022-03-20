<template>
  <header class="notion-page-header">
    <div class="notion-nav-breadcrumbs">
      <!-- todo: breadcrumbs -->
    </div>
  </header>
</template>

<script>
import { Blockable } from "@/lib/blockable";
import Decorator from "@/blocks/decorator";

export default {
  extends: Blockable,
  name: "NotionPageHeader",
  components: { Decorator },
};
</script>
