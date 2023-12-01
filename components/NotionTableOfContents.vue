<template>
  <ul class="notion-table-of-contents" style="margin-left: -16px">
    <NotionTableOfContentsItem
      v-for="item in toc"
      :key="item.id"
      :item="item" />
  </ul>
</template>

<script>
  import { Blockable } from '../lib/blockable';
  import { computed } from 'vue';
  import NotionTableOfContentsItem from './NotionTableOfContentsItem.vue';

  export default {
    extends: Blockable,
    components: {
      NotionTableOfContentsItem,
    },
    setup(props) {
      // This computed retreives a correct order of block directly from page block,
      // because blockMap order can be wrong
      const blockKeys = computed(() => {
        const pageKey = Object.keys(props.blockMap).find((key) => {
          return props.blockMap[key].value.type === 'page';
        });

        return props.blockMap[pageKey].value.content;
      });

      // This computed assembles map of heading using correct order
      const headings = computed(() => {
        const output = {};

        blockKeys.value.forEach((key) => {
          if (props.blockMap[key].value.type.includes('header')) {
            output[key] = props.blockMap[key];
          }
        });
        return output;
      });

      // This computed creates flat ToC
      const flatToc = computed(() => {
        return Object.keys(headings.value).map((key) => {
          const block = props.blockMap[key].value;
          return {
            title: block.properties.title
              .flat()
              .filter((v) => typeof v === 'string')
              .join(''),
            level: block.type
              .split('_')
              .reduce((acc, value) => (value === 'sub' ? acc + 1 : acc), 1),
            id: block.id,
            sub: [],
          };
        });
      });

      const buildTree = (items) => {
        let stack = [];
        let nestedItems = [];

        items.forEach((item) => {
          let currentLevel = item.level;

          // If stack is empty or current item's level is greater than the last item in stack
          if (!stack.length || currentLevel > stack[stack.length - 1].level) {
            stack.push(item);
          } else {
            // Pop items from the stack until we find the correct parent level
            while (
              stack.length &&
              currentLevel <= stack[stack.length - 1].level
            ) {
              let subItem = stack.pop();
              if (stack.length) {
                stack[stack.length - 1].sub.push(subItem);
              } else {
                nestedItems.push(subItem);
              }
            }
            stack.push(item);
          }
        });

        // Add any remaining items in the stack to the nested items
        while (stack.length) {
          let subItem = stack.pop();
          if (stack.length) {
            stack[stack.length - 1].sub.push(subItem);
          } else {
            nestedItems.push(subItem);
          }
        }

        return nestedItems;
      };

      const toc = computed(() => buildTree(flatToc.value));

      return { toc };
    },
  };
</script>
