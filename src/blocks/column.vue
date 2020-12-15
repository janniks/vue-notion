<template>
  <div class="notion-column" :style="columnWidth">
    <slot />
    <div class="notion-spacer" :style="spacerWidth" />
  </div>
</template>

<script>
const baseWidth = 46;

export default {
  name: "NotionColumn",
  props: ["format"],
  computed: {
    columnWidth() {
      const columns = Number((1 / this.format.column_ratio).toFixed(0));
      const totalWidth = (columns - 1) * baseWidth;
      return `width: calc((100% - ${totalWidth}px) * ${this.format.column_ratio})`;
    },
    spacerWidth() {
      return "width: " + baseWidth;
    },
  },
};
</script>
