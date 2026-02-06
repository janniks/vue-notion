<div align="center">
  <img src="https://github.com/janniks/vue-notion/raw/main/docs/img/vue-notion.png" alt="vue-notion" width="398px" />
  <p>An unofficial Notion renderer</p>
</div>

<h3 align="center">
  <a href="#features">Features</a>
  <span> · </span>
  <a href="#install">Install</a>
  <span> · </span>
  <a href="#docs">Docs</a>
  <span> · </span>
  <a href="#examples">Examples</a>
  <span> · </span>
  <a href="#credits">Credits</a>
</h3>

<p align="center">
  <a href="https://www.npmjs.org/package/vue-notion">
    <img src="https://img.shields.io/npm/v/vue-notion.svg" alt="Package version" />
  </a>
  <a href="https://www.npmjs.org/package/vue-notion">
    <img src="https://img.shields.io/bundlephobia/minzip/vue-notion" alt="Compressed size" />
  </a>
  <a href="https://github.com/janniks/vue-notion/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT license" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=janniksco">
    <img src="https://img.shields.io/twitter/url?label=Follow&style=social&url=https%3A%2F%2Ftwitter.com%2Fjanniksco" alt="Follow on Twitter" />
  </a>
</p>

---

## Features

🎯 **Accurate** – Results are _almost_ identical

🎨 **Custom Styles** – Styles are easily adaptable. Optional styles included

🔮 **Syntax-Highlighting** – Beautiful themeable code highlighting using Prism.js

🌎 **SSR / Static Generation Support** – Functions to work with NuxtJS and other frameworks

## Install

> **Warning**
> This is the documentation for the upcoming Vue 3 compatible release of vue-notion.
> For the Vue 2 version, check out the [vue2 branch](https://github.com/janniks/vue-notion/tree/vue2).

### Vue

```bash
npm install vue-notion
```

### NuxtJS Module

Check out the `/example` folder for a full working example using Nuxt 3.

## Docs

> **Note**
> Potentially outdated -- 3.0.0 docs are a work-in-progress

- `NotionRenderer`: [`docs/`](https://github.com/janniks/vue-notion/tree/main/docs#notionrenderer)
- Syntax-Highlighting in Code Blocks (with Prism.js): [`docs/`](https://github.com/janniks/vue-notion/tree/main/docs#syntax-highlighting)
- Notion API: [`docs/`](https://github.com/janniks/vue-notion/tree/main/docs#notion-api)
- Nuxt: [`docs/`](https://github.com/janniks/vue-notion/tree/main/docs#nuxtjs--server-side-rendering--static-site-generation)

> Check out a full working demo at [vue-notion.now.sh](https://vue-notion.now.sh/) ✨
> The code for the demo is in [`example/`](https://github.com/janniks/vue-notion/tree/main/example).

## Usage
You can use this package using two methods:

### 1. Official Notion API (Recommended)

The official Notion API is now publicly available and is the recommended approach for production applications.

**Getting Started:**

1. Get your API key from [Notion Integrations](https://www.notion.so/my-integrations)
2. Share your Notion page with the integration
3. Use `fetchNotionPage` to fetch and transform the page:

```js
import { fetchNotionPage } from 'vue-notion';

const blockMap = await fetchNotionPage(apiKey, pageId);
```

> **Note:** For security, API keys should be kept server-side. For a complete Nuxt setup guide with environment variables and server routes, check out the [example folder](https://github.com/janniks/vue-notion/tree/main/example) or visit the [live documentation](https://vue-notion.now.sh/official-api).

### 2. Quick Setup with getPageBlocks (Legacy)

For quick prototyping and client-side usage (no server required), you can use `getPageBlocks`:

```vue
<template>
  <NotionRenderer :blockMap="blockMap" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { NotionRenderer, getPageBlocks } from 'vue-notion';

const blockMap = ref(null);

onMounted(async () => {
  blockMap.value = await getPageBlocks('your-page-id');
});
</script>
```

The `getPageBlocks` method works directly in the browser without needing a backend server. It wraps the [notion-api-worker](https://github.com/splitbee/notion-api-worker), a shared Cloudflare worker with rate limits. For heavy usage, consider [hosting your own instance](https://github.com/splitbee/notion-api-worker#getting-started).

## Live Examples

These examples use a simple wrapper around the [`notion-api-worker`](https://github.com/splitbee/notion-api-worker) to access the Notion page data.
It is also possible to store a page received from the Notion API in `.json` and use it without the `async/await` part.

> Use the `getPageBlocks` and `getPageTable` methods with caution!
> They are based on the private Notion API.
> We can NOT guarantee that it will stay stable.
> The private API is warpped by [notion-api-worker](https://github.com/splitbee/notion-api-worker).
> If you use these methods a lot, please consider hosting you own instance, as described in [`docs#notion-api`](https://github.com/janniks/vue-notion/tree/main/docs#notion-api).

### Basic Example for Vue

This example is a part of [`example/`](https://github.com/janniks/vue-notion/tree/main/example) and is hosted at [vue-notion.now.sh/vue](https://vue-notion.now.sh/vue).

```vue
<template>
  <NotionRenderer :blockMap="blockMap" fullPage />
</template>

<script lang="ts">
import { NotionRenderer, getPageBlocks } from "vue-notion";

export default {
  components: { NotionRenderer },
  data: () => ({ blockMap: null }),
  async created() {
    // get Notion blocks from the API via a Notion pageId
    this.blockMap = await getPageBlocks("8c1ab01960b049f6a282dda64a94afc7");
  },
};
</script>

<style>
/* optional Notion-like styles */
@import "vue-notion/styles.css";
</style>
```

### Basic Example for NuxtJS

This example is a part of [`example/`](https://github.com/janniks/vue-notion/tree/main/example) and is hosted at [vue-notion.now.sh/nuxt](https://vue-notion.now.sh/nuxt).
The page assumes a Nuxt plugin in `~/plugins/vue-notion.js` that registers via the `useNuxtApp` hook.

```vue
<template>
  <NotionRenderer :blockMap="blockMap" fullPage />
</template>

<script lang="ts" setup>
const { $notion } = useNuxtApp();

// use Notion module to get Notion blocks from the API via a Notion pageId
const { data: blockMap } = useAsyncData("page_nuxt", () =>
  $notion.getPageBlocks("8c1ab01960b049f6a282dda64a94afc7")
);
</script>

<style>
@import "vue-notion/styles.css"; /* optional Notion-like styles */
</style>
```

## Sites using vue-notion 🌎

List of pages that are using this library.

- [HelpKit](https://www.helpkit.so) — Build Knowledge Bases in Notion
- [StorePreviewer](https://www.storepreviewer.com) — Preview and optimize your app store presence
- [Dominik Sobe's Personal Site](https://dominiksobe.com/)
- [Bersihin Tech](https://tech.bersihin.co/)
- [Wisata Diary](https://wisatabook.com/diary)
- [AymaneMx's Blog](https://aymanemx.com/posts/)
- [Notaku](https://notaku.website?ref=vue-notion) — Build docs and blog websites from Notion pages
- _...if you're using `vue-notion`, we'd be happy to feature you here_

## Supported Blocks

Most common block types are supported. We happily accept pull requests to add support for the missing blocks.

| Block Type        | Supported      | Notes                  |
| ----------------- | -------------- | ---------------------- |
| Text              | ✅ Yes         |                        |
| Heading           | ✅ Yes         |                        |
| Image             | ✅ Yes         |                        |
| Image Caption     | ✅ Yes         |                        |
| Bulleted List     | ✅ Yes         |                        |
| Numbered List     | ✅ Yes         |                        |
| Quote             | ✅ Yes         |                        |
| Callout           | ✅ Yes         |                        |
| Column            | ✅ Yes         |                        |
| iframe            | ✅ Yes         |                        |
| Video             | ✅ Yes         | Only embedded videos   |
| Divider           | ✅ Yes         |                        |
| Link              | ✅ Yes         |                        |
| Code              | ✅ Yes         |                        |
| Web Bookmark      | ✅ Yes         |                        |
| Toggle List       | ✅ Yes         |                        |
| Page Links        | ✅ Yes         |                        |
| Cover             | ✅ Yes         | Enable with `fullPage` |
| Equations         | ✅ Yes         |                        |
| Checkbox          | ✅ Yes         |                        |
| Simple Tables     | ✅ Yes         |                        |
| Databases         | ❌ Not planned |                        |
| Table Of Contents | ❌ Not planned |                        |

Please, feel free to [open an issue](https://github.com/janniks/vue-notion/issues/new) if you notice any important blocks missing or anything wrong with existing blocks.

## Credits

- [janniksco](https://twitter.com/janniksco) – vue-notion Code
- [Dominik Sobe](https://twitter.com/sobedominik) – vue-notion Inspiration, Debugging
- [vue-notion Contributors 💕](https://github.com/janniks/vue-notion/graphs/contributors)
- [Tobias Lins](https://tobi.sh) – react-notion Idea, Code
- [Timo Lins](https://timo.sh) – react-notion Code, Documentation
- [samwightt](https://github.com/samwightt) – react-notion Inspiration & API Typings
- [react-notion Contributors 💕](https://github.com/splitbee/react-notion/graphs/contributors)

* Big thanks to [NuxtJS](https://nuxtjs.org) for being awesome!

## License ⚖️

MIT © [janniksco](https://twitter.com/janniksco)
