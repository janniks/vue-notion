import { transformRichText } from "./rich-text";
import { getParentId } from "./block";
import { extractIcon, extractCover, toTimestamp } from "./lib/utils";
import { PAGE_COVER_DEFAULTS } from "./lib/constants";

/**
 * Transform page metadata to old format
 */
export function transformPage(page: any): any {
  const properties: Record<string, any> = {};

  // Extract title from page properties
  if (page.properties?.title?.title) {
    properties.title = transformRichText(page.properties.title.title);
  } else if (page.properties?.Name?.title) {
    properties.title = transformRichText(page.properties.Name.title);
  }

  // Extract icon
  const pageIcon = extractIcon(page.icon);

  // Extract cover
  const pageCover = extractCover(page.cover);

  return {
    value: {
      id: page.id,
      type: "page",
      parent_id: getParentId(page),
      parent_table: page.parent?.type === "database_id" ? "collection" : "block",
      created_time: toTimestamp(page.created_time),
      last_edited_time: toTimestamp(page.last_edited_time),
      alive: !page.archived,
      properties,
      format: {
        page_icon: pageIcon,
        page_cover: pageCover,
        page_cover_position: PAGE_COVER_DEFAULTS.POSITION,
      },
      content: [], // Will be filled with child block IDs
    },
  };
}
