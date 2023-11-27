# tough-dev-school/vue-notion

This is a fork of [vue-notion](https://github.com/janniks/vue-notion).

It has building and publishing to npm removed, no dedicated nuxt support, and some new features and bugfixes:

- [x] Blocks have anchors
- [x] Table of Contents support added
- [x] Bug with empty callouts is fixed

## Usage

You can install it via

```bash
pnpm i https://github.com/tough-dev-school/vue-notion.git
```

And used via passing `blockMap` to `NotionRenderer` component. [See example in our LMS repo](https://github.com/tough-dev-school/lms-frontend-v2/blob/10e9e26a8401cb25989419ba042986f8ff785b24/src/views/VNotionView/VNotionView.vue).

Docs can be found [here](https://github.com/tough-dev-school/vue-notion/tree/main/docs).

## Credits

All credits to [Jannik Siebert and his vue-notion](https://github.com/janniks/vue-notion). And big thanks to [zernonia](https://github.com/zernonia/vue3-notion) for clever hacks we borrowed from his port.
