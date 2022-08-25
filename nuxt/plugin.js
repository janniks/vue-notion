import Vue from "vue";
import VueNotion, { getPageBlocks, getPageTable } from "vue-notion";

Vue.use(VueNotion);

export default (_, inject) => {
  const notion = { getPageBlocks, getPageTable };
  inject("notion", notion);
};
