<template>
  <div class="container">
    <div>
      <h1 class="title">vue-notion-example</h1>
      <div class="posts">
        <h2>All Posts</h2>
        <ul>
          <li v-for="(page, k) in pageTable" :key="k">
            <b>{{ page.date }}</b>
            <NuxtLink v-if="page.slug" :to="page.slug" class="button--grey">
              <b>{{ page.title }}</b>
              {{ page.preview }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="posts">
        <h2>All Tags</h2>
        <ul>
          <li v-for="(tag, k) in tags" :key="k">
            <b>{{ tag }}</b>
            <ul>
              <li v-for="(page, k) in pagesByTag.get(tag)" :key="k">
                <NuxtLink v-if="page.slug" :to="page.slug" class="button--grey">
                  <b>{{ page.title }}</b>
                  {{ page.preview }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getPageTable } from "vue-notion";

export default {
  async asyncData({ params, error }) {
    const pageTable = await getPageTable("10327f9074b7433aad577ccd0020e971");

    // convert array of pages to a map of tags with page arrays
    const pagesByTag = pageTable
      .filter((page) => page.published)
      .reduce((map, currentPage) => {
        currentPage.tags.forEach((tag) =>
          map.has(tag)
            ? map.set(tag, [...map.get(tag), currentPage])
            : map.set(tag, [currentPage])
        );
        return map;
      }, new Map());

    return {
      tags: Array.from(pagesByTag.keys()).sort(),
      pagesByTag,
      pageTable,
    };
  },
};
</script>
