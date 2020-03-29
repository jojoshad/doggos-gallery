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
      <template v-for="(dogPicture, index) in [...history].reverse()">
        <v-col v-if="dogPicture" :key="index" cols="12" sm="6" md="4" lg="3">
          <DoggoCard
            :dog="getDogPicture(dogPicture)"
            deletable
            @openModal="setDialog"
            @deleteItem="deleteFromHistory"
          />
        </v-col>
      </template>
    </v-row>
    <v-row v-else>
      Empty
    </v-row>
    <v-dialog v-model="dialog.show" max-width="500px">
      <DialogContent :doggoPicture="dialog.data" />
    </v-dialog>
  </v-container>
</template>

<script>
import DoggoCard from "@/components/DoggoCard";
import DialogContent from "@/components/DialogContent";
import dogData from "@/mixins/dogDataMixin";
import localStorageMixin from "@/mixins/localStorageMixin";

export default {
  name: "History",
  data() {
    return {
      history: this.$store.state.history,
      dialog: {
        show: false,
        data: undefined
      }
    };
  },
  components: {
    DoggoCard,
    DialogContent
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
