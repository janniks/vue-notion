<template>
  <div class="container">
    <div class="content">
      <img src="https://github.com/janniks/vue-notion/raw/main/docs/img/vue-notion.png" alt="vue-notion" width="272px"
        class="logo" />
      <p>Using the Official Notion API</p>

      <h3 class="nav">
        <NuxtLink to="/">Home</NuxtLink>
        <span> · </span>
        <a target="_blank" href="https://developers.notion.com/">Official Notion API</a>
        <span> · </span>
        <a target="_blank" href="https://github.com/janniks/vue-notion#docs">Docs</a>
      </h3>

      <h2>Getting Started</h2>
      <div class="links">
        <p>The <a href="https://developers.notion.com/" target="_blank">official Notion API</a> is now publicly available!</p>
      </div>

      <div class="instructions">
        <div class="note">
          <p><strong>Note:</strong> This guide is Nuxt-focused. For plain Vue projects, you'll also need a backend server to fetch data because:</p>
          <ul>
            <li>API keys must remain secret (never expose them in client-side code)</li>
            <li>Notion API has CORS restrictions preventing direct browser calls</li>
          </ul>
        </div>
      </div>

      <h2>Setup Instructions</h2>
      
      <div class="instructions">
        <h3>1. Get Your Notion API Key</h3>
        <ul>
          <li>Go to <a href="https://www.notion.so/my-integrations" target="_blank">Notion Integrations</a></li>
          <li>Create a new integration and copy the API key</li>
          <li>Share your Notion page with the integration</li>
        </ul>

        <h3>2. Use the Transformer Function</h3>
        <p>vue-notion provides <code>fetchNotionPage</code> to fetch official API responses:</p>
        
        <pre><code>import { fetchNotionPage } from 'vue-notion';

const blockMap = await fetchNotionPage(apiKey, pageId);</code></pre>

        <p>This function fetches data from the official Notion API and automatically transforms the response into the format used by <code>NotionRenderer</code> component.</p>

        <h3>3. Configure Environment Variables (Nuxt)</h3>
        <p>Create a <code>.env</code> file in your project root with your Notion credentials:</p>
        
        <pre><code># .env
NUXT_NOTION_API_KEY=your_notion_api_key_here
NUXT_NOTION_PAGE_ID=your_page_id_here</code></pre>

        <p><strong>Finding your Page ID:</strong> The page ID is the 32-character string in your Notion page URL. For example, in <code>https://notion.so/My-Page-123abc...</code>, the ID is the string after the last dash. Learn more in the <a href="https://developers.notion.com/reference/retrieve-a-page" target="_blank">official Notion documentation</a>.</p>

        <p>Add the configuration to your <code>nuxt.config.ts</code>:</p>
        
        <pre><code>export default defineNuxtConfig({
  runtimeConfig: {
    notionApiKey: '', // Private (server-only)
    notionPageId: '', // Private (server-only)
  }
});</code></pre>

        <p>Learn more about <a href="https://nuxt.com/docs/guide/going-further/runtime-config#environment-variables" target="_blank">Nuxt runtime configuration</a>.</p>

        <h3>4. Server-Side Example (Nuxt API Route)</h3>
        <p>For security, keep your API key server-side. See <code>example/server/api/notion.ts</code>:</p>
        
        <pre><code>import { fetchNotionPage } from "vue-notion";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  
  const blockMap = await fetchNotionPage(
    config.notionApiKey, 
    config.notionPageId
  );
  
  return blockMap;
});</code></pre>

        <h3>5. Fetch and Render in Your Component</h3>
        <p>Use the API route from your Vue/Nuxt component:</p>
        
        <pre><code>&lt;template&gt;
  &lt;NotionRenderer :blockMap="blockMap" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { NotionRenderer } from 'vue-notion';

// Fetch from your API route
const { data: blockMap } = useFetch('/api/notion');
&lt;/script&gt;</code></pre>
      </div>

      <h2>Try It Out</h2>
      <div class="links">
        <NuxtLink class="button--green" to="/official-api/example">View Live Example</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.instructions {
  max-width: 700px;
  margin: 0 auto;
  text-align: left;
  padding: 1em 2em;
}

.instructions h3 {
  color: #333;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}

.instructions p {
  line-height: 1.7;
  color: #555;
  margin: 0.75em 0;
}

.instructions ul {
  line-height: 1.8;
  color: #555;
  list-style: disc;
  padding-left: 1.5rem;
  margin: 1em 0;
}

.instructions li {
  margin: 0.5em 0;
}

.instructions a {
  color: #3b8070;
  text-decoration: underline;
}

.instructions a:hover {
  color: #2d6359;
}

.instructions pre {
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.instructions code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
}

.instructions p code {
  background: #f5f5f5;
  color: #c7254e;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-size: 0.875em;
  border: 1px solid #e5e5e5;
}

.instructions .note {
  background: #e7f3ff;
  border-left: 4px solid #3b8070;
  padding: 1rem 1.25rem;
  margin: 1rem 0 2rem 0;
  color: #1a5a4a;
  border-radius: 4px;
}

.instructions .note ul {
  margin-top: 0.5rem;
  margin-bottom: 0;
}
</style>
