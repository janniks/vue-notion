# Docs

## vue-notion `NotionRenderer`

The `NotionRenderer` component offers a few properties

- [`blockMap`](#blockMap) – required
- [`contentId`](#contentId) – default: `undefined`
- [`fullPage`](#fullPage) – default: `false`
- [`hideList`](#hideList) – default: `[]`
- [`mapImageUrl`](#mapImageUrl) – default: `defaultMapImageUrl()`
- [`mapPageUrl`](#mapPageUrl) – default: `defaultMapPageUrl()`
- [`pageLinkOptions`](#pageLinkOptions) – default: `undefined`

### `blockMap`

– the blocks part of a Notion API response.
A list of blocks by their id that may contain contents and properties.

### `contentId`

– the id of the block that should be rendered.
If this is `undefined` the _first_ block is rendered.
_Usually the first block contains the rest of the page._

### `fullPage`

– wether or not the page should contain the cover and header.

### `hideList`

– a list of Notion blocks (e.g. `"callout"`) that should not be rendered.

### `mapImageUrl`

– a method that receives `(imageUrl: String, block: Object)` and returns a `url: String` that should be used during rendering.
The default method resolves images as they are used in Notion.

> This method could be used to upload the Notion hosted images to an own provider and replace the image URLs with new ones.

### `mapPageUrl`

– a method that receives `(pageId: String)` and returns a `url: String` that should be used during rendering.
The default method resolves pageIds relative to the current page root – i.e., `<pageId>` will become `/<pageId>`

e.g. if you're using vue-notion for blog posts at `/posts/<pageId>`

```js
mapPageUrl(pageId = "") {
  pageId = pageId.replace(/-/g, "");
  return `/posts/${pageId}`;
}
```

### `pageLinkOptions`

– are used to override links to other Notion pages with custom Vue components.
`pageLinkOptions` is an `Object` that requires a `component` and a `href` parameter.

e.g. to use `NuxtLink` components instead of HTML `a` elements

```js
pageLinkOptions: {
  component: "NuxtLink",
  href: "to"
}
```

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

## Nuxt – Server-Side Rendering & Static Site Generation

> For a running project check out the extensive example at [example/](/example).

### Usage

There are a few required steps to allow Nuxt to work with vue-notion

- Install vue-notion as a dependency to your Nuxt project – `npm install vue-notion`
- Add `"vue-notion"` to the `build.transpile` array in `nuxt.config.js`.

```js
build: {
  transpile: ["vue-notion"];
}
```

- Import the `NotionRenderer` in any component you want to use vue-notion in – `import { NotionRenderer } from "vue-notion"`
- Voila, you can now use vue-notion as shown in the examples.

### Static Pages

> Using the `nuxt.config.js` [`target`](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-target/) `"static"`

Per default Nuxt [crawls](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate/#crawler) your pages.
That means any link in any page in `pages/*.vue` is crawled and statically generated (if available).
You can also configure [specific routes](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate/#routes) to be crawled (and generated) via the `generate.routes` array in `nuxt.config.js`.

### Blogs

It is possible to use the `getPageTable` method to acces Notion Databases.
These can be used to maintain a list of pages with attributes.

The [example/](/example) shows a few ways you can access/filter/link these pages for a blog-style webpage.
