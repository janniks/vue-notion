<template>
  <a
    v-if="isPageLink"
    class="notion-link"
    target="_blank"
    :href="decoratorValue"
    >{{ pageLinkTitle }}
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
  <a
    v-else-if="decoratorKey === 'a'"
    class="notion-link"
    target="_blank"
    :href="decoratorValue"
  >
    <NotionDecorator :content="nextContent" v-bind="pass" />
  </a>
  <span
    v-else-if="decoratorKey === 'e'"
    v-html="inlineEquation"
  />
  <NotionDecorator v-else :content="nextContent" v-bind="pass" />
</template>

<script>
import Blockable, { blockProps } from "@/lib/blockable";
import katex from 'katex';
import 'katex/dist/katex.css';

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
    inlineEquation() {
      return katex.renderToString(this.decoratorValue, {
        throwOnError: false,
      });
    },
    pageLinkTitle() {
      return (
        this.blockMap?.[this.decoratorValue]?.value?.properties
          ?.title?.[0]?.[0] || "this"
      );
    },
  },
};
</script>