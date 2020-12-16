import { getTextContent } from "@/lib/utils";

export const blockProps = {
  blockMap: { type: Object, required: true },
  contentId: { type: String, required: false },
  fullPage: { type: Boolean, default: false },
  hideList: { type: Array, default: () => [] },
  level: { type: Number, default: 0 },
  mapImageUrl: Function,
  mapPageUrl: Function,
  pageLinkOptions: Object,
  todo: { type: Boolean, default: false },
};

export const blockComputed = {
  passProps() {
    return {
      blockMap: this.blockMap,
      contentId: this.contentId,
      fullPage: this.fullPage,
      hideList: this.hideList,
      level: this.level,
      mapImageUrl: this.mapImageUrl,
      mapPageUrl: this.mapPageUrl,
      pageLinkOptions: this.pageLinkOptions,
      todo: this.todo,
    };
  },
  block() {
    const id = this.contentId || Object.keys(this.blockMap)[0];
    return this.blockMap[id];
  },
  value() {
    return this.block?.value;
  },
  format() {
    return this.value?.format;
  },
  icon() {
    return this.format.page_icon || "";
  },
  properties() {
    return this.value?.properties;
  },
  titles() {
    return this.properties?.title;
  },
  type() {
    return this.value?.type;
  },
};

export default {
  props: blockProps,
  computed: blockComputed,
  methods: { getTextContent },
};
