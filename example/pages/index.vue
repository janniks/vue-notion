<template>
  <div class="container">
    <div>
      <h1 class="title">vue-notion-example</h1>
      <h2>Static Generated Examples</h2>
      <div class="links">
        <h3>Blog Examples</h3>
        <div class="links">
          <NuxtLink class="button--green" to="/tags">
            Posts sorted by database tags
          </NuxtLink>
          <NuxtLink class="button--green" to="/example">
            Post via slug <i>(e.g. /example)</i>
          </NuxtLink>
        </div>
        <h3>More examples comming soon</h3>
      </div>
      <h2>Example Notion Playground Pages</h2>
      <div class="links">
        <NuxtLink class="button--grey" to="/2e22de6b770e4166be301490f6ffd420">
          react-notion tester
        </NuxtLink>
        <NuxtLink class="button--grey" to="/067dd719a912471ea9a3ac10710e7fdf">
          react-notion-x tester
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
