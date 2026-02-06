import { colorMap } from "./lib/types";
import { generateEmbedUrl } from "./embed";
import { extractIcon, generateColumnId } from "./lib/utils";
import { TABLE_DEFAULTS, VIDEO_DEFAULTS, IMAGE_DEFAULTS, COLUMN_DEFAULTS } from "./lib/constants";

/**
 * Extract format from a block
 */
export function extractFormat(block: any): Record<string, any> {
  const type = block.type;
  const blockData = block[type];
  const format: Record<string, any> = {};

  if (!blockData) return format;

  // Handle colors
  if (blockData.color && blockData.color !== "default") {
    format.block_color = colorMap[blockData.color] || blockData.color;
  }

  // Handle callout icons
  if (type === "callout" && blockData.icon) {
    format.page_icon = extractIcon(blockData.icon);
  }

  // Handle code language
  if (type === "code" && blockData.language) {
    format.code_language = blockData.language;
  }

  // Handle toggle
  if (type === "toggle") {
    format.toggleable = true;
  }

  // Handle table properties
  if (type === "table") {
    // Generate column IDs based on table_width
    const columnCount = blockData.table_width || 0;
    const columnIds = [];
    for (let i = 0; i < columnCount; i++) {
      columnIds.push(generateColumnId(i, TABLE_DEFAULTS.COLUMN_PREFIX));
    }
    format.table_block_column_order = columnIds;
    format.table_block_column_header = blockData.has_column_header || false;
    format.table_block_row_header = blockData.has_row_header || false;
    // Store table_width for reference
    format.table_block_column_format = {};
    columnIds.forEach((colId) => {
      format.table_block_column_format[colId] = { width: TABLE_DEFAULTS.COLUMN_WIDTH };
    });
  }

  // Handle column width (not available in new API, use default)
  if (type === "column") {
    format.column_ratio = COLUMN_DEFAULTS.RATIO;
  }

  // Handle video/embed blocks
  if (type === "video" || type === "embed") {
    // Get the source URL
    let sourceUrl = "";
    if (blockData.type === "external" && blockData.external?.url) {
      sourceUrl = blockData.external.url;
    } else if (blockData.url) {
      sourceUrl = blockData.url;
    }

    if (sourceUrl) {
      // Generate embed URL for known providers
      const embedInfo = generateEmbedUrl(sourceUrl);
      if (embedInfo.embedUrl) {
        format.display_source = embedInfo.embedUrl;
      }
      if (embedInfo.provider) {
        format.link_provider = embedInfo.provider;
      }
    }

    // Set default video dimensions
    format.block_width = VIDEO_DEFAULTS.BLOCK_WIDTH;
    format.block_aspect_ratio = VIDEO_DEFAULTS.ASPECT_RATIO;
    format.block_full_width = VIDEO_DEFAULTS.FULL_WIDTH;
    format.block_page_width = VIDEO_DEFAULTS.PAGE_WIDTH;
    format.block_preserve_scale = VIDEO_DEFAULTS.PRESERVE_SCALE;
  }

  // Handle image blocks
  if (type === "image") {
    format.block_full_width = IMAGE_DEFAULTS.FULL_WIDTH;
    format.block_page_width = IMAGE_DEFAULTS.PAGE_WIDTH;
  }

  return format;
}
