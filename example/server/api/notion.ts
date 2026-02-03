import { Client } from "@notionhq/client";
import { fetchNotionPage } from "vue-notion";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  // Get blockMap in the format expected by NotionRenderer
  const blockMap = await fetchNotionPage(config.notionApiKey, config.notionPageId);

  return blockMap;
});
