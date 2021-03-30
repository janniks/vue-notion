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
  prism: { type: Boolean, default: false },
  todo: { type: Boolean, default: false },
};

export const blockComputed = {
  pass() {
    // todo: make this more dynamic by iterating over blockProps attributes
    return {
      blockMap: this.blockMap,
      contentId: this.contentId,
      fullPage: this.fullPage,
      hideList: this.hideList,
      level: this.level,
      mapImageUrl: this.mapImageUrl,
      mapPageUrl: this.mapPageUrl,
      pageLinkOptions: this.pageLinkOptions,
      prism: this.prism,
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
  f() {
    // format with defaults if empty
    return {
      block_aspect_ratio: this.format?.block_aspect_ratio,
      block_height: this.format?.block_height ?? 1,
      block_width: this.format?.block_width ?? 1,
      block_color: this.format?.block_color,
      bookmark_icon: this.format?.bookmark_icon,
      bookmark_cover: this.format?.bookmark_cover,
      display_source: this.format?.display_source,
    };
  },
  icon() {
    return this.format?.page_icon || "";
  },
  width() {
    return this.format?.block_width;
  },
  properties() {
    return this.value?.properties;
  },
  caption() {
    return this.properties?.caption;
  },
  description() {
    return this.properties?.description;
  },
  title() {
    return this.properties?.title;
  },
  type() {
    return this.value?.type;
  },
  visible() {
    return !this.hideList.includes(this.type);
  },
};

export default {
  props: blockProps,
  computed: blockComputed,
  methods: {
    getTextContent,
    isType(t) {
      if (Array.isArray(t)) {
        return t.includes(this.type) && this.visible;
      }

      return this.type === t && this.visible;
    },
    blockColorClass(suffix = "") {
      const blockColor = this.format?.block_color;
      return blockColor ? `notion-${blockColor}${suffix}` : undefined;
    },
  },
};
