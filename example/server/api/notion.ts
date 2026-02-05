import { Client } from "@notionhq/client";
import { fetchNotionPage } from "vue-notion";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  // Check if API key and page ID are configured
  if (!config.notionApiKey || !config.notionPageId) {
    throw createError({
      statusCode: 500,
      statusMessage: "Notion API Configuration Missing",
      message: `
        Please configure your Notion API credentials:
        
        1. Create a .env file in the project root with:
           NUXT_NOTION_API_KEY=your_api_key_here
           NUXT_NOTION_PAGE_ID=your_page_id_here
        
        2. Get your API key from: https://www.notion.so/my-integrations
        
        3. Share your Notion page with the integration
        
        4. Find your page ID in the Notion page URL
        
        Missing: ${!config.notionApiKey ? 'API Key' : ''} ${!config.notionPageId ? 'Page ID' : ''}
      `.trim()
    });
  }

  // Get blockMap in the format expected by NotionRenderer
  const blockMap = await fetchNotionPage(config.notionApiKey, config.notionPageId);

  return blockMap;
});
