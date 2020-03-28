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
    <section>
      <v-expansion-panels
        flat
        hover
      >
        <v-expansion-panel>
          <v-expansion-panel-header class="panel">
            <span class="panelTitle">{{ subbreed }} {{ parentBreed }}</span>
            <template v-slot:actions>
              <v-icon color="primary" class="expandIcon">$expand</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <template v-for="(dogPicture, index) in pictures">
                <v-col v-if="dogPicture" :key="index" cols="12" sm="6" md="4" lg="3">
                  <v-card class="mx-auto">
                    <v-img
                      :src="dogPicture"
                      :alt="'dog-' + index"
                      height="300px"
                    ></v-img>
                  </v-card>
                </v-col>
              </template>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <!-- <h1>{{ subbreed }} {{ parentBreed }}</h1>
      <v-row>
        <template v-for="(dogPicture, index) in pictures">
          <v-col v-if="dogPicture" :key="index" cols="12" sm="6" md="4" lg="3">
            <v-card class="mx-auto">
              <v-img
                :src="dogPicture"
                :alt="'dog-' + index"
                height="300px"
              ></v-img>
            </v-card>
          </v-col>
        </template>
      </v-row> -->
    </section>
  </v-container>
</template>

<script>
// import DoggosGridGallery from "@/components/DoggosGridGallery";

export default {
  data() {
    return {
      pictures: [],
      loading: true
    };
  },
  props: {
    subbreed: {
      type: String,
      required: true
    },
    parentBreed: {
      type: String,
      required: true
    }
  },
  // components: {
  //   DoggosGridGallery
  // },
  // computed: {
  //   title: function() {
  //     return this.breed.charAt(0).toUpperCase() + this.breed.substring(1);
  //   }
  // },
  mounted() {
    this.getRandomPictures(12);
  },
  methods: {
    getRandomPictures(amount) {
      this.$dogApi
        .get(`breed/${this.parentBreed}/${this.subbreed}/images/random/${amount}`)
        .then(response => {
          console.log(response.data.message);
          this.pictures = response.data.message;
          console.log(this.pictures);
        })
        .catch(error => {
          console.log(error);
        })
        .finally((this.loading = false));
    }
  }
};
</script>

<style lang="scss" scoped>
.loader {
  text-align: center;
}
</style>
