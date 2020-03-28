<template>
  <v-container>
    <div v-if="loading" class="loader">
      <v-progress-circular
        :size="400"
        :width="8"
        color="blue"
        indeterminate
      ></v-progress-circular>
    </div>

    <v-row v-else>
      <template v-for="breed in breedsList">
        <v-col :key="breed" cols="12" sm="6" md="4" lg="3">
          <v-card class="mx-auto">
            <v-img :src="getPicture(breed)" :alt="breed" height="200px" @click.stop="setDialog(breed)"></v-img>

            <v-card-title>
              {{ breed }}
            </v-card-title>

            <v-card-actions>
              <v-btn color="purple" text>
                Explore
              </v-btn>
            </v-card-actions>
          </v-card>

          <!-- <v-btn
      color="primary"
      dark
      @click.stop="dialog = true"
    >
      Open Dialog
    </v-btn> -->
        </v-col>
      </template>
    </v-row>
    <v-dialog v-model="dialog.show" max-width="500px">
      <DialogContent :doggoPicture="dialog.data" />
    </v-dialog>
  </v-container>
</template>

<script>
import DialogContent from "./DialogContent";

export default {
  name: "DoggosGridGallery",

  data: () => ({
    breedsPictures: {},
    loading: true,
    dialog: {
      show: false,
      data: undefined
    },
    history: []
  }),
  props: {
    breedsList: {
      type: Array
      // required: true
    }
  },
  components: {
    DialogContent
  },
  mounted() {
    this.breedsList.forEach(breed => {
      this.getRandomPictureFromBreed(breed);
    });

    if (localStorage.getItem("history")) {
      try {
        this.history = JSON.parse(localStorage.getItem("history"));
      } catch (e) {
        localStorage.removeItem("history");
      }
    }
  },
  watch: {
    // whenever breedsPictures changes, this function will run
    breedsPictures: function(newPictures) {
      if (Object.keys(newPictures).length === this.breedsList.length) {
        this.loading = false;
      }
    }
  },
  methods: {
    getRandomPictureFromBreed(breed) {
      this.$dogApi
        .get(`breed/${breed}/images/random`)
        .then(response => {
          this.$set(this.breedsPictures, breed, response.data.message);
        })
        .catch(error => {
          console.log(error);
          this.$set(this.breedsPictures, breed, undefined);
        });
    },
    getPicture(breed) {
      return this.breedsPictures[breed];
    },
    setDialog(breed) {
      const dogPicture = this.breedsPictures[breed];
      this.dialog.show = true;
      this.dialog.data = dogPicture;

      if (!this.history.includes(dogPicture)) {
        this.history.push(dogPicture);
      }
      this.saveHistory();
    },
    saveHistory() {
      const parsed = JSON.stringify(this.history);
      localStorage.setItem("history", parsed);
    }
  }
};
</script>

<style lang="scss" scoped></style>