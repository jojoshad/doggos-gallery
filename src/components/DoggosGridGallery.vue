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
      <template v-if="pictures">
        <template v-for="picture in pictures">
          <v-col :key="picture" cols="12" sm="6" md="4" lg="3">
            <DoggoCard :dog="getDogPicture(picture)" @openModal="setDialog" />
          </v-col>
        </template>
      </template>
      <template v-else>
        <template v-for="breed in breedsList">
          <v-col :key="breed" cols="12" sm="6" md="4" lg="3">
            <DoggoCard
              :parentBreed="parentBreed"
              :dog="getDogData(breed)"
              @openModal="setDialog"
            />
          </v-col>
        </template>
      </template>
    </v-row>
    <v-dialog v-model="dialog.show" max-width="500px">
      <DialogContent :doggoPicture="dialog.data" />
    </v-dialog>
  </v-container>
</template>

<script>
import DialogContent from "./DialogContent";
import DoggoCard from "./DoggoCard";

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
    },
    parentBreed: {
      type: String
    },
    pictures: {
      type: Array
    }
  },
  components: {
    DialogContent,
    DoggoCard
  },
  mounted() {
    if (!this.pictures) {
      this.breedsList.forEach(breed => {
        this.getRandomPictureFromBreed(breed);
      });
    } else {
      this.loading = false;
    }

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
        .get(
          // if there's a parentBreed, fetch from subbreed
          // otherwise just fetch from root breed
          `breed/${
            this.parentBreed ? this.parentBreed + "/" : ""
          }${breed}/images/random`
        )
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
    getDogData(breed) {
      return { name: breed, img: this.getPicture(breed) };
    },
    getDogPicture(picture) {
      return { img: picture };
    },
    setDialog(dogPicture) {
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
