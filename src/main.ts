import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { defaultConfig, plugin } from "@formkit/vue";

import "flowbite";
import "./index.css";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";

initializeApp(firebaseConfig);

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(plugin, defaultConfig);
app.mount("#app");
