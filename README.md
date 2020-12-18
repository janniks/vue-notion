<div align="center">
  <img src="https://github.com/janniks/vue-notion/blob/main/docs/img/vue-notion.png" alt="vue-notion" width="384px" />
  <p>An unofficial Notion renderer</p>
</div>

<h3 align="center">
  <a href="#features">Features</a>
  <span> · </span>
  <a href="#install">Install</a>
  <span> · </span>
  <a href="#basic-example">Example</a>
  <span> · </span>
  <a href="#docs">Docs</a>
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
  <a href="https://twitter.com/intent/follow?screen_name=jnnksbrt">
    <img src="https://img.shields.io/twitter/url?label=Follow&style=social&url=https%3A%2F%2Ftwitter.com%2Fjnnksbrt" alt="Follow on Twitter" />
  </a>
</p>

---

A Vue renderer for Notion pages.
Use Notion as CMS for your blog, documentation or personal site.

vue-notion was ported to Vue from [react-notion](https://github.com/splitbee/react-notion) (developed by [Splitbee 🐝](https://splitbee.io/) – a fast, reliable, free, and modern analytics for any team)

This package doesn't handle the communication with the API. Check out [notion-api-worker](https://github.com/splitbee/notion-api-worker) from [Splitbee](https://splitbee.io/) for an easy solution.

<sub>Created by <a href="https://twitter.com/jnnksbrt">Jannik Siebert</a></sub>

## Features

🎯 **Accurate** – Results are _almost_ identical

🎨 **Custom Styles** – Styles are easily adaptable. Optional styles included

🌎 **SSR / Static Generation Support** – Functions to work with Nuxt and other frameworks

## Install

```bash
npm install vue-notion
```

## How To

### Docs

> Check out a demo at [vue-notion.now.sh](https://vue-notion.now.sh/) ✨

The full `NotionRenderer` specification and more information on the Notion API and integration with Nuxt can be found at [`docs/`](https://github.com/janniks/vue-notion/docs/).

### Basic Example

This example is hosted at [vue-notion.now.sh/basic-example](https://vue-notion.now.sh/basic-example).

```vue
<template>
  <NotionRenderer :blockMap="blockMap" fullPage />
</template>

<script>
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
@import "vue-notion/src/styles.css"; /* optional Notion-like styles */
</style>
```

The example above uses a simple wrapper around the [notion-api-worker](https://github.com/splitbee/notion-api-worker).
It is also possible to store and use plain `.json` objects received from the Notion API.

> ⚠️ Use with caution.
> The `getPageBlocks` and `getPageTable` are based on the private Notion API.
> We can not gurantee it will stay stable.
> The private API is warpped by [notion-api-worker](https://github.com/splitbee/notion-api-worker).
> If you use these methods a lot, please consider hosting you own instance, as described in [`docs#notion-api`](docs#notion-api).

A [full working example using Nuxt and static generation](https://vue-notion.now.sh/) can be found inside the `example` directory.

## Roadmap

[Add issues](https://github.com/janniks/vue-notion/issues/new), request features and upvote [block types](https://github.com/janniks/vue-notion/issues?q=is%3Aissue+is%3Aopen+label%3Ablock) that you want to see next!

## Sites using vue-notion

List of pages that are using this library.

- [StorePreviewer](https://www.storepreviewer.com)
- _...if you're using `vue-notion`, we'd be happy to feature you here_

## Supported Blocks

Most common block types are supported. We happily accept pull requests to add support for the missing blocks.

| Block Type        | Supported      | Notes                    |
| ----------------- | -------------- | ------------------------ |
| Text              | ✅ Yes         |                          |
| Heading           | ✅ Yes         |                          |
| Image             | ✅ Yes         |                          |
| Image Caption     | ✅ Yes         |                          |
| Bulleted List     | ✅ Yes         |                          |
| Numbered List     | ✅ Yes         |                          |
| Quote             | ✅ Yes         |                          |
| Callout           | ✅ Yes         |                          |
| Column            | ✅ Yes         |                          |
| iframe            | ✅ Yes         |                          |
| Video             | ✅ Yes         | Only embedded videos     |
| Divider           | ✅ Yes         |                          |
| Link              | ✅ Yes         |                          |
| Code              | ✅ Partially   | Highlighting coming soon |
| Web Bookmark      | ✅ Soon        |                          |
| Toggle List       | ✅ Yes         |                          |
| Page Links        | ✅ Yes         |                          |
| Header            | ✅ Yes         | Enable with `fullPage`   |
| Databases         | ❌ Not planned |                          |
| Checkbox          | ❌ Not planned |                          |
| Table Of Contents | ❌ Not planned |                          |

Please, feel free to [open an issue](https://github.com/janniks/vue-notion/issues/new) if you notice any missing blocks or anything wrong with existing blocks.

## Credits

- [Jannik Siebert](https://twitter.com/jnnksbrt) – vue-notion Code
- [Dominik Sobe](https://twitter.com/sobedominik) – vue-notion Inspiration, Debugging
- [Tobias Lins](https://tobi.sh) – react-notion Idea, Code
- [Timo Lins](https://timo.sh) – react-notion Code, Documentation
- [samwightt](https://github.com/samwightt) – react-notion Inspiration & API Typings
- [vue-notion Contributors 💕](https://github.com/janniks/vue-notion/graphs/contributors)
- [react-notion Contributors 💕](https://github.com/splitbee/react-notion/graphs/contributors)

## License ⚖️

MIT ©️ [Jannik Siebert](https://twitter.com/jnnksbrt)
