<template>
  <div class="container">
    <div>
      <h1 class="title">vue-notion-example</h1>
      <div class="posts">
        <h2>All Posts</h2>
        <ul>
          <li v-for="(post, k) in posts" :key="k">
            <b>{{ post.date }}</b>
            <NuxtLink v-if="post.slug" :to="post.slug" class="button--grey">
              <b>{{ post.title }}</b>
              {{ post.preview }}
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
              <li v-for="(post, k) in postsByTag.get(tag)" :key="k">
                <NuxtLink v-if="post.slug" :to="post.slug" class="button--grey">
                  <b>{{ post.title }}</b>
                  {{ post.preview }}
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
export default {
  async asyncData({ $notion, params, error }) {
    const pageTable = await $notion.getPageTable("10327f9074b7433aad577ccd0020e971");

    // sort published pages
    const posts = pageTable
      .filter((page) => page.published)
      .sort((a, b) => a.date - b.date);

    // convert array of pages to a map of tags with page arrays
    const postsByTag = pageTable
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
      posts,
      postsByTag,
      tags: [...postsByTag.keys()].sort(),
    };
  },
};
</script>
