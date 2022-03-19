import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import { firebaseConfig } from "./firebase-config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { plugin, defaultConfig } from "@formkit/vue";

const firebase = initializeApp(firebaseConfig);
const firestoreSettings = {
  timestampsInSnapshots: true,
};
getAuth().onAuthStateChanged((user) => {
  console.log("onAuthStateChanged", { user });
});

import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/saga-purple/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import PrimeVue from "./primevue";

const app = createApp(App);
PrimeVue.register(app);
app.use(router);
app.use(createPinia());
app.use(plugin, defaultConfig);
app.mount("#app");
