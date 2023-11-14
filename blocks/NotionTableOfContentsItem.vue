<template>
  <li class="table-of-contents-item">
    <a class="notion-link" :href="`#${uuidToId(item.id)}`">{{ item.title }}</a>
    <ul>
      <NotionTableOfContentsItem
        v-for="subItem in item.sub"
        :key="subItem.id"
        :item="subItem" />
    </ul>
  </li>
</template>

<script>
  import { Blockable, blockComputed } from '../../lib/blockable';
  import { uuidToId } from '../../lib/utils';

  export default {
    name: 'NotionTableOfContentsItem',
    props: ['item'],
    extends: Blockable,
    methods: { uuidToId },
  };
</script>

<style>
  .table-of-contents-item.table-of-contents-item {
    margin-left: 1em;
    margin: 8px 8px 8px 16px;
  }
</style>
