<template>
  <div>
    just a test {{ referencePointerId }}
    <!-- <NotionRenderer2 name="uniquerenderer" :blockMap="testMap" /> -->
  </div>
</template>

<script>
import Blockable, { blockComputed } from "@/lib/blockable";
// import NotionRenderer2 from "@/components/notion-renderer";
export default {
  extends: Blockable,
  name: "NotionSyncPointer",
  components: {
    // NotionRenderer2,
  },
  computed: {
    ...blockComputed,
    referencePointerId() {
      return this.format?.transclusion_reference_pointer?.id;
    },
    testMap() {
      return {
        "619b49d9-6b25-489d-88ae-8bd47545ec09": {
          role: "reader",
          value: {
            id: "619b49d9-6b25-489d-88ae-8bd47545ec09",
            version: 53,
            type: "header",
            properties: {
              title: [["New origin sync block"]],
            },
            created_time: 1647109620000,
            last_edited_time: 1647109620000,
            parent_id: "4bdce11c-d935-44e5-b96e-5b1857cea6dc",
            parent_table: "block",
            alive: true,
            created_by_table: "notion_user",
            created_by_id: "f0199428-7aba-473e-86b9-eb9f78d896c6",
            last_edited_by_table: "notion_user",
            last_edited_by_id: "f0199428-7aba-473e-86b9-eb9f78d896c6",
            space_id: "a61a30bd-677b-4bab-b5c8-1863fec1f096",
          },
        },
      };
    },
  },
};
</script>

<style>
</style>