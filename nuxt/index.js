import path from "path";
import defu from "defu";

const defaultOptions = {};

module.exports = function(moduleOptions) {
  const options = defu(
    {
      ...this.options.notion,
      ...moduleOptions,
    },
    defaultOptions
  );

  this.nuxt.hook("build:before", () => {
    // Enable transpilation for `vue-notion`
    this.options.build.transpile.push("vue-notion");

    this.addPlugin({
      src: path.resolve(__dirname, "plugin.js"),
      fileName: "vue-notion.js",
      options,
    });
  });
};

module.exports.meta = require("../package.json");
