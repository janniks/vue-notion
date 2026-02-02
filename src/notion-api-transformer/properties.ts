import { type RichTextItem } from "./lib/types";
import { transformRichText } from "./rich-text";

/**
 * Get the rich_text content from a block based on its type
 */
function getBlockContent(block: any): RichTextItem[] | null {
  const type = block.type;
  const blockData = block[type];

  if (!blockData) return null;

  // Most blocks have rich_text
  if (blockData.rich_text) {
    return blockData.rich_text;
  }

  if (blockData.cells) {
    return null; // Handle separately
  }

  return null;
}

/**
 * Extract properties from a block
 */
export function extractProperties(block: any): Record<string, any> {
  const properties: Record<string, any> = {};

  if (!block || typeof block !== "object" || !block.type) {
    return properties;
  }

  const type = block.type;
  const blockData = block[type];

  if (!blockData) return properties;

  // Rich text content becomes title
  const richText = getBlockContent(block);
  if (richText && richText.length > 0) {
    properties.title = transformRichText(richText);
  }

  // Handle specific block types
  switch (type) {
    case "image":
    case "video":
    case "audio":
    case "file":
    case "pdf":
      if (blockData[blockData.type]?.url) {
        properties.source = [[blockData[blockData.type].url]];
      }
      if (blockData.caption && Array.isArray(blockData.caption)) {
        properties.caption = transformRichText(blockData.caption);
      }
      break;

    case "bookmark":
    case "embed":
      if (blockData.url) {
        properties.source = [[blockData.url]];
      }
      if (blockData.caption && Array.isArray(blockData.caption)) {
        properties.caption = transformRichText(blockData.caption);
      }
      break;

    case "code":
      if (blockData.rich_text && Array.isArray(blockData.rich_text)) {
        properties.title = transformRichText(blockData.rich_text);
      }
      if (blockData.language) {
        properties.language = [[blockData.language]];
      }
      if (blockData.caption && Array.isArray(blockData.caption)) {
        properties.caption = transformRichText(blockData.caption);
      }
      break;

    case "equation":
      if (blockData.expression) {
        properties.title = [[blockData.expression]];
      }
      break;

    case "to_do":
      if (typeof blockData.checked === "boolean") {
        properties.checked = [[blockData.checked ? "Yes" : "No"]];
      }
      break;

    case "callout":
      if (blockData.icon) {
        if (blockData.icon.type === "emoji") {
          properties.page_icon = blockData.icon.emoji;
        } else if (blockData.icon.type === "external") {
          properties.page_icon = blockData.icon.external.url;
        }
      }
      break;

    case "table_row":
      if (blockData.cells) {
        // Store transformed cells temporarily - will be mapped to column IDs in post-processing
        properties._cells = blockData.cells.map((cell: RichTextItem[]) =>
          transformRichText(cell)
        );
      }
      break;

    case "child_page":
      // child_page has title as a plain string, not rich_text
      if (blockData.title) {
        properties.title = [[blockData.title]];
      }
      break;

    case "child_database":
      // child_database also has title as a plain string
      if (blockData.title) {
        properties.title = [[blockData.title]];
      }
      break;
  }

  return properties;
}
