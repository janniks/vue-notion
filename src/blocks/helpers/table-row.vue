<template>
  <tr class="notion-simple-table-row">
    <td
      v-for="(cell, key, index) in row.value.properties"
      :key="key"
      class="notion-simple-table-data"
      :style="isColumnStyle(rowIndex) || isRowStyle(index) ? headerStyle : null"
    >
      <div class="notion-simple-table-cell">
        <div class="notion-simple-table-cell-text">
          <NotionTextRenderer :text="cell" v-bind="pass" />
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import Blockable, { blockComputed } from "@/lib/blockable";
import NotionTextRenderer from "@/blocks/helpers/text-renderer";
export default {
  extends: Blockable,
  name: "NotionTableRow",
  props: {
    row: {
      type: Object,
    },
    hasColumnHeader: {
      type: Boolean,
      default: false,
    },
    hasRowHeader: {
      type: Boolean,
      default: false,
    },
    rowIndex: {
      type: Number,
    },
  },
  components: {
    NotionTextRenderer,
  },
  computed: {
    ...blockComputed,
    headerStyle() {
      return {
        background: "rgb(247, 246, 243)",
        "font-weight": 500,
      };
    },
  },
  methods: {
    isColumnStyle(index) {
      return this.hasColumnHeader && index === 0;
    },
    isRowStyle(index) {
      return this.hasRowHeader && index === 0;
    },
  },
};
</script>
