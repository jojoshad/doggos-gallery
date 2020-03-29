import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/breed/:breed",
    name: "BreedPage",
    props: true,
    component: () =>
      import(/* webpackChunkName: "breed" */ "../views/BreedPage"),
    children: [
      {
        path: ":subbreed",
        name: "SubbreedPage",
        props: true,
        component: () =>
          import(/* webpackChunkName: "details" */ "../views/SubbreedPage")
      }
    ],
    beforeEnter: (to, from, next) => {
      if (!store.state.breedsList) {
        store.dispatch("loadBreeds").then(() => {
          const exists = store.getters.breedExists(to.params.breed);
          if (exists) {
            next();
          } else {
            next({ name: "NotFound" });
          }
        });
      } else {
        const exists = store.getters.breedExists(to.params.breed);
        if (exists) {
          next();
        } else {
          next({ name: "NotFound" });
        }
      }
    }
  },
  {
    path: "/bookmarked",
    name: "Bookmarked",
    component: () =>
      import(/* webpackChunkName: "bookmarked" */ "../views/Bookmarked")
  },
  {
    path: "/history",
    name: "History",
    component: () =>
      import(/* webpackChunkName: "history" */ "../views/History")
  },
  {
    path: "/404",
    alias: "*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "details" */ "../views/NotFound")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
