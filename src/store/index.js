import Vue from "vue";
import Vuex from "vuex";
import dogApi from "@/plugins/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    breedsList: undefined,
    bookmarks: undefined,
    loading: false
  },
  mutations: {
    setLoading(state, flag) {
      state.loading = flag;
    },
    setBreedsList(state, breedsList) {
      state.breedsList = breedsList;
    },
    setBookmarks(state, bookmarks) {
      state.bookmarks = bookmarks;
    },
    addBookmark(state, bookmark) {
      state.bookmarks.push(bookmark);
    },
    removeBookmark(state, bookmark) {
      state.bookmarks.splice(state.bookmarks.indexOf(bookmark), 1);
    },
    clearBookmarks(state) {
      state.bookmarks.splice(0);
    }
  },
  getters: {
    breedsList: state => state.breedsList,
    isBookmarked: state => picture => {
      return state.bookmarks.includes(picture);
    },
    breedExists: state => breed => {
      if (!state.breedsList) {
        return false;
      }
      return state.breedsList.includes(breed);
    }
  },
  actions: {
    async loadBreeds({ commit }) {
      const breedsList = await dogApi
        .get("breeds/list")
        .then(response => {
          return response.data.message;
        })
        .catch(error => console.log(error));
      // .finally(() => {
      //   commit("setLoading", false);
      // });

      commit("setBreedsList", breedsList);
    }
  },
  modules: {}
});
