import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    breedsList: {}
  },
  mutations: {
    setBreedsList(state, breedsList) {
      state.breedsList = breedsList;
    }
  },
  getters: {
    breedsList: state => state.breedsList
  },
  actions: {},
  modules: {}
});
