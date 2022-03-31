import Vue from "vue";
import Dev from "./serve.vue";

import VueKatex from "vue-katex";
import { NotionRenderer } from "../src/components";

Vue.use(VueKatex);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Dev),
}).$mount("#app");
