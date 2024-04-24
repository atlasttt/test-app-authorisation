import { createApp } from "vue";
import "./assets/style.scss";
import "./assets/fonts/stylesheet.css";
import "vue3-toastify/dist/index.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import Vue3Toastify from "vue3-toastify";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: "top-center",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
});
app.mount("#app");

// createApp(App).use(pinia).use(router).mount("#app");
