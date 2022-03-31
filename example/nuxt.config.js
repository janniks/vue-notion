export default {
  // Telemetry (https://github.com/nuxt/telemetry)
  telemetry: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "example",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ["vue-notion/nuxt"],

  // Plugins (e.g. vue-katex for equations)
  plugins: [
    "~/plugins/vue-katex.js",
    "~/plugins/vue-custom-notion-component.js",
  ],
};
