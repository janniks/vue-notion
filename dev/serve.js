import Vue from "vue";
import Dev from "./serve.vue";

import VueKatex from "vue-katex";
import { NotionRenderer } from "@/entry";

Vue.use(VueKatex);
Vue.component("NotionRenderer", NotionRenderer);

Vue.config.productionTip = false;

new Vue({
  render: h => h(Dev)
}).$mount("#app");
