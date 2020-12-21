# Docs

## vue-notion `NotionRenderer`

_coming soon..._

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
  transpile: ["vue-notion"]
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
