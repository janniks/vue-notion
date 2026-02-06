import { typeMap } from "./lib/types";
import { extractProperties } from "./properties";
import { extractFormat } from "./format";
import { toTimestamp } from "./lib/utils";

/**
 * Get parent info from block
 */
export function getParentId(block: any): string {
  if (!block.parent) return "";

  switch (block.parent.type) {
    case "page_id":
      return block.parent.page_id;
    case "block_id":
      return block.parent.block_id;
    case "database_id":
      return block.parent.database_id;
    case "workspace":
      return "workspace";
    default:
      return "";
  }
}

/**
 * Transform a single block to old format
 */
export function transformBlock(block: any, childIds: string[] = []): any {
  if (!block || typeof block !== "object") {
    throw new Error("Invalid block object provided");
  }

  const legacyType = typeMap[block.type] || block.type;

  return {
    value: {
      id: block.id,
      type: legacyType,
      parent_id: getParentId(block),
      parent_table: block.parent?.type === "page_id" ? "block" : "block",
      created_time: toTimestamp(block.created_time),
      last_edited_time: toTimestamp(block.last_edited_time),
      alive: !block.archived,
      properties: extractProperties(block),
      format: extractFormat(block),
      content: childIds.length > 0 ? childIds : undefined,
    },
  };
}

/**
 * Post-process table rows to map cells to column IDs
 */
export function postProcessTableRows(blockMap: Record<string, any>): void {
  // Find all table blocks and their column orders
  const tableColumnOrders: Record<string, string[]> = {};
  
  for (const [blockId, block] of Object.entries(blockMap)) {
    if (block?.value?.type === "table") {
      tableColumnOrders[blockId] = block.value.format?.table_block_column_order || [];
    }
  }

  // Process table_row blocks
  for (const [blockId, block] of Object.entries(blockMap)) {
    if (block?.value?.type === "table_row") {
      const parentId = block.value.parent_id;
      const columnOrder = tableColumnOrders[parentId] || [];
      const cells = block.value.properties?._cells || [];

      const newProperties: Record<string, any> = {};
      cells.forEach((cell: any, index: number) => {
        const columnId = columnOrder[index] || `col_${index}`;
        newProperties[columnId] = cell;
      });

      block.value.properties = newProperties;
    }
  }
}
