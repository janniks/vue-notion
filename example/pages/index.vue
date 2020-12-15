<template>
  <div class="container">
    <div>
      <h1 class="title">vue-notion-example</h1>
      <div class="links">
        <NuxtLink class="button--green" to="/">This page</NuxtLink>
        <NuxtLink class="button--green" to="/2e22de6b770e4166be301490f6ffd420"
          >react-notion tester</NuxtLink
        >
        <NuxtLink class="button--green" to="/067dd719a912471ea9a3ac10710e7fdf"
          >react-notion-x tester</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
</style>
