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
        <router-view :key="$route.path" :parentBreed="breed" />
      </template>
      <h2 class="emptySub" v-else>No subbreeds for {{ breed }}</h2>
    </section>
  </v-container>
</template>

<script>
import DoggosGridGallery from "@/components/DoggosGridGallery";

export default {
  data() {
    return {
      breedPictures: [],
      subbreeds: undefined,
      loading: true,
      amount: 12
    };
  },
  props: {
    breed: {
      type: String,
      required: true
    }
  },
  components: {
    DoggosGridGallery
  },
  computed: {
    title: function() {
      return this.breed.charAt(0).toUpperCase() + this.breed.substring(1);
    }
  },
  mounted() {
    // fetch pictures from component to let it decide the amount
    this.getRandomPictures(this.amount);

    this.$dogApi
      .get(`/breed/${this.breed}/list`)
      .then(response => {
        if (response.data.message.length) {
          this.subbreeds = response.data.message;
        }
      })
      .catch(error => console.log(error))
      .finally(() => (this.loading = false));
  },
  methods: {
    getRandomPictures(amount) {
      this.$dogApi
        .get(`breed/${this.breed}/images/random/${amount}`)
        .then(response => {
          this.breedPictures = response.data.message;
        })
        .catch(error => {
          console.log(error);
        })
        .finally((this.loading = false));
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
</style>
