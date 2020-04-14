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
        <v-col
          v-if="dogPicture"
          :key="`dog-${index}`"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <DoggoCard
            :dog="getDogPicture(dogPicture)"
            deletable
            @openModal="setDialog"
            @deleteItem="deleteFromHistory"
          />
        </v-col>
      </template>
      <v-col class="colPos" cols="12" sm="6" md="4" lg="3">
        <mugen-scroll
          class="centeredText"
          :handler="addPictures"
          :should-handle="!loading"
        >
          <div v-if="loading" key="scroll-loading">Loading...</div>
          <div v-else key="scroll-end">That's it!</div>
        </mugen-scroll>
      </v-col>
    </v-row>
    <EmptyDataSection v-else />
    <v-dialog v-model="dialog.show" max-width="800px">
      <DialogContent
        :doggo-picture="dialog.data"
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
import MugenScroll from "vue-mugen-scroll";

export default {
  name: "History",

  components: {
    DoggoCard,
    DialogContent,
    EmptyDataSection,
    MugenScroll
  },

  mixins: [dogData, localStorageMixin],

  data() {
    return {
      history: [...this.$store.state.history].reverse(),
      amount: 12,
      toDisplay: [],
      dialog: {
        show: false,
        data: undefined
      },
      loading: false
    };
  },

  mounted() {
    // instantiate the data to display in template
    this.toDisplay = this.history.slice(0, this.amount);
  },

  methods: {
    clearHistory() {
      if (this.$store.state.history) {
        // clear app data
        this.$store.commit("clearHistory");
        // clear local storage
        localStorage.removeItem("history");
        // remove from component data
        this.history = [];
        // adapt template
        this.toDisplay = [];
      }
    },
    deleteFromHistory(dogPicture) {
      // clear from app data
      this.$store.commit("removeFromHistory", dogPicture);
      // clear from local storage
      this.saveHistory();
      // remove from component data
      this.history = this.history.filter(item => item !== dogPicture);
      // adapt template
      this.replacePicture(dogPicture);
    },
    replacePicture(dogPicture) {
      // remove in template
      this.toDisplay = this.toDisplay.filter(item => item !== dogPicture);
      // replace with a new one from history
      this.addPictures(1);
    },
    setDialog(dogPicture) {
      this.dialog.show = true;
      this.dialog.data = dogPicture;
    },
    addPictures(amount = this.amount) {
      if (this.toDisplay.length < this.history.length) {
        this.loading = true;
        this.toDisplay.push.apply(
          this.toDisplay,
          this.history.slice(
            this.toDisplay.length,
            this.toDisplay.length + amount
          )
        );
        this.loading = false;
      }
    }
  }
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
