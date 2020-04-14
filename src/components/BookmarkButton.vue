<template>
  <v-btn
    :key="doggoPicture"
    class="btn"
    icon
    :color="bookmarked ? 'white' : 'pink'"
    @click="switchBookmarkState()"
  >
    <v-icon v-if="bookmarked" key="bookmarked" class="btnIcon">
      mdi-check
    </v-icon>
    <v-icon v-else key="not-bookmarked" class="btnIcon">mdi-heart</v-icon>
  </v-btn>
</template>

<script>
import localStorageMixin from "@/mixins/localStorageMixin";

export default {
  name: "BookmarkButton",

  mixins: [localStorageMixin],

  props: {
    doggoPicture: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      bookmarked: this.$store.getters.isBookmarked(this.doggoPicture)
    };
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
      if (!this.bookmarked) {
        this.$store.commit("addBookmark", this.doggoPicture);
        this.bookmarked = true;
      } else {
        this.$store.commit("removeBookmark", this.doggoPicture);
        this.bookmarked = false;
      }
      this.saveBookmarks();
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
