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
import Accesso from "./components/Accesso.vue";
import Home from "./components/mete__log/Home.vue";
import Benvenuto from "./components/Benvenuto.vue";

import DataService from "./dataservice";

// Composables
import { createApp } from "vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/accesso", component: Accesso, name: "accesso" },
    { path: "/", component: Benvenuto, name: "benvenuto" },
    { path: "/", component: Home, name: "home" }
  ],
});

router.beforeEach(async (to:any, from:any) => {
  if (!DataService.isAuthenticated() && to.name !== "accesso") {
    if(to.name !== "benvenuto"){
      return { name: "accesso" };
    }
  }
  if (DataService.isAuthenticated() && (to.name === "accesso" || to.name === "benvenuto")) {
    return { name: "home" };
  }
});

const app = createApp(App);

registerPlugins(app);
app.use(router);
app.mount("#app");
