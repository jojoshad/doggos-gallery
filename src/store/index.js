import Vue from "vue";
import Vuex from "vuex";
import dogApi from "@/plugins/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    breedsList: undefined,
    bookmarks: undefined,
    history
  },
  mutations: {
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
    },
    setHistory(state, history) {
      state.history = history;
    },
    addToHistory(state, item) {
      state.history.push(item);
    },
    removeFromHistory(state, item) {
      state.history.splice(state.history.indexOf(item), 1);
    },
    clearHistory(state) {
      state.history.splice(0);
    }
  },
  getters: {
    breedsList: state => state.breedsList,
    isViewed: state => picture => {
      return state.history.includes(picture);
    },
    isBookmarked: state => picture => {
      return state.bookmarks.includes(picture);
    },
    breedExists: state => breed => {
      if (!state.breedsList) {
        return false;
      }
      return state.breedsList.includes(breed);
    },
    bookmarkCount: state => (state.bookmarks ? state.bookmarks.length : 0),
    historyLength: state => (state.history ? state.history.length : 0)
  },
  actions: {
    async loadBreeds({ commit }) {
      const breedsList = await dogApi.get("breeds/list").then(response => {
        return response.data.message;
      });

      commit("setBreedsList", breedsList);
    },
    loadBookmarks({ commit }) {
      if (localStorage.getItem("bookmarks")) {
        try {
          commit("setBookmarks", JSON.parse(localStorage.getItem("bookmarks")));
        } catch (e) {
          localStorage.removeItem("bookmarks");
        }
      } else {
        commit("setBookmarks", []);
      }
    },
    loadHistory({ commit }) {
      if (localStorage.getItem("history")) {
        try {
          commit("setHistory", JSON.parse(localStorage.getItem("history")));
        } catch (e) {
          localStorage.removeItem("history");
        }
      } else {
        commit("setHistory", []);
      }
    }
  },
  modules: {}
});
