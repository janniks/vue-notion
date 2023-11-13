# Docs

- `NotionRenderer`: [`docs/`](https://github.com/janniks/vue-notion/tree/main/docs#notionrenderer)
- Syntax-Highlighting in Code Blocks (with Prism.js): [`docs/`](https://github.com/janniks/vue-notion/tree/main/docs#syntax-highlighting)
- Equations: [`docs/`](https://github.com/janniks/vue-notion/tree/main/docs#equations)
- Notion API: [`docs/`](https://github.com/janniks/vue-notion/tree/main/docs#notion-api)

## `NotionRenderer`

The `NotionRenderer` component offers a few properties

- [`blockMap`](#blockMap) – required
- [`blockOverrides`](#blockOverrides) – default: `{}`
- [`contentId`](#contentId) – default: `undefined`
- [`embedAllow`](#embedAllow) – default: `"fullscreen"`
- [`fullPage`](#fullPage) – default: `false`
- [`hideList`](#hideList) – default: `[]`
- [`imageOptions`](#imageOptions) – default: `undefined`
- [`mapImageUrl`](#mapImageUrl) – default: `defaultMapImageUrl()`
- [`mapPageUrl`](#mapPageUrl) – default: `defaultMapPageUrl()`
- [`pageLinkOptions`](#pageLinkOptions) – default: `undefined`
- [`pageLinkTarget`](#pageLinkTarget) – default: `"_self"`
- [`prism`](#prism) – default: `false`
- [`katex`](#katex) – default: `false`
- [`textLinkTarget`](#textLinkTarget) – default: `"_blank"`

### `blockMap`: Object

– the blocks part of a Notion API response.
A list of blocks by their id that may contain contents and properties.

### `blockOverrides`: Object

– the Notion blocks that should be overriden by custom registered Vue components.
A key-value pair Object of Notion block names to Vue component names.

e.g. to use a custom `code` component—after registering the `CustomCode` Vue component—add the following override, as seen in the `/example`

```js
blockOverrides: {
  code: "CustomCode",
}
```

### `contentId`: String

– the id of the block that should be rendered.
If this is `undefined` the _first_ block is rendered.
_Usually the first block contains the rest of the page._

### `embedAllow`: String

– the [`allow` feature policy](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-allow) for embedded `<iframe>`s (e.g. YouTube videos).
The default allows embeds to enter fullscreen.

### `fullPage`: Boolean

– wether or not the page should contain the cover and header.

### `hideList`: [String]

– a list of Notion blocks (e.g. `"callout"`) that should not be rendered.

### `imageOptions`: Object

– are used to override default image rendering.
`imageOptions` is an `Object` that requires a `component` parameter.
The `src` attribute is optional and defaults to `src`.
Any additional key value pairs are spread onto the component as element attributes.

e.g. to use `nuxt-img` components instead of HTML `img` elements

```js
imageOptions: {
  component: "nuxt-img",
  "some-attribute": "vue-notion-attr",
  // src: 'src', // (default) can be overridden to customize the key of the `src` attribute
}
```

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
`pageLinkOptions` is an `Object` that requires a `component` parameter.
The `href` attribute is optional and defaults to `href`.

e.g., to use `NuxtLink` components instead of HTML `a` elements

```js
pageLinkOptions: {
  component: "NuxtLink",
  href: "to"
}
```

### `pageLinkTarget`: String

– the [target attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target) of links referencing other pages (skipped for pages with `pageLinkeOptions`)

### `prism`: Boolean

– whether or not syntax-highlighting using Prims.js should be activated.

> Check the `docs#syntax-highlighting` section below for more details.

### `katex`: Boolean

– whether or not latex rendering using vue-katex should be activated.

> Check the `docs#equations` section below for more details.

### `textLinkTarget`: String

– the [target attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target) of links

## Syntax-Highlighting

The following steps are required to add syntax-highlighting using Prism.js

- Install `prismjs` to your project – `npm install prismjs`
- Import the Prism.js css and a theme css somewhere in your application.

```js
import 'prismjs';
import 'prismjs/themes/prism.css';
```

- Add the `prism` flag to the `NotionRenderer`

```diff
-<NotionRenderer :blockMap="blockMap" />
+<NotionRenderer :blockMap="blockMap" prism />
```

> A list of available themes can be found at [prism/themes](https://github.com/PrismJS/prism/tree/master/themes) and more installable themes can be found at [prism-themes](https://github.com/PrismJS/prism-themes).

> ⚠️ To keep file size down, Prism.js only includes `markup`, `css`, `clike`, and `javascript` languages per default.
> To add supported languages import the language component from Prism.js – e.g. `import 'prismjs/components/prism-rust'` for `rust`.

## Equations

The following steps are required to display equations via katex

- Install `@hsorby/vue3-katex` to your project – `npm install @hsorby/vue3-katex`
- Import the katex css in your project

```js
import 'katex/dist/katex.min.css';
```

- Install the Vue plugin globally

```js
import Vue from 'vue';
import Vue3Katex from '@hsorby/vue3-katex';
Vue.use(Vue3Katex);
```

- Add the `katex` flag to the `NotionRenderer`

```diff
-<NotionRenderer :blockMap="blockMap" />
+<NotionRenderer :blockMap="blockMap" katex />
```

> For usage with Nuxt, look at the `/example` (`plugins` in `nuxt.config.js`, `plugins/vue-katex.js`)

## Notion API

The official Notion API is currently in [private beta](https://www.notion.so/api-beta).
Until the public release of the official API the team at [Splitbee](https://splitbee.io/) has created [notion-api-worker](https://github.com/splitbee/notion-api-worker).
This is a shared [Cloudflare worker](https://workers.cloudflare.com/) (with 100,000 requests a day).
The `getPageBlocks` and `getPageTable` methods simply run GET requests the worker.
That means, every time you use the methods, a request is sent to the [notion-api-worker](https://github.com/splitbee/notion-api-worker).
Since, the endpoint is rate limited, please consider hosting your own instance (check the [notion-api-worker](https://github.com/splitbee/notion-api-worker) repository for more information).

A custom endpoint URL can be passed to the methods as a second argument:

```js
const blockMap = await getPageBlocks('PAGE_ID', 'optional ENDPOINT_URL');
const pageTable = await getPageTable('PAGE_ID', 'optional ENDPOINT_URL');
```

> Feel free to open an issue if something is unclear or additional documentation is needed...
