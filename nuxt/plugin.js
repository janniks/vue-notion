import Vue from "vue";
import VueNotion from "vue-notion";
import { getPageBlocks, getPageTable } from "vue-notion";

Vue.use(VueNotion);

export default (_, inject) => {
  const notion = { getPageBlocks, getPageTable };
  inject("notion", notion);
};
