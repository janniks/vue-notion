<template>
  <div v-if="level === 0" class="notion">
    <!-- todo: add header -->
    <!-- <NotionPageHeader v-bind="passProps" /> -->
    <img
      class="notion-page-cover"
      :style="coverStyle"
      :alt="getTextContent(titles)"
      :src="mapImageUrl(format.page_cover, block)"
    />
    <main class="notion-page">
      <NotionPageIcon v-bind="passProps" big />
      <div class="notion-title">
        <NotionDecorator v-for="(t, i) in titles" :key="i" :content="t" />
      </div>
      <slot />
    </main>
  </div>
  <a v-else class="notion-page-link" :href="mapPageUrl(value.id)">
    <div class="notion-page-icon">
      <NotionPageIcon v-bind="passProps" />
    </div>
    <div class="notion-page-text">
      <NotionDecorator v-for="(t, i) in titles" :key="i" :content="t" />
    </div>
  </a>
</template>

<script>
import Blockable, { blockComputed } from "@/lib/blockable";
import NotionDecorator from "@/blocks/decorator";
import NotionPageHeader from "@/blocks/page-header";
import NotionPageIcon from "@/blocks/page-icon";

export default {
  extends: Blockable,
  name: "NotionPage",
  components: { NotionDecorator, NotionPageHeader, NotionPageIcon },
  computed: {
    ...blockComputed,
    coverStyle() {
      const coverPosition =
        (1 - (this.format.page_cover_position || 0.5)) * 100;
      return { objectPosition: `center ${coverPosition}%` };
    },
  },
};
</script>
