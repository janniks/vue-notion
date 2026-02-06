import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  const config = {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    plugins: [vue()],
  };

  // Build config for library
  if (command === "build") {
    config.build = {
      lib: {
        entry: resolve(__dirname, "src/entry.js"),
        name: "VueNotion",
        // the proper extensions will be added
        fileName: "vue-notion",
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ["vue"],
        // output: {
        //   // Provide global variables to use in the UMD build
        //   // for externalized deps
        //   globals: {
        //     vue: "Vue",
        //   },
        // },
      },
    };
  }

  return config;
});
