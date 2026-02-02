// Type mappings from new API to old format
export const typeMap: Record<string, string> = {
  paragraph: "text",
  heading_1: "header",
  heading_2: "sub_header",
  heading_3: "sub_sub_header",
  bulleted_list_item: "bulleted_list",
  numbered_list_item: "numbered_list",
  to_do: "to_do",
  toggle: "toggle",
  quote: "quote",
  callout: "callout",
  code: "code",
  image: "image",
  video: "video",
  audio: "audio",
  file: "file",
  pdf: "pdf",
  bookmark: "bookmark",
  equation: "equation",
  divider: "divider",
  table_of_contents: "table_of_contents",
  column_list: "column_list",
  column: "column",
  table: "table",
  table_row: "table_row",
  embed: "embed",
  synced_block: "transclusion_container",
  child_page: "page",
  child_database: "collection_view",
};

// Color mappings
export const colorMap: Record<string, string> = {
  default: "",
  gray: "gray",
  brown: "brown",
  orange: "orange",
  yellow: "yellow",
  green: "green",
  blue: "blue",
  purple: "purple",
  pink: "pink",
  red: "red",
  gray_background: "gray_background",
  brown_background: "brown_background",
  orange_background: "orange_background",
  yellow_background: "yellow_background",
  green_background: "green_background",
  blue_background: "blue_background",
  purple_background: "purple_background",
  pink_background: "pink_background",
  red_background: "red_background",
};

export interface RichTextItem {
  type: string;
  text?: { content: string; link?: { url: string } | null };
  mention?: any;
  equation?: { expression: string };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href?: string | null;
}

export type DecoratorTuple = [string] | [string, string];

/**
 * Block map structure returned by fetchNotionPage
 * Maps block IDs to their transformed block data
 */
export interface BlockMap {
  [blockId: string]: {
    value: {
      id: string;
      type: string;
      parent_id: string;
      parent_table: string;
      created_time: number;
      last_edited_time: number;
      alive: boolean;
      properties?: Record<string, any>;
      format?: Record<string, any>;
      content?: string[];
    };
  };
}
