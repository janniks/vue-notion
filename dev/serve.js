import Vue from "vue";
import Dev from "./serve.vue";

import VueKatex from "vue-katex";

Vue.config.productionTip = false;

Vue.use(VueKatex);

new Vue({
  render: (h) => h(Dev),
}).$mount("#app");
