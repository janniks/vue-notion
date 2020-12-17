<template>
  <span>
    <NotionDecorator v-for="(t, i) in text" :key="i" :content="t" />
  </span>
</template>

<script>
import NotionDecorator from "@/blocks/decorator";

export default {
  name: "NotionTextRenderer",
  props: ["text"],
  components: {
    NotionDecorator,
  },
};
</script>
