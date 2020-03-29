<template>
  <div v-if="loading" class="loader">
    <v-progress-circular
      :size="400"
      :width="8"
      color="blue"
      indeterminate
    ></v-progress-circular>
  </div>

  <v-container v-else>
    <v-row>
      <v-expansion-panels flat hover>
        <v-expansion-panel>
          <v-expansion-panel-header class="panel">
            <span class="panelTitle">The {{ title }} gallery</span>
            <template v-slot:actions>
              <v-icon color="primary" class="expandIcon">$expand</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row justify="center">
              <div class="refreshBtnContainer">
                <NewBatchButton @getNewBatch="getNewBatch" />
              </div>
            </v-row>
            <v-row>
              <DoggosGridGallery
                v-if="breedPictures.length"
                :pictures="breedPictures"
              />
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <section>
      <h1>{{ title }} subbreeds</h1>
      <template v-if="subbreeds">
        <DoggosGridGallery :parentBreed="breed" :breedsList="subbreeds" />
        <router-view
          :key="$route.path"
          :parentBreed="breed"
          @showSnackBar="snackbar = true"
        />
      </template>
      <h2 class="emptySub" v-else>No subbreeds for {{ breed }}</h2>
    </section>

    <!-- Info snackbar in case of useless refresh -->
    <v-snackbar v-model="snackbar" color="primary" right :timeout="4000" top>
      Sorry, that's it for this doggo!
      <v-btn dark text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import DoggosGridGallery from "@/components/DoggosGridGallery";
import NewBatchButton from "@/components/NewBatchButton";

export default {
  data() {
    return {
      breedPictures: [],
      subbreeds: undefined,
      loading: true,
      amount: 12,
      snackbar: false
    };
  },
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
  computed: {
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
    getNewBatch() {
      if (this.breedPictures.length < this.amount) {
        this.snackbar = true;
      } else {
        this.getRandomPictures();
      }
    }
  }
};
</script>

<style lang="scss">
.panel {
  font-size: 30px;
  height: 80px;

  .panelTitle {
    text-align: center;
  }

  .expandIcon {
    font-size: 30px;
  }
}
.emptySub {
  text-align: center;
}
.refreshBtnContainer {
  padding: 40px 0;
}
</style>
