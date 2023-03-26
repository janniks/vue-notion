import VueKatex from "@janniks/vue3-katex";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueKatex);
});
