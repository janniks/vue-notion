<template>
  <div class="notion-simple-table-wrapper">
    <table class="notion-simple-table">
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>

<script>
import { Blockable } from "@/lib/blockable";

export default {
  extends: Blockable,
  name: "NotionTable",
};
</script>
