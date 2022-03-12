<template>
  <div>
    <!-- just a test {{ referencePointerId }}<br /><br /> -->

    <!-- {{ calcMap }} -->
    <!-- <p>RENDERED DATA:</p> -->
    <!-- {{ childMap }}
    <h4>test</h4>
    {{ blockMap }} -->
    <NotionRenderer :blockMap="childMap" />
  </div>
</template>

<script>
import Blockable, { blockComputed } from "@/lib/blockable";

// import NotionBlock from "@/components/block";
// import { defaultMapImageUrl, defaultMapPageUrl } from "@/lib/utils";
// import NotionRenderer from "@/components/notion-renderer";
export default {
  extends: Blockable,
  name: "NotionSyncPointer",
  components: {
    // NotionBlock,
    // NotionRenderer2,
    NotionRenderer: () => import("../components/notion-renderer.vue"),
  },
  computed: {
    ...blockComputed,
    referencePointerId() {
      return this.format?.transclusion_reference_pointer?.id;
    },

    calcMap() {
      //   return this.blockMap[this.referencePointerId]?.value;
      return {
        [this.referencePointerId]: {
          role: "reader",
          value: this.blockMap[this.referencePointerId]?.value,
        },
      };
    },
    transclusionChildIds() {
      return this.blockMap[this.referencePointerId]?.value?.content;
    },
    childMap() {
      return this.transclusionChildIds
        .map((id) => {
          return {
            [id]: this.blockMap[id],
          };
        })
        .reduce(function (result, item) {
          var key = Object.keys(item)[0]; //first property: a, b, c
          result[key] = item[key];
          return result;
        }, {});
    },
    // childMap() {
    //   return this.transclusionChildIds.map((id) => id);
    // },
    testMap() {
      return {
        "661a6380-e23d-4fd6-ac5c-197aeadfaafe": {
          role: "reader",
          value: {
            id: "661a6380-e23d-4fd6-ac5c-197aeadfaafe",
            version: 49,
            type: "text",
            properties: {
              title: [
                ["This is a synced block from another "],
                ["page", [["b"], ["c"]]],
                ["."],
              ],
            },
            created_time: 1647108420000,
            last_edited_time: 1647108660000,
            parent_id: "61a98ab5-4f1f-4fb9-aef4-340acfcd1759",
            parent_table: "block",
            alive: true,
            created_by_table: "notion_user",
            created_by_id: "f0199428-7aba-473e-86b9-eb9f78d896c6",
            last_edited_by_table: "notion_user",
            last_edited_by_id: "f0199428-7aba-473e-86b9-eb9f78d896c6",
            space_id: "a61a30bd-677b-4bab-b5c8-1863fec1f096",
          },
        },

        // "619b49d9-6b25-489d-88ae-8bd47545ec09": {
        //   role: "reader",
        //   value: {
        //     id: "619b49d9-6b25-489d-88ae-8bd47545ec09",
        //     version: 53,
        //     type: "header",
        //     properties: {
        //       title: [["New origin sync block"]],
        //     },
        //     created_time: 1647109620000,
        //     last_edited_time: 1647109620000,
        //     parent_id: "4bdce11c-d935-44e5-b96e-5b1857cea6dc",
        //     parent_table: "block",
        //     alive: true,
        //     created_by_table: "notion_user",
        //     created_by_id: "f0199428-7aba-473e-86b9-eb9f78d896c6",
        //     last_edited_by_table: "notion_user",
        //     last_edited_by_id: "f0199428-7aba-473e-86b9-eb9f78d896c6",
        //     space_id: "a61a30bd-677b-4bab-b5c8-1863fec1f096",
        //   },
        // },
      };
    },
  },
  //   props: {
  //     blockMap: [Object],
  //     contentId: String,
  //     fullPage: { type: Boolean, default: false },
  //     hideList: { type: Array, default: () => [] },
  //     level: { type: Number, default: 0 },
  //     mapImageUrl: { type: Function, default: defaultMapImageUrl },
  //     mapPageUrl: { type: Function, default: defaultMapPageUrl },
  //     pageLinkOptions: Object,
  //     prism: { type: Boolean, default: false },
  //     todo: { type: Boolean, default: false },
  //   },
};
</script>

<style>
</style>


