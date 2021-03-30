<template>
  <span v-if="decorators.length === 0">{{ text }}</span>
  <span v-else-if="decoratorKey === 'h'" :class="'notion-' + decoratorValue"
    ><NotionDecorator :content="nextContent" />
  </span>
  <code v-else-if="decoratorKey === 'c'" class="notion-inline-code">
    <NotionDecorator :content="nextContent" />
  </code>
  <b v-else-if="decoratorKey === 'b'">
    <NotionDecorator :content="nextContent" />
  </b>
  <em v-else-if="decoratorKey === 'i'">
    <NotionDecorator :content="nextContent" />
  </em>
  <s v-else-if="decoratorKey === 's'">
    <NotionDecorator :content="nextContent" />
  </s>
  <a
    v-else-if="decoratorKey === 'a'"
    class="notion-link"
    target="_blank"
    :href="decoratorValue"
  >
    <NotionDecorator :content="nextContent" />
  </a>
  <NotionDecorator v-else :content="nextContent" />
</template>

<script>
export default {
  name: "NotionDecorator",
  props: ["content"],
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
  },
};
</script>
