<template>
  <v-container>
    <div class="title">
      <h1>History</h1>
      <v-btn depressed large color="primary" @click="clearHistory()">
        <v-icon>mdi-delete</v-icon>
        Clear History
      </v-btn>
    </div>
    <v-row v-if="history.length">
      <template v-for="(dogPicture, index) in toDisplay">
        <v-col v-if="dogPicture" :key="index" cols="12" sm="6" md="4" lg="3">
          <DoggoCard
            :dog="getDogPicture(dogPicture)"
            deletable
            @openModal="setDialog"
            @deleteItem="deleteFromHistory"
          />
        </v-col>
      </template>
      <v-col class="colPos" cols="12" sm="6" md="4" lg="3">
        <mugen-scroll class="centeredText" :handler="addPictures" :should-handle="!loading">
          <div v-if="loading">Loading...</div>
          <div v-else>That's it!</div>
        </mugen-scroll>
      </v-col>
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
import EmptyDataSection from "@/components/EmptyDataSection";
import dogData from "@/mixins/dogDataMixin";
import localStorageMixin from "@/mixins/localStorageMixin";
import MugenScroll from "vue-mugen-scroll";

export default {
  name: "History",
  data() {
    return {
      history: this.$store.state.history.reverse(),
      amount: 12,
      toDisplay: this.$store.state.history.slice(0, 12),
      dialog: {
        show: false,
        data: undefined
      },
      loading: false
    };
  },
  components: {
    DoggoCard,
    DialogContent,
    EmptyDataSection,
    MugenScroll
  },
  methods: {
    clearHistory() {
      if (this.$store.state.history) {
        // clear app data
        this.$store.commit("clearHistory");
        // clear local storage
        localStorage.removeItem("history");
      }
    },
    deleteFromHistory(dogPicture) {
      this.$store.commit("removeFromHistory", dogPicture);
      this.saveHistory();
    },
    setDialog(dogPicture) {
      this.dialog.show = true;
      this.dialog.data = dogPicture;
    },
    addPictures() {
      this.loading = true;
      this.$set(
        this.toDisplay,
        this.toDisplay.push.apply(
          this.toDisplay,
          this.history.filter(
            (item, index) =>
              index >= this.toDisplay.length &&
              index < this.toDisplay.length + this.amount
          )
        )
      );
      this.loading = false;
    }
  },
  mixins: [dogData, localStorageMixin]
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}
.colPos {
  position: relative;

  .centeredText {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
}
</style>
