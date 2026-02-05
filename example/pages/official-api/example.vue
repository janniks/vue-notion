<template>
  <div id="app">
    <div v-if="!blockMap" class="loading">Loading page...</div>
    <NotionRenderer v-else :blockMap="blockMap" fullPage prism />
  </div>
</template>

<script setup>
const { data: blockMap } = useFetch("/api/notion", {
  method: "GET",
});
</script>

<style>
@import "vue-notion/styles.css";

body {
  margin: 0;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.2rem;
  color: #666;
}
</style>
