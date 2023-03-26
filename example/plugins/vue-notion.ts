import VueNotion, { getPageBlocks, getPageTable } from "vue-notion";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueNotion);

  return {
    provide: {
      notion: { getPageBlocks, getPageTable },
    },
  };
});
