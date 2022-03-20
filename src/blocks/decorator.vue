<template>
  <component
    v-if="isPageLink && hasPageLinkOptions"
    class="notion-link"
    v-bind="pageLinkProps(decoratorValue)"
    :is="pageLinkOptions.component"
  >
    {{ pageLinkTitle }}
  </component>
  <a
    v-else-if="isPageLink"
    class="notion-link"
    :target="pageLinkTarget"
    :href="mapPageUrl(decoratorValue)"
    >{{ pageLinkTitle }}</a
  >
  <component
    v-else-if="decoratorKey === 'a' && hasPageLinkOptions && isInlinePageLink"
    class="notion-link"
    v-bind="pageLinkProps(decoratorValue.slice(1))"
    :is="pageLinkOptions.component"
  >
    <NotionDecorator :content="nextContent" v-bind="pass" />
  </component>
  <a
    v-else-if="decoratorKey === 'a' && isInlinePageLink"
    class="notion-link"
    :target="target"
    :href="mapPageUrl(decoratorValue.slice(1))"
  >
    <NotionDecorator :content="nextContent" v-bind="pass" />
  </a>
  <a
    v-else-if="decoratorKey === 'a'"
    class="notion-link"
    :target="target"
    :href="decoratorValue"
  >
    <NotionDecorator :content="nextContent" v-bind="pass" />
  </a>
  <span v-else-if="decorators.length === 0">{{ text }}</span>
  <span v-else-if="decoratorKey === 'h'" :class="'notion-' + decoratorValue"
    ><NotionDecorator :content="nextContent" v-bind="pass" />
  </span>
  <code v-else-if="decoratorKey === 'c'" class="notion-inline-code">
    <NotionDecorator :content="nextContent" v-bind="pass" />
  </code>
  <b v-else-if="decoratorKey === 'b'">
    <NotionDecorator :content="nextContent" v-bind="pass" />
  </b>
  <em v-else-if="decoratorKey === 'i'">
    <NotionDecorator :content="nextContent" v-bind="pass" />
  </em>
  <s v-else-if="decoratorKey === 's'">
    <NotionDecorator :content="nextContent" v-bind="pass" />
  </s>
  <component
    v-else-if="decoratorKey === 'e' && katex"
    :is="'katex-element'"
    :expression="decoratorValue"
  />
  <code v-else-if="decoratorKey === 'e'" class="notion-inline-code">
    {{ decoratorValue }}
  </code>
  <NotionDecorator v-else :content="nextContent" v-bind="pass" />
</template>

<script>
import { Blockable, blockProps } from "@/lib/blockable";

export default {
  extends: Blockable,
  name: "NotionDecorator",
  props: { ...blockProps, content: Array },
  computed: {
    text() {
      return this.content?.[0];
    },
    decorators() {
      return this.content?.[1] || [];
    },
    decoratorKey() {
      return this.decorators?.[0]?.[0];
    },
    decoratorValue() {
      return this.decorators?.[0]?.[1];
    },
    unappliedDecorators() {
      const clonedDecorators = JSON.parse(
        JSON.stringify(this.decorators || [])
      );
      clonedDecorators.shift(); // remove applied decorator
      return clonedDecorators;
    },
    nextContent() {
      return [this.text, this.unappliedDecorators];
    },
    isPageLink() {
      return this.text === "‣";
    },
    isInlinePageLink() {
      return this.decoratorValue && this.decoratorValue[0] === "/";
    },
    pageLinkTitle() {
      return (
        this.blockMap?.[this.decoratorValue]?.value?.properties
          ?.title?.[0]?.[0] || "link"
      );
    },
    target() {
      if (this.type === "page") {
        return this.pageLinkTarget;
      }
      return this.textLinkTarget;
    },
  },
};
</script>
