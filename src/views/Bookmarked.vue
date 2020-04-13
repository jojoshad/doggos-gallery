<template>
  <v-container>
    <div class="title">
      <h1>Bookmarked</h1>
      <v-dialog v-model="confirmation" width="500">
        <template v-slot:activator="{ on }">
          <v-btn depressed large color="error" v-on="on">
            <v-icon>mdi-delete</v-icon>
            Clear All Bookmarks
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Confirmation</v-card-title>
          <v-card-text>
            Are you sure you want to get rid of ALL bookmarks?
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" text @click="confirmation = false">No</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="clearBookmarks()">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-row v-if="bookmarks.length">
      <template v-for="(dogPicture, index) in [...bookmarks].reverse()">
        <v-col :key="index" cols="12" sm="6" md="4" lg="3">
          <DoggoCard
            :dog="getDogPicture(dogPicture)"
            deletable
            @openModal="setDialog"
            @deleteItem="deleteBookmark"
          />
        </v-col>
      </template>
    </v-row>
    <EmptyDataSection v-else />
    <v-dialog v-model="dialog.show" max-width="800px">
      <DialogContent
        :doggoPicture="dialog.data"
        @closeModal="dialog.show = false"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import DoggoCard from "@/components/DoggoCard";
import DialogContent from "@/components/DialogContent";
import EmptyDataSection from "@/components/VEmptyDataSection";
import dogData from "@/mixins/dogDataMixin";
import localStorageMixin from "@/mixins/localStorageMixin";

export default {
  name: "Bookmarked",
  data() {
    return {
      bookmarks: this.$store.state.bookmarks,
      confirmation: false,
      dialog: {
        show: false,
        data: undefined
      }
    };
  },
  components: {
    DoggoCard,
    DialogContent,
    EmptyDataSection
  },
  methods: {
    clearBookmarks() {
      if (this.$store.state.bookmarks) {
        // clear app data
        this.$store.commit("clearBookmarks");
        // clear local storage
        localStorage.removeItem("bookmarks");
        // close modal
        this.confirmation = false;
      }
    },
    deleteBookmark(dogPicture) {
      this.$store.commit("removeBookmark", dogPicture);
      this.saveBookmarks();
    },
    setDialog(dogPicture) {
      this.dialog.show = true;
      this.dialog.data = dogPicture;

      if (!this.$store.getters.isViewed(dogPicture)) {
        this.$store.commit("addToHistory", dogPicture);
      }
      this.saveHistory();
    }
  },
  mixins: [dogData, localStorageMixin]
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}
</style>
