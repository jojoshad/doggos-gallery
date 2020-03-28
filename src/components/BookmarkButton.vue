<template>
  <v-btn
    class="btn"
    :key="doggoPicture"
    icon
    :color="bookmarked ? 'white' : 'pink'"
    @click="switchBookmarkState()"
  >
    <v-icon class="btnIcon" v-if="bookmarked">mdi-check</v-icon>
    <v-icon class="btnIcon" v-else>mdi-heart</v-icon>
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      bookmarks: this.$store.state.bookmarks,
      bookmarked: this.$store.getters.isBookmarked(this.doggoPicture)
    };
  },
  props: {
    doggoPicture: {
      type: String,
      required: true
    }
  },
  watch: {
    // whenever props changes (dialog is shown),
    // this function will run (bookmark state is reseted)
    doggoPicture: function() {
      this.bookmarked = this.$store.getters.isBookmarked(this.doggoPicture);
    }
  },
  methods: {
    switchBookmarkState() {
      if (!this.bookmarks.includes(this.doggoPicture)) {
        this.$store.commit("addBookmark", this.doggoPicture);
        // this.bookmarks.push(this.doggoPicture);
        this.bookmarked = true;
      } else {
        this.$store.commit("removeBookmark", this.doggoPicture);
        // this.bookmarks.splice(this.bookmarks.indexOf(this.doggoPicture), 1);
        this.bookmarked = false;
      }
      this.saveBookmarks();
    },
    saveBookmarks() {
      const parsed = JSON.stringify(this.bookmarks);
      // update local storage
      localStorage.setItem("bookmarks", parsed);
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  width: 70px;
  height: 70px;

  .btnIcon {
    font-size: 44px;
  }
}
</style>
