/**
 * Utility functions for Notion API transformation
 */

export interface IconData {
  type: "emoji" | "external" | "file";
  emoji?: string;
  external?: { url: string };
  file?: { url: string };
}

export interface CoverData {
  type: "external" | "file";
  external?: { url: string };
  file?: { url: string };
}

export interface MediaData {
  type: "external" | "file";
  external?: { url: string };
  file?: { url: string };
  url?: string;
}

/**
 * Extract icon value from Notion icon object
 * Returns emoji string or URL, or empty string if no icon
 */
export function extractIcon(icon: IconData | null | undefined): string {
  if (!icon) return "";

  switch (icon.type) {
    case "emoji":
      return icon.emoji || "";
    case "external":
      return icon.external?.url || "";
    case "file":
      return icon.file?.url || "";
    default:
      return "";
  }
}

/**
 * Extract cover URL from Notion cover object
 * Returns URL string or empty string if no cover
 */
export function extractCover(cover: CoverData | null | undefined): string {
  if (!cover) return "";

  switch (cover.type) {
    case "external":
      return cover.external?.url || "";
    case "file":
      return cover.file?.url || "";
    default:
      return "";
  }
}

/**
 * Extract media URL from Notion media object (image, video, file, etc.)
 * Returns URL string or empty string if no media
 */
export function extractMediaUrl(media: MediaData | null | undefined): string {
  if (!media) return "";

  // Some media objects have a direct url property
  if (media.url) return media.url;

  switch (media.type) {
    case "external":
      return media.external?.url || "";
    case "file":
      return media.file?.url || "";
    default:
      return "";
  }
}

/**
 * Safely convert date string to timestamp
 * Returns timestamp in milliseconds or 0 if invalid
 */
export function toTimestamp(dateString: string | null | undefined): number {
  if (!dateString) return 0;
  
  try {
    const timestamp = new Date(dateString).getTime();
    return isNaN(timestamp) ? 0 : timestamp;
  } catch {
    return 0;
  }
}

/**
 * Generate column ID for table
 */
export function generateColumnId(index: number, prefix: string = "col_"): string {
  return `${prefix}${index}`;
}

/**
 * Validate if a value is a valid Notion block object
 */
export function isValidBlock(block: any): boolean {
  return (
    block &&
    typeof block === "object" &&
    typeof block.id === "string" &&
    typeof block.type === "string" &&
    block.created_time &&
    block.last_edited_time
  );
}

/**
 * Validate if a value is a valid Notion page object
 */
export function isValidPage(page: any): boolean {
  return (
    page &&
    typeof page === "object" &&
    typeof page.id === "string" &&
    page.object === "page" &&
    page.created_time &&
    page.last_edited_time
  );
}
