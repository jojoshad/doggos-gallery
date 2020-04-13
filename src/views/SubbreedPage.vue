<template>
  <div v-if="loading" class="loader">
    <v-progress-circular
      :size="400"
      :width="8"
      color="blue"
      indeterminate
    ></v-progress-circular>
  </div>

  <section v-else>
    <div class="panel">
      <v-btn
        text
        large
        color="primary"
        class="backBtn"
        @click="backToSubsList()"
      >
        <v-icon left>mdi-arrow-left</v-icon> Back
      </v-btn>
      <h1 class="panelTitle">{{ title(subbreed) }} {{ title(parentBreed) }}</h1>
    </div>
    <v-row v-if="pictures.length">
      <DoggosGridGallery :pictures="pictures" />
    </v-row>
    <template v-else>
      <h2>No pictures found for this subbreed</h2>
    </template>
  </section>
</template>

<script>
import DoggosGridGallery from "@/components/DoggosGridGallery";

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
    DoggosGridGallery
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
    updatePictures() {
      if (this.pictures.length < this.amount) {
        this.$emit("showSnackBar");
      } else {
        this.getRandomPictures();
      }
    },
    title: function(name) {
      return name.charAt(0).toUpperCase() + name.substring(1);
    },
    backToSubsList() {
      console.log("back");
      this.$root.$emit("back_to_list");
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
.backBtn {
  position: absolute;
  left: 0;
}
</style>
