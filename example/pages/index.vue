<template>
  <div class="container">
    <div class="content">
      <img
        src="https://github.com/janniks/vue-notion/raw/main/docs/img/vue-notion.png"
        alt="vue-notion"
        width="272px"
        class="logo"
      />
      <p>An unofficial Notion renderer</p>

      <h3 class="nav">
        <a target="_blank" href="https://github.com/janniks/vue-notion#features"
          >Features</a
        >
        <span> · </span>
        <a target="_blank" href="https://github.com/janniks/vue-notion#install"
          >Install</a
        >
        <span> · </span>
        <a
          target="_blank"
          href="https://github.com/janniks/vue-notion#basic-example"
          >Example</a
        >
        <span> · </span>
        <a target="_blank" href="https://github.com/janniks/vue-notion#docs"
          >Docs</a
        >
        <span> · </span>
        <a target="_blank" href="https://github.com/janniks/vue-notion#credits"
          >Credits</a
        >
      </h3>

      <h2>Example from README</h2>
      <div class="links">
        <NuxtLink class="button--green" to="/nuxt">Basic Example</NuxtLink>
      </div>

      <h2>Static Generated Examples</h2>
      <div class="links">
        <p>Blog-style Examples (use Notion as a CMS for Nuxt)</p>
        <div class="links">
          <NuxtLink class="button--green" to="/posts">All Blog Posts</NuxtLink>
          <NuxtLink class="button--green" to="/example">
            Post via slug <i>(e.g. /example)</i>
          </NuxtLink>
        </div>
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
