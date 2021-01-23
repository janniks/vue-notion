# Docs

- `NotionRenderer`: [`docs/`](https://github.com/janniks/vue-notion/tree/main/docs#notionrenderer)
- Syntax-Highlighting in Code Blocks (with Prism.js): [`docs/`](https://github.com/janniks/vue-notion/tree/main/docs#syntax-highlighting)
- Notion API: [`docs/`](https://github.com/janniks/vue-notion/tree/main/docs#notion-api)
- Nuxt: [`docs/`](https://github.com/janniks/vue-notion/tree/main/docs#nuxtjs--server-side-rendering--static-site-generation)

> Check out a full working demo at [vue-notion.now.sh](https://vue-notion.now.sh/) ✨
> The code for the demo is in [`example/`](https://github.com/janniks/vue-notion/tree/main/example).

## `NotionRenderer`

The `NotionRenderer` component offers a few properties

- [`blockMap`](#blockMap) – required
- [`contentId`](#contentId) – default: `undefined`
- [`fullPage`](#fullPage) – default: `false`
- [`hideList`](#hideList) – default: `[]`
- [`mapImageUrl`](#mapImageUrl) – default: `defaultMapImageUrl()`
- [`mapPageUrl`](#mapPageUrl) – default: `defaultMapPageUrl()`
- [`pageLinkOptions`](#pageLinkOptions) – default: `undefined`

### `blockMap`: Object

– the blocks part of a Notion API response.
A list of blocks by their id that may contain contents and properties.

### `contentId`: String

– the id of the block that should be rendered.
If this is `undefined` the _first_ block is rendered.
_Usually the first block contains the rest of the page._

### `fullPage`: Boolean

– wether or not the page should contain the cover and header.

### `hideList`: [String]

– a list of Notion blocks (e.g. `"callout"`) that should not be rendered.

### `mapImageUrl`: Function

– a function that receives `(imageUrl: String, block: Object)` and returns a `url: String` that should be used during rendering.
The default function resolves images as they are used in Notion.

> This function could be used to upload the Notion hosted images to an own provider and replace the image URLs with new ones.

### `mapPageUrl`: Function

– a function that receives `(pageId: String)` and returns a `url: String` that should be used during rendering.
The default function resolves pageIds relative to the current page root – i.e., `<pageId>` will become `/<pageId>`

e.g. if you're using vue-notion for blog posts at `/posts/<pageId>`

```js
mapPageUrl(pageId = "") {
  pageId = pageId.replace(/-/g, "");
  return `/posts/${pageId}`;
}
```

### `pageLinkOptions`: Object

– are used to override links to other Notion pages with custom Vue components.
`pageLinkOptions` is an `Object` that requires a `component` and a `href` parameter.

e.g., to use `NuxtLink` components instead of HTML `a` elements

```js
pageLinkOptions: {
  component: "NuxtLink",
  href: "to"
}
```

### `prism`: Boolean

– whether or not syntax-highlighting using Prims.js should be activated.

> Check the `docs#syntax-highlighting` section below for more details.

## Syntax-Highlighting

The following steps are required to add syntax-highlighting using Prism.js

- Install `prismjs` to your project – `npm install prismjs`
- Import the Prism.js css and a theme css somewhere in your application.

```js
import "prismjs";
import "prismjs/themes/prism.css";
```

- Add the `prism` flag to the `NotionRenderer`

```diff
-<NotionRenderer :blockMap="blockMap" />
+<NotionRenderer :blockMap="blockMap" prism />
```

> A list of available themes can be found at [prism/themes](https://github.com/PrismJS/prism/tree/master/themes) and more installable themes can be found at [prism-themes](https://github.com/PrismJS/prism-themes).

> ⚠️ To keep file size down, Prism.js only includes `markup`, `css`, `clike`, and `javascript` languages per default.
> To add supported languages import the language component from Prism.js – e.g. `import 'prismjs/components/prism-rust'` for `rust`.

## Notion API

The official Notion API is currently in [private beta](https://www.notion.so/api-beta).
Until the public release of the official API the team at [Splitbee](https://splitbee.io/) has created [notion-api-worker](https://github.com/splitbee/notion-api-worker).
This is a shared [Cloudflare worker](https://workers.cloudflare.com/) (with 100,000 requests a day).
The `getPageBlocks` and `getPageTable` methods simply run GET requests the worker.
That means, every time you use the methods, a request is sent to the [notion-api-worker](https://github.com/splitbee/notion-api-worker).
Since, the endpoint is rate limited, please consider hosting your own instance (check the [notion-api-worker](https://github.com/splitbee/notion-api-worker) repository for more information).

A custom endpoint URL can be passed to the methods as a second argument:

```js
const blockMap = await getPageBlocks("PAGE_ID", "ENDPOINT_URL");
const pageTable = await getPageTable("PAGE_ID", "ENDPOINT_URL");
```

> Feel free to open an issue if something is unclear or additional documentation is needed...

## NuxtJS – Server-Side Rendering & Static Site Generation

> For a running project check out the extensive example at [example/](/example).

### Usage

There are a few required steps to allow Nuxt to work with vue-notion

- Install vue-notion as a dev-dependency to your Nuxt project – `npm install vue-notion --save-dev`
- Add `"vue-notion/nuxt"` to the `buildModules` array in `nuxt.config.js`.

```js
// nuxt.config.js
export default {
  // ...
  buildModules: ["vue-notion/nuxt"],
};
```

- Voila, you can now use vue-notion (i.e., the `NotionRenderer` component and the Notion API methods via NuxtJS `$notion`) as shown in the examples.

### Static Pages

> Using the `nuxt.config.js` [`target`](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-target/) `"static"`

Per default Nuxt [crawls](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate/#crawler) your pages.
That means any link in any page in `pages/*.vue` is crawled and statically generated (if available).
You can also configure [specific routes](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate/#routes) to be crawled (and generated) via the `generate.routes` array in `nuxt.config.js`.

### Blogs

It is possible to use the `getPageTable` method to acces Notion Databases.
These can be used to maintain a list of pages with attributes.

The [example/](/example) shows a few ways you can access/filter/link these pages for a blog-style webpage.
