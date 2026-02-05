<template>
  <div id="app">
    <div v-if="error" class="error-container">
      <div class="error-box">
        <h2>⚠️ Configuration Error</h2>
        <p class="error-message">{{ error.message || error.statusMessage }}</p>
        <div class="error-details">
          <p><strong>To fix this:</strong></p>
          <ol>
            <li>Create a <code>.env</code> file in the example folder</li>
            <li>Add your Notion API credentials:
              <pre>NUXT_NOTION_API_KEY=your_api_key_here
NUXT_NOTION_PAGE_ID=your_page_id_here</pre>
            </li>
            <li>Get your API key from <a href="https://www.notion.so/my-integrations" target="_blank">Notion Integrations</a></li>
            <li>Share your Notion page with the integration</li>
          </ol>
          <NuxtLink to="/official-api" class="back-link">← Back to Setup Guide</NuxtLink>
        </div>
      </div>
    </div>
    <div v-else-if="!blockMap" class="loading">Loading page...</div>
    <NotionRenderer v-else :blockMap="blockMap" fullPage prism />
  </div>
</template>

<script setup>
const { data: blockMap, error } = useFetch("/api/notion", {
  method: "GET",
});
</script>

<style>
@import "vue-notion/styles.css";

body {
  margin: 0;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.2rem;
  color: #666;
}

.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background: #fafafa;
}

.error-box {
  max-width: 700px;
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-align: left;
}

.error-box h2 {
  color: #333;
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.75rem;
}

.error-message {
  background: #fff3cd;
  border-left: 4px solid #f59e0b;
  padding: 1rem 1.25rem;
  color: #92400e;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.7;
  white-space: pre-line;
  border-radius: 4px;
}

.error-details {
  background: #fafafa;
  border-radius: 4px;
  padding: 1.5rem;
  margin-top: 1rem;
}

.error-details p {
  margin: 0 0 0.75rem 0;
  color: #333;
  line-height: 1.7;
}

.error-details ol {
  margin: 0.5rem 0 1rem 1.5rem;
  color: #555;
  line-height: 1.8;
}

.error-details li {
  margin: 0.5rem 0;
}

.error-details code {
  background: #f5f5f5;
  color: #c7254e;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-size: 0.875em;
  border: 1px solid #e5e5e5;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.error-details pre {
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  overflow-x: auto;
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: #333;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.error-details a {
  color: #3b8070;
  text-decoration: underline;
}

.error-details a:hover {
  color: #2d6359;
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #3b8070;
  color: white !important;
  text-decoration: none !important;
  border-radius: 4px;
  transition: background 0.2s;
  font-weight: 500;
}

.back-link:hover {
  background: #2d6359;
}
</style>
