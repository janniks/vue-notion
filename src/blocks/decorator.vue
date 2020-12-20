<template>
  <Fragment v-if="decoratorKey === 'h'" :class="'notion-' + decoratorValue"
    ><NotionDecorator :content="nextContent" />
  </Fragment>
  <code v-else-if="decoratorKey === 'c'" class="notion-inline-code">
    <NotionDecorator :content="nextContent" />
  </code>
  <b v-else-if="decoratorKey === 'b'">
    <NotionDecorator :content="nextContent" />
  </b>
  <i v-else-if="decoratorKey === 'i'">
    <NotionDecorator :content="nextContent" />
  </i>
  <s v-else-if="decoratorKey === 's'">
    <NotionDecorator :content="nextContent" />
  </s>
  <a
    v-else-if="decoratorKey === 'a'"
    class="notion-link"
    :href="decoratorValue"
  >
    <NotionDecorator :content="nextContent" />
  </a>
  <Fragment v-else-if="!decorators">{{ text }}</Fragment>
  <NotionDecorator v-else :content="nextContent" />
</template>

<script>
import { Fragment } from "vue-fragment";

export default {
  name: "NotionDecorator",
  props: ["content"],
  components: { Fragment },
  computed: {
    text() {
      return this.content[0];
    },
    decorators() {
      return this.content[1];
    },
    decoratorKey() {
      return !!this.decorators && this.decorators[0][0];
    },
    decoratorValue() {
      return !!this.decorators && this.decorators[0][1];
    },
    unappliedDecorators() {
      const clonedDecorators = [...(this.decorators || [])];
      clonedDecorators.shift(); // remove applied decorator
      return clonedDecorators;
    },
    nextContent() {
      return [this.text, ...this.unappliedDecorators];
    },
  },
};
</script>
