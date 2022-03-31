// Import vue components
import * as components from "@/components/index";

// install function executed by Vue.use()
const install = function installVueNotion(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
};

// Create module definition for Vue.use()
const plugin = {
  install
};

// To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare
/* global window, global */
if ("false" === process.env.ES_BUILD) {
  let GlobalVue = null;
  if (typeof window !== "undefined") {
    GlobalVue = window.Vue;
  } else if (typeof global !== "undefined") {
    GlobalVue = global.Vue;
  }
  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
}
// Default export is library as a whole, registered via Vue.use()
export default plugin;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from "@/components/index";

// export additional js methods
export * from "@/lib/api";
export * from "@/lib/blockable";
export * from "@/lib/utils";

// todo: remove .esm from default packaging for cleaner imports
