<template>
  <v-container>
    <div class="title">
      <h1>Bookmarked</h1>
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
          <v-btn depressed large color="error" v-on="on">
            <v-icon>mdi-delete</v-icon>
            Clear All Bookmarks
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Confirmation</v-card-title>
          <v-card-text>Are you sure you want to get rid of ALL bookmarks?</v-card-text>
          <v-card-actions>
            <v-btn color="error" text @click="dialog = false">No</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="clearBookmarks()">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-row>
      <template v-for="(dogPicture, index) in bookmarks">
        <v-col :key="index" cols="12" sm="6" md="4" lg="3">
          <v-card class="mx-auto">
            <v-img :src="dogPicture" :alt="'dog-'+index" height="200px"></v-img>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Bookmarked",
  data() {
    return {
      bookmarks: this.$store.state.bookmarks,
      dialog: false
    };
  },
  methods: {
    clearBookmarks() {
      if (this.$store.state.bookmarks) {
        // clear component data
        this.$store.commit("clearBookmarks");
        // clear local storage
        localStorage.removeItem("bookmarks");
        // close modal
        this.dialog = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}
</style>
