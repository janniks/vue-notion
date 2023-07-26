<template>
  <NotionBlock v-bind="pass" v-if="blockMap && value">
    <pre>{{ JSON.stringify(toc, null, 2) }}</pre>
    <ul>
      <li v-for="item in toc" :key="item.id">
        <a :href="`#${uuidToId(item.id)}`">{{ item.title }}</a>
      </li>
    </ul>
    <NotionRenderer
      v-for="(contentId, contentIndex) in value.content"
      v-bind="pass"
      :key="contentId"
      :level="level + 1"
      :content-id="contentId"
      :id="uuidToId(contentId)"
      :content-index="contentIndex"
    />
  </NotionBlock>
</template>

<script>
import { Blockable } from "@/lib/blockable";
import NotionBlock from "@/components/block.vue";

import { defaultMapImageUrl, defaultMapPageUrl } from "@/lib/utils";

export default {
  extends: Blockable,
  name: "NotionRenderer",
  components: {
    NotionBlock,
  },
  methods: {
    uuidToId(uuid) {
      return uuid.replaceAll("-", "");
    },
  },
  computed: {
    headings() {
      const output = {};
      Object.keys(this.blockMap).forEach((key) => {
        if (this.blockMap[key].value.type.includes("header")) {
          output[key] = this.blockMap[key];
        }
      });
      return output;
    },
    toc() {
      return Object.keys(this.headings).map((key) => {
        const block = this.blockMap[key].value;
        return {
          title: block.properties.title.flat(100).join(" "),
          level: block.type
            .split("_")
            .reduce((acc, value) => (value === "sub" ? acc + 1 : acc), 1),
          id: block.id,
        };
      });
    },
  },
  props: {
    blockMap: [Object],
    contentId: String,
    contentIndex: { type: Number, default: 0 },
    fullPage: { type: Boolean, default: false },
    hideList: { type: Array, default: () => [] },
    level: { type: Number, default: 0 },
    mapImageUrl: { type: Function, default: defaultMapImageUrl },
    mapPageUrl: { type: Function, default: defaultMapPageUrl },
    pageLinkOptions: Object,
    imageOptions: Object,
    prism: { type: Boolean, default: false },
    todo: { type: Boolean, default: false },
  },
};
</script>
