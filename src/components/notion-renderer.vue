<template>
  <NotionBlock v-if="blockMap && value" v-bind="pass">
    <NotionRenderer
      v-for="(contentId, contentIndex) in value.content"
      v-bind="pass"
      :id="uuidToId(contentId)"
      :key="contentId"
      :level="level + 1"
      :content-id="contentId"
      :content-index="contentIndex" />
  </NotionBlock>
</template>

<script>
  import { Blockable } from '@/lib/blockable';
  import NotionBlock from '@/components/block.vue';
  import TableOfContents from '@/blocks/table-of-contents.vue';
  import { uuidToId } from '@/lib/utils';
  import { defaultMapImageUrl, defaultMapPageUrl } from '@/lib/utils';

  export default {
    name: 'NotionRenderer',
    components: {
      NotionBlock,
      TableOfContents,
    },
    extends: Blockable,
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
    methods: {
      uuidToId(uuid) {
        return uuidToId(uuid);
      },
    },
  };
</script>
