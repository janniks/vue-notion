<template>
  <div class="notion-column" :style="columnStyle">
    <slot />
  </div>
  <div class="notion-spacer" :style="spacerStyle" />
</template>

<script>
  const baseWidth = 46; // todo: add magic numbers to a config json

  export default {
    name: 'NotionColumn',
    props: ['format'],
    computed: {
      columnStyle() {
        const columns = Number((1 / this.format.column_ratio).toFixed(0));
        const totalWidth = (columns - 1) * baseWidth;
        return {
          width: `calc((100% - ${totalWidth}px) * ${this.format.column_ratio})`,
        };
      },
      spacerStyle() {
        return { width: `${baseWidth}px` };
      },
    },
  };
</script>
