import { getTextContent } from "@/lib/utils";

export const blockProps = {
  blockMap: { type: Object, required: true },
  blockOverrides: { type: Object, default: () => ({}) },
  contentId: { type: String, required: false },
  contentIndex: { type: Number, default: 0 },
  embedAllow: { type: String, default: "fullscreen" },
  fullPage: { type: Boolean, default: false },
  hideList: { type: Array, default: () => [] },
  imageOptions: Object,
  katex: { type: Boolean, default: false },
  level: { type: Number, default: 0 },
  mapImageUrl: Function,
  mapPageUrl: Function,
  pageLinkOptions: Object,
  pageLinkTarget: { type: String, default: "_self" },
  prism: { type: Boolean, default: false },
  textLinkTarget: { type: String, default: "_blank" },
  todo: { type: Boolean, default: false }
};

export const blockComputed = {
  pass() {
    // todo: make this more dynamic by iterating over blockProps attributes
    return {
      blockMap: this.blockMap,
      blockOverrides: this.blockOverrides,
      contentId: this.contentId,
      contentIndex: this.contentIndex,
      embedAllow: this.embedAllow,
      fullPage: this.fullPage,
      hideList: this.hideList,
      imageOptions: this.imageOptions,
      katex: this.katex,
      level: this.level,
      mapImageUrl: this.mapImageUrl,
      mapPageUrl: this.mapPageUrl,
      pageLinkOptions: this.pageLinkOptions,
      prism: this.prism,
      todo: this.todo
    };
  },
  alt() {
    return this.caption?.[0][0];
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
      block_height: this.format?.block_height || 1,
      block_width: this.format?.block_width || 1,
      block_color: this.format?.block_color,
      bookmark_icon: this.format?.bookmark_icon,
      bookmark_cover: this.format?.bookmark_cover,
      display_source: this.format?.display_source
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
  src() {
    return this.mapImageUrl(this.properties?.source[0][0], this.block);
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
  hasPageLinkOptions() {
    return this.pageLinkOptions?.component && this.pageLinkOptions?.href;
  },
  parent() {
    return this.blockMap[this.value?.parent_id];
  }
};

export const Blockable = {
  props: blockProps,
  computed: blockComputed,
  methods: {
    getTextContent,
    isType(t) {
      if (Array.isArray(t)) {
        return this.visible && t.includes(this.type);
      }

      return this.visible && this.type === t;
    },
    blockColorClass(suffix = "") {
      const blockColor = this.format?.block_color;
      return blockColor ? `notion-${blockColor}${suffix}` : undefined;
    },
    pageLinkProps(id) {
      return {
        [this.pageLinkOptions?.href || "href"]: this.mapPageUrl(id)
      };
    }
  }
};
