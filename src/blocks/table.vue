<template>
  <div>
    <table class="notion-simple-table">
     <tbody>
      <NotionTableRow v-for="(row, index) in rows" :key="row.value.id" :row="row" :rowIndex="index" :hasColumnHeader="hasColumnHeader" :hasRowHeader="hasRowHeader" v-bind="pass" />
     </tbody>
    </table>
  </div>
</template>

<script>
import Blockable, { blockComputed } from "@/lib/blockable";
import NotionTableRow from "@/blocks/helpers/table-row";

export default {
  extends: Blockable,
  name: "NotionTable",
  components: {
    NotionTableRow
  },
  computed: {
    ...blockComputed,
    rows() {
      return this.value.content.map(id => this.blockMap[id])
    },
    hasColumnHeader() {
      return this.value.format.table_block_column_header
    },
    hasRowHeader() {
      return this.value.format.table_block_row_header
    }
  },
};
</script>
