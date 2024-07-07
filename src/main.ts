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

import Aggiungi from "./components/mete__log/Aggiungi.vue";
import Cerca from "./components/mete__log/Cerca.vue";
import Voli from "./components/mete__log/Voli.vue";
import Esplora from "./components/mete__log/Esplora.vue";
import Profilo from "./components/mete__log/Profilo.vue";
import Post from "./components/mete__log/post.vue";
import test from "./components/mete__log/test.vue";

import DataService from "./dataservice";

// Composables
import { createApp } from "vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/accesso", component: Accesso, name: "accesso" },
    { path: "/", component: Benvenuto, name: "benvenuto" },
    { path: "/", component: Home, name: "home" },
    { path: "/aggiungi", component: Aggiungi, name: "aggiungi" },
    { path: "/cerca", component: Cerca, name: "cerca" },
    { path: "/esplora", component: Esplora, name: "esplora" },
    { path: "/voli", component: Voli, name: "voli" },
    { path: "/post:postId", component: Post, name: "post" },
    { path: "/profilo:userId", component: Profilo, name: "profilo" },
    { path: "/test", component: test, name: "test" }
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
