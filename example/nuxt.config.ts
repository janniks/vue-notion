// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    transpile: ["vue-notion"],
  },
  telemetry: false,
  // plugins: [{ src: "vue-notion/nuxt/plugin.js", mode: "client" }],
});
