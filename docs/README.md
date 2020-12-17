# Docs

## vue-notion `NotionRenderer`

## Notion API

The official Notion API is currently in [private beta](https://www.notion.so/api-beta).
Until the public release the team at [Splitbee](https://splitbee.io/) has created [notion-api-worker](https://github.com/splitbee/notion-api-worker) to work with public pages.
The `getPageBlocks` and `getPageTable` methods do simple requests to their `https://notion-api.splitbee.io/v1` endpoint.
That means, every time you use the methods, a request is sent to the [notion-api-worker](https://github.com/splitbee/notion-api-worker).
The endpoint is rate limited, so please consider hosting your own instance (check the [notion-api-worker](https://github.com/splitbee/notion-api-worker) repository for more information).

A custom endpoint URL can be passed to the methods as a second argument:

```js
const blockMap = await getPageBlocks("PAGE_ID", "ENDPOINT_URL");
const pageTable = await getPageTable("PAGE_ID", "ENDPOINT_URL");
```

## Server-Side Rendering & Static Generation (with Nuxt)
