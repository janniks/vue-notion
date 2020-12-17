<template>
  <div v-if="level === 0" class="notion">
    <!-- todo: add header -->
    <!-- <NotionPageHeader v-bind="passProps" /> -->
    <!-- todo: hide image if no .format is available -->
    <img
      class="notion-page-cover"
      :style="format && coverStyle"
      :alt="getTextContent(title)"
      :src="format && mapImageUrl(format.page_cover, block)"
    />
    <main class="notion-page">
      <NotionPageIcon v-bind="passProps" big />
      <div class="notion-title">
        <NotionTextRenderer :title="title" />
      </div>
      <slot />
    </main>
  </div>
  <component
    v-else-if="hasPageLinkOptions"
    class="notion-page-link"
    v-bind="pageLinkProps"
    :is="pageLinkOptions.component"
  >
    <div class="notion-page-icon">
      <NotionPageIcon v-bind="passProps" />
    </div>
    <div class="notion-page-text">
      <NotionTextRenderer :title="title" />
    </div>
  </component>
  <a v-else class="notion-page-link" :href="mapPageUrl(value.id)">
    <div class="notion-page-icon">
      <NotionPageIcon v-bind="passProps" />
    </div>
    <div class="notion-page-text">
      <NotionTextRenderer :title="title" />
    </div>
  </a>
</template>

<script>
import Blockable, { blockComputed } from "@/lib/blockable";
import NotionPageHeader from "@/blocks/page-header";
import NotionPageIcon from "@/blocks/page-icon";
import NotionTextRenderer from "@/blocks/helpers/text-renderer";

export default {
  extends: Blockable,
  name: "NotionPage",
  components: { NotionPageHeader, NotionPageIcon, NotionTextRenderer },
  computed: {
    ...blockComputed,
    coverStyle() {
      const coverPosition =
        (1 - (this.format.page_cover_position || 0.5)) * 100;
      return { objectPosition: `center ${coverPosition}%` };
    },
    hasPageLinkOptions() {
      return this.pageLinkOptions?.component && this.pageLinkOptions?.href;
    },
    pageLinkProps() {
      return { [this.pageLinkOptions.href]: this.mapPageUrl(this.value.id) };
    },
  },
};
</script>
