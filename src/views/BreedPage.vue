<template>
  <div v-if="loading" key="breed-loader" class="loader">
    <v-progress-circular
      :size="400"
      :width="8"
      color="blue"
      indeterminate
    ></v-progress-circular>
  </div>

  <div v-else key="breed-page">
    <v-container>
      <v-tabs v-model="tab" grow>
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-gallery">Main Gallery</v-tab>
        <v-tab href="#tab-subbreeds">Subbreeds</v-tab>

        <v-tab-item value="tab-gallery">
          <section>
            <div class="panel">
              <h1 class="panelTitle">{{ title }} Gallery</h1>
            </div>
            <v-row>
              <DoggosGridGallery
                v-if="breedPictures.length"
                :pictures="breedPictures"
              />
            </v-row>
          </section>
        </v-tab-item>

        <v-tab-item value="tab-subbreeds">
          <section>
            <template v-if="subbreeds">
              <template v-if="subbreedSection">
                <router-view
                  :key="$route.path"
                  :parentBreed="breed"
                  @showSnackBar="snackbar = true"
                  ref="subbreedPage"
                />
              </template>
              <template v-else>
                <div class="panel">
                  <h1 class="panelTitle">{{ title }} subbreeds</h1>
                </div>
                <DoggosGridGallery
                  :parent-breed="breed"
                  :breeds-list="subbreeds"
                />
              </template>
            </template>
            <h2 v-else class="emptySub">No subbreeds for {{ breed }}</h2>
          </section>
        </v-tab-item>
      </v-tabs>

      <!-- Info snackbar in case of useless refresh -->
      <v-snackbar v-model="snackbar" color="primary" right :timeout="4000" top>
        Sorry, that's it for this doggo!
        <v-btn dark text @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </v-container>
    <div v-show="displayRefreshBtn">
      <NewBatchButton @getNewBatch="getNewBatch" />
    </div>
  </div>
</template>

<script>
import DoggosGridGallery from "@/components/DoggosGridGallery";
import NewBatchButton from "@/components/NewBatchButton";

export default {
  name: "BreedPage",

  props: {
    breed: {
      type: String,
      required: true
    }
  },

  components: {
    DoggosGridGallery,
    NewBatchButton
  },

  data() {
    return {
      breedPictures: [],
      subbreeds: undefined,
      loading: true,
      amount: 12,
      snackbar: false,
      tab: null,
      subbreedSection: false
    };
  },

  computed: {
    displayRefreshBtn() {
      return this.subbreedSection || this.tab === "tab-gallery";
    },
    title: function() {
      return this.breed.charAt(0).toUpperCase() + this.breed.substring(1);
    }
  },

  mounted() {
    // fetch pictures from component to let it decide the amount
    this.getRandomPictures();

    this.$dogApi
      .get(`/breed/${this.breed}/list`)
      .then(response => {
        if (response.data.message.length) {
          this.subbreeds = response.data.message;
        }
      })
      .finally(() => (this.loading = false));

    if (this.$route.name === "SubbreedPage") {
      // redirect to correct tab
      this.tab = "tab-subbreeds";
      this.subbreedSection = true;
    }

    this.$root.$on("subbreed_selected", () => {
      // switch the component
      this.subbreedSection = true;
    });
    this.$root.$on("back_to_list", () => {
      // switch the component
      this.subbreedSection = false;
      // update the navigation
      this.$router
        .replace({ name: "BreedPage", params: { breed: this.breed } })
        .catch(() => {});
    });
  },

  methods: {
    getRandomPictures() {
      this.$dogApi
        .get(`breed/${this.breed}/images/random/${this.amount}`)
        .then(response => {
          this.breedPictures = response.data.message;
        })
        .finally((this.loading = false));
    },
    updatePictures() {
      if (this.breedPictures.length < this.amount) {
        this.snackbar = true;
      } else {
        this.getRandomPictures();
      }
    },
    getNewBatch() {
      if (this.tab === "tab-gallery") {
        this.updatePictures();
      } else if (this.tab === "tab-subbreeds") {
        this.$refs.subbreedPage.updatePictures();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.panel {
  padding: 40px 0;
  line-height: 50px;

  .panelTitle {
    padding: 0;
    font-size: 30px;
    text-align: center;
  }
}
.emptySub {
  text-align: center;
}
</style>
