// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { useAuthStore } from "@/stores/auth";
import naive from "naive-ui";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

const auth = useAuthStore();
auth.loadFromStorage();

app.use(router);

app.use(naive);

app.mount("#app");
