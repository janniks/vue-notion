<template>
  <ul class="notion-table-of-contents">
    <TableOfContentsItem
      v-for="item in hierarchy"
      :key="item.id"
      :item="item" />
  </ul>
</template>

<script>
  import { Blockable } from '../lib/blockable';

  export default {
    name: 'NotionTableOfContents',
    extends: Blockable,
  };
</script>

<script setup>
  import { computed } from 'vue';
  import TableOfContentsItem from './helpers/table-of-contents-item.vue';

  const headings = computed(() => {
    const output = {};
    Object.keys(props.blockMap).forEach((key) => {
      if (props.blockMap[key].value.type.includes('header')) {
        output[key] = props.blockMap[key];
      }
    });
    return output;
  });

  const toc = computed(() => {
    return Object.keys(headings.value).map((key) => {
      const block = props.blockMap[key].value;
      return {
        title: block.properties.title.flat(100).join(' '),
        level: block.type
          .split('_')
          .reduce((acc, value) => (value === 'sub' ? acc + 1 : acc), 1),
        id: block.id,
        sub: [],
      };
    });
  });

  const hierarchy = computed(() => {
    const stack = toc.value.slice(0).reverse();

    stack.forEach((kid) => {
      const parentIndex = stack.findIndex((parent) => parent.level < kid.level);
      if (parentIndex) {
        stack[parentIndex].sub = [...stack[parentIndex].sub, stack.shift()];
      }
    });

    return stack.reverse();
  });
</script>
