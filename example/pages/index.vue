<template>
  <div class="container">
    <div>
      <h1 class="title">vue-notion-example</h1>
      <div class="links">
        <NuxtLink class="button--green" to="/">This page</NuxtLink>
        <NuxtLink class="button--grey" to="/2e22de6b770e4166be301490f6ffd420"
          >react-notion tester</NuxtLink
        >
        <NuxtLink class="button--grey" to="/067dd719a912471ea9a3ac10710e7fdf"
          >react-notion-x tester</NuxtLink
        >
      </div>
      <div class="tags">
        <h2>Tags</h2>
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
import { getPageTable } from "../../dist/vue-notion.esm";

export default {
  async asyncData({ params, error }) {
    const pageTable = await getPageTable("10327f9074b7433aad577ccd0020e971");

    // convert array of pages to a map of tags with page arrays
    const pagesByTag = pageTable
      .filter((page) => page.published)
      .reduce((acc, cur) => {
        cur.tags.forEach((tag) =>
          acc.has(tag)
            ? acc.set(tag, [...acc.get(tag), cur])
            : acc.set(tag, [cur])
        );
        return acc;
      }, new Map());

    return { tags: Array.from(pagesByTag.keys()).sort(), pagesByTag };
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.links {
  padding-top: 15px;
}

.tags {
  margin: 1em;
  text-align: left;
}

ul {
  margin: 1em auto;
  list-style: none;
}

a {
  max-width: 75%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
