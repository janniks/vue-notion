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

  // Middleware and generate routes for redirects
  // - https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-servermiddleware/
  // - https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate/#routes
  serverMiddleware: [
    {
      path: "/",
      handler: "./middleware",
    },
  ],
  generate: {
    routes: ["/basic-example"],
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ["vue-notion/nuxt"],
};
