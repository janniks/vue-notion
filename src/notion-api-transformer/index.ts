import { Client } from "@notionhq/client";
import { transformBlock, postProcessTableRows } from "./block";
import { transformPage } from "./page";
import { API_DEFAULTS } from "./lib/constants";
import { type BlockMap } from "./lib/types";
import { isValidBlock, isValidPage } from "./lib/utils";

export * from "./lib/types";
export * from "./rich-text";
export * from "./embed";
export * from "./properties";
export * from "./format";
export * from "./block";
export * from "./page";
export * from "./lib/constants";
export * from "./lib/utils";

/**
 * Recursively fetch all blocks and their children
 */
async function fetchAllBlocks(
  notion: Client,
  blockId: string,
  blockMap: Record<string, any> = {},
  parentChildMap: Map<string, string[]> = new Map()
): Promise<Record<string, any>> {
  let cursor: string | undefined = undefined;
  const childIds: string[] = [];

  do {
    const response: any = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: API_DEFAULTS.PAGE_SIZE,
    });

    for (const block of response.results) {
      if (!isValidBlock(block)) {
        console.warn(`Invalid block encountered: ${block?.id || 'unknown'}`);
        continue;
      }

      childIds.push(block.id);

      // If block has children, fetch them recursively
      if (block.has_children) {
        await fetchAllBlocks(notion, block.id, blockMap, parentChildMap);
      }

      // Get grandchild IDs from the map (O(1) lookup instead of O(n) filter)
      const grandchildIds = parentChildMap.get(block.id) || [];

      // Transform and store the block
      blockMap[block.id] = transformBlock(block, grandchildIds);
    }

    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);

  // Store the parent-child relationship for this block
  parentChildMap.set(blockId, childIds);

  return blockMap;
}

/**
 * Fetch a Notion page and all its blocks, transformed to legacy format
 * @param apiKey - Notion API integration token
 * @param pageId - The ID of the Notion page to fetch
 * @returns A BlockMap containing the page and all nested blocks
 */
export async function fetchNotionPage(apiKey: string, pageId: string): Promise<BlockMap> {
  try {
    const notion = new Client({
      auth: apiKey
    });
    
    const page = await notion.pages.retrieve({ page_id: pageId });

    if (!isValidPage(page)) {
      throw new Error(`Invalid page object returned for ID: ${pageId}`);
    }

    const blockMap: Record<string, any> = {};
    const parentChildMap = new Map<string, string[]>();
    
    blockMap[pageId] = transformPage(page);

    // Fetch all blocks recursively with optimized parent-child tracking
    await fetchAllBlocks(notion, pageId, blockMap, parentChildMap);

    // Get direct child IDs from the map (O(1) lookup)
    const directChildIds = parentChildMap.get(pageId) || [];
    blockMap[pageId].value.content = directChildIds;

    // Post-process table rows to map cells to column IDs
    postProcessTableRows(blockMap);

    return blockMap;
  } catch (error) {
    console.error(`Error fetching Notion block ${pageId}:`, error);
    throw error;
  }
}
