<template>
  <div v-if="level === 0 && fullPage" class="notion">
    <!-- todo: add header -->
    <!-- <NotionPageHeader v-if="!hideHeader" v-bind="pass" /> -->
    <!-- todo: hide image if no .format is available -->
    <img
      v-if="format && format.page_cover"
      class="notion-page-cover"
      :style="coverStyle"
      :alt="getTextContent(title)"
      :src="mapImageUrl(format.page_cover, block)"
    />
    <main
      :class="[
        'notion-page',
        format && !format.page_cover && 'notion-page-offset',
        format && format.page_full_width && 'notion-full-width',
        format && format.page_small_text && 'notion-small-text',
      ]"
    >
      <NotionPageIcon v-bind="pass" big />
      <div class="notion-title">
        <NotionTextRenderer :text="title" v-bind="pass" />
      </div>
      <slot />
    </main>
  </div>
  <main v-else-if="level === 0" class="notion"><slot /></main>
  <component
    v-else-if="hasPageLinkOptions"
    class="notion-page-link"
    v-bind="pageLinkProps(value.id)"
    :is="pageLinkOptions.component"
  >
    <div class="notion-page-icon">
      <NotionPageIcon v-bind="pass" />
    </div>
    <div class="notion-page-text">
      <NotionTextRenderer :text="title" v-bind="pass" />
    </div>
  </component>
  <a
    v-else
    class="notion-page-link"
    :target="pageLinkTarget"
    :href="mapPageUrl(value.id)"
  >
    <div class="notion-page-icon">
      <NotionPageIcon v-bind="pass" />
    </div>
    <div class="notion-page-text">
      <NotionTextRenderer :text="title" v-bind="pass" />
    </div>
  </a>
</template>

<script>
import { Blockable, blockComputed } from "@/lib/blockable";
import NotionPageHeader from "@/blocks/helpers/page-header";
import NotionPageIcon from "@/blocks/helpers/page-icon";
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
  },
};
</script>
