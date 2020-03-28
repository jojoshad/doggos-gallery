import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

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
          import(/* webpackChunkName: "details" */ "../views/SubbreedPage"),
      }
    ],
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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
