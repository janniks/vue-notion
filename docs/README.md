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

## Server-Side Rendering & Static Generation (with Nuxt)

_coming soon..._

For the mean time check out the extensive example at [example/](/example).
