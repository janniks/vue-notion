/**
 * Default values and constants for Notion API transformation
 */

// Table formatting defaults
export const TABLE_DEFAULTS = {
  COLUMN_WIDTH: 200,
  COLUMN_PREFIX: "col_",
} as const;

// Video/Embed formatting defaults
export const VIDEO_DEFAULTS = {
  BLOCK_WIDTH: 1280,
  ASPECT_RATIO: 0.5625, // 16:9
  FULL_WIDTH: false,
  PAGE_WIDTH: true,
  PRESERVE_SCALE: true,
} as const;

// Image formatting defaults
export const IMAGE_DEFAULTS = {
  FULL_WIDTH: false,
  PAGE_WIDTH: true,
} as const;

// Column formatting defaults
export const COLUMN_DEFAULTS = {
  RATIO: 1,
} as const;

// Page cover defaults
export const PAGE_COVER_DEFAULTS = {
  POSITION: 0.5,
} as const;

// API pagination
export const API_DEFAULTS = {
  PAGE_SIZE: 100,
} as const;
