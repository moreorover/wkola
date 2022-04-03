import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import { plugin, defaultConfig } from "@formkit/vue";

import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/saga-purple/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import PrimeVue from "./primevue";

import { firebaseConfig } from "./firebase-config";
import { initializeApp } from "firebase/app";

initializeApp(firebaseConfig);

const app = createApp(App);
PrimeVue.register(app);
app.use(router);
app.use(createPinia());
app.use(plugin, defaultConfig);
app.mount("#app");
