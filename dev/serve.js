import { createApp } from "vue";
import App from "./serve.vue";

import Vue3Katex from "@hsorby/vue3-katex";
import { NotionRenderer } from "@/entry";

const app = createApp(App);

console.log(app);

app.use(Vue3Katex);
app.component("NotionRenderer", NotionRenderer);

app.mount("#app");
