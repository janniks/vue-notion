import * as components from "./components/index";

export default {
  install: (app) => {
    Object.entries(components).forEach(([componentName, component]) => {
      app.component(componentName, component);
    });
  },
};

export * from "./components/index";

export * from "./lib/api";
export * from "./lib/blockable";
export * from "./lib/utils";
