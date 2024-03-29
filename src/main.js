import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import dogApi from "./plugins/axios";

Vue.config.productionTip = false;

Vue.prototype.$dogApi = dogApi;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
