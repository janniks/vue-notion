import Vue from "vue";
import Dev from "./serve.vue";

import VueKatex from "vue-katex";

Vue.use(VueKatex);

Vue.config.productionTip = false;

new Vue({
  render: h => h(Dev)
}).$mount("#app");
