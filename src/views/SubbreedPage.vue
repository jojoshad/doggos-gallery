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
      <v-expansion-panels flat hover>
        <v-expansion-panel>
          <v-expansion-panel-header class="panel">
            <span class="panelTitle">
              {{ title(subbreed) }} {{ title(parentBreed) }}
            </span>
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
            <v-row v-if="pictures.length">
              <DoggosGridGallery :pictures="pictures" />
            </v-row>
            <template v-else>
              <h2>No pictures found for this subbreed</h2>
            </template>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </section>
  </v-container>
</template>

<script>
import DoggosGridGallery from "@/components/DoggosGridGallery";
import NewBatchButton from "@/components/NewBatchButton";

export default {
  data() {
    return {
      pictures: [],
      loading: true,
      amount: 12
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
  components: {
    DoggosGridGallery,
    NewBatchButton
  },
  mounted() {
    // fetch pictures from component to let it decide the amount
    this.getRandomPictures();
  },
  methods: {
    getRandomPictures() {
      this.$dogApi
        .get(
          `breed/${this.parentBreed}/${this.subbreed}/images/random/${this.amount}`
        )
        .then(response => {
          this.pictures = response.data.message;
        })
        .finally((this.loading = false));
    },
    getNewBatch() {
      if (this.pictures.length < this.amount) {
        this.$emit("showSnackBar");
      } else {
        this.getRandomPictures();
      }
    },
    title: function(name) {
      return name.charAt(0).toUpperCase() + name.substring(1);
    }
  }
};
</script>

<style lang="scss" scoped>
.loader {
  text-align: center;
}
h2 {
  padding: 40px 0;
  text-align: center;
}
.refreshBtnContainer {
  padding: 40px 0;
}
</style>
