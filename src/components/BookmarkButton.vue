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
import localStorageMixin from "@/mixins/localStorageMixin";

export default {
  data() {
    return {
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
      if (!this.bookmarked) {
        this.$store.commit("addBookmark", this.doggoPicture);
        this.bookmarked = true;
      } else {
        this.$store.commit("removeBookmark", this.doggoPicture);
        this.bookmarked = false;
      }
      this.saveBookmarks();
    }
  },
  mixins: [localStorageMixin]
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
