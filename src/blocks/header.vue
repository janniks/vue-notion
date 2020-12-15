<template>
  <div>
    <h1 class="notion-h1" v-if="type === 'header'">
      <NotionDecorator v-for="(t, i) in titles" :key="i" :content="t" />
    </h1>
    <h2 class="notion-h2" v-if="type === 'sub_header'">
      <NotionDecorator v-for="(t, i) in titles" :key="i" :content="t" />
    </h2>
    <h3 class="notion-h3" v-if="type === 'sub_sub_header'">
      <NotionDecorator v-for="(t, i) in titles" :key="i" :content="t" />
    </h3>
  </div>
</template>

<script>
import Blockable from "@/lib/blockable";
import NotionDecorator from "@/blocks/decorator.vue";

export default {
  extends: Blockable,
  name: "NotionHeader",
  components: { NotionDecorator },
};
</script>
