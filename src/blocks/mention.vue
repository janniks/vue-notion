<template>
  <a :href="mention.href" class="notion-text-mention">
    <img class="notion-text-mention-icon" :src="mention.icon_url" />
    <span class="notion-text-mention-title">{{ mention.title }}</span>
  </a>
</template>

<!-- EXAMPLE -->
<!-- {
  "href": "https://www.helpkit.so/",
  "title": "HelpKit – Build your Knowledge Base with the ease of Notion",
  "icon_url": "https://www.helpkit.so/favicons/apple-touch-icon.png",
  "description": "Turn your Notion docs into a hosted self-service help center or documentation site for your customers – no code required. Get started for free! HelpKit is super fast, has widgets and much more.",
  "thumbnail_url": "https://firebasestorage.googleapis.com/v0/b/seven-deg-labs.appspot.com/o/helpkit_meta.png?alt=media&token=31d7a4c0-1f3a-4b69-9f04-085a425c34a7"
}
 -->
<!-- <a href="https://www.helpkit.so/" class="notion-link-mention-token notion-text-mention-token notion-focusable-token notion-enable-hover" data-token-index="0" contenteditable="false" tabindex="0" target="_blank" style="color:inherit;text-decoration:inherit;cursor:pointer" rel="noopener noreferrer"><img style="width:1.2em;height:1.2em;border-radius:3px;vertical-align:-0.15em;margin-right:0.3em" src="https://www.helpkit.so/favicons/apple-touch-icon.png"><span class=""><span style="border-bottom:0.05em solid solid rgba(55, 55, 55, 1);font-weight:500;flex-shrink:0">HelpKit – Build your Knowledge Base with the ease of Notion</span></span></a> -->

<script>
import { Blockable, blockComputed, blockProps } from "@/lib/blockable";
import NotionCode from "@/blocks/code";

export default {
  extends: Blockable,
  name: "NotionMention",
  props: { ...blockProps, mention: Object },
  computed: {
    ...blockComputed,
  },
};
</script>
