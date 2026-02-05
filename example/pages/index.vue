<template>
  <div class="container">
    <div class="content">
      <img src="https://github.com/janniks/vue-notion/raw/main/docs/img/vue-notion.png" alt="vue-notion" width="272px"
        class="logo" />
      <p>An unofficial Notion renderer</p>

      <h3 class="nav">
        <a target="_blank" href="https://github.com/janniks/vue-notion#features">Features</a>
        <span> · </span>
        <a target="_blank" href="https://github.com/janniks/vue-notion#install">Install</a>
        <span> · </span>
        <a target="_blank" href="https://github.com/janniks/vue-notion#basic-example">Example</a>
        <span> · </span>
        <a target="_blank" href="https://github.com/janniks/vue-notion#docs">Docs</a>
        <span> · </span>
        <a target="_blank" href="https://github.com/janniks/vue-notion#credits">Credits</a>
      </h3>

      <h2>Features</h2>
      <div class="instructions">
        <div class="features">
          <div class="feature">
            <span class="feature-icon">🎯</span>
            <div>
              <strong>Accurate</strong> – Results are <em>almost</em> identical to Notion
            </div>
          </div>
          <div class="feature">
            <span class="feature-icon">🎨</span>
            <div>
              <strong>Custom Styles</strong> – Styles are easily adaptable. Optional styles included
            </div>
          </div>
          <div class="feature">
            <span class="feature-icon">🔮</span>
            <div>
              <strong>Syntax-Highlighting</strong> – Beautiful themeable code highlighting using Prism.js
            </div>
          </div>
          <div class="feature">
            <span class="feature-icon">🌎</span>
            <div>
              <strong>SSR / Static Generation Support</strong> – Functions to work with NuxtJS and other frameworks
            </div>
          </div>
        </div>
      </div>

      <h2>Installation</h2>
      <div class="instructions">
        <pre><code>npm install vue-notion</code></pre>
      </div>

      <h2>Usage with Vue</h2>
      <div class="instructions">

                <p class="note" style="margin-top: 1rem;">
          <strong>Note:</strong> For the official Notion API (beta), see our 
          <NuxtLink to="/official-api" style="color: #3b8070; text-decoration: underline; font-weight: 600;">complete setup guide</NuxtLink>.
        </p>
        
        
        <p>Here's a complete example of using vue-notion in a Vue component:</p>
        
        <pre><code>&lt;template&gt;
  &lt;NotionRenderer :blockMap="blockMap" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { NotionRenderer, getPageBlocks } from "vue-notion";

export default {
  components: { NotionRenderer },
  data: () => ({ blockMap: null }),
  async created() {
    // get Notion blocks from the API via a Notion pageId
    this.blockMap = await getPageBlocks("8c1ab01960b049f6a282dda64a94afc7");
  },
};
&lt;/script&gt;</code></pre>

        <div class="method" style="margin-top: 1rem;">
          <p style="font-size: 0.9rem;">
            The <code style="background: #f5f5f5; padding: 0.2rem 0.4rem; border-radius: 3px;">getPageBlocks</code> 
            method wraps the <a href="https://github.com/splitbee/notion-api-worker" target="_blank" style="color: #3b8070;">notion-api-worker</a>. 
            This is a shared Cloudflare worker with rate limits. For heavy usage, consider 
            <a href="https://github.com/splitbee/notion-api-worker#getting-started" target="_blank" style="color: #3b8070;">hosting your own instance</a>.
          </p>
        </div>

        <div class="button-container">
          <NuxtLink class="button--green" to="/vue">View Live Example →</NuxtLink>
        </div>
      </div>

      <h2>Getting Started with Nuxt</h2>
      <div class="instructions">
        <p>For Nuxt projects, we recommend using the official Notion API with server-side fetching.</p>
        <div class="button-container">
          <NuxtLink class="button--green" to="/official-api">View Complete Nuxt Guide →</NuxtLink>
        </div>
      </div>

      <h2>Static Generated Examples</h2>
      <div class="links">
        <p>Blog-style examples using Notion as a CMS for Nuxt:</p>
        <div class="links">
          <NuxtLink class="button--green" to="/posts">All Blog Posts</NuxtLink>
          <NuxtLink class="button--green" to="/example">
            Post via slug <i>(e.g. /example)</i>
          </NuxtLink>
        </div>
      </div>

      <h2>Notion Playground Pages</h2>
      <div class="links">
        <NuxtLink class="button--grey" to="/2e22de6b770e4166be301490f6ffd420">
          react-notion tester
        </NuxtLink>
        <NuxtLink class="button--grey" to="/067dd719a912471ea9a3ac10710e7fdf">
          react-notion-x tester
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<style scoped>
.instructions {
  max-width: 700px;
  margin: 0 auto;
  text-align: left;
  padding: 0 2em;
}

.instructions pre {
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  overflow-x: auto;
  margin: 1rem 0;
  text-align: left;
}

.instructions code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
  color: #333;
}

.instructions p {
  margin: 0.75em 0;
  color: #555;
  line-height: 1.6;
  text-align: left;
}

.instructions ul {
  text-align: left;
  margin: 0.5rem 0 1rem 1.5rem;
  color: #555;
  line-height: 1.7;
}

.instructions li {
  margin: 0.4em 0;
}

.method {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 1rem 1.5rem;
  margin: 1rem 0;
  text-align: left;
}

.method h3 {
  color: #333;
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.method ul {
  margin: 0.5rem 0 0 0rem;
}

.button-container {
  text-align: center;
  margin-top: 1rem;
}

.instructions .button--green {
  display: inline-block;
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

.features {
  display: grid;
  gap: 1rem;
  margin: 1rem 0;
}

.feature {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  text-align: left;
}

.feature-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.feature strong {
  color: #333;
}

.feature em {
  font-style: italic;
}
</style>