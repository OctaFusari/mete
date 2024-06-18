/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import App from "./App.vue";
import "./assets/main.css";
import { registerPlugins } from "@/plugins";
import { createRouter, createWebHistory } from "vue-router";

// Components
import Home from "./components/Home.vue";
import Accesso from "./components/Accesso.vue";
import Pagina__iniziale from "./components/Pagina__iniziale.vue"

// Composables
import { createApp } from "vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/accesso", component: Accesso, name: "accesso" },
        { path: "/", component: Pagina__iniziale, name: "Pagina__iniziale" }
    ],
  });

const app = createApp(App);

registerPlugins(app);
app.use(router);
app.mount("#app");
