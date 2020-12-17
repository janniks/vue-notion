<template>
  <span>
    <NotionDecorator v-for="(t, i) in title" :key="i" :content="t" />
  </span>
</template>

<script>
import NotionDecorator from "@/blocks/decorator";

export default {
  name: "NotionTextRenderer",
  props: ["title"],
  components: {
    NotionDecorator,
  },
};
</script>
