import { createApp } from "vue";
import App from "./serve.vue";

import Vue3Katex from "@janniks/vue3-katex";
import { NotionRenderer } from "@/entry";

const app = createApp(App);

app.use(Vue3Katex);
app.component("NotionRenderer", NotionRenderer);

app.mount("#app");
