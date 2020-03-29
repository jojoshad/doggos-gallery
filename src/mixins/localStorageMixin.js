export default {
  methods: {
    saveBookmarks() {
      const parsed = JSON.stringify(this.$store.state.bookmarks);
      // update local storage
      localStorage.setItem("bookmarks", parsed);
    },
    saveHistory() {
      const parsed = JSON.stringify(this.$store.state.history);
      // update local storage
      localStorage.setItem("history", parsed);
    }
  }
};
