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
    <h1>Home - Breeds Gallery</h1>
    <DoggosGridGallery :breedsList="breedsList" />
  </v-container>
</template>

<script>
// @ is an alias to /src
import DoggosGridGallery from "@/components/DoggosGridGallery.vue";

export default {
  name: "Home",
  components: {
    DoggosGridGallery
  },
  data: () => ({
    breedsList: undefined,
    loading: true
    // loading: this.$store.state.loading
  }),
  mounted() {
    if (!this.$store.state.breedsList) {
      this.$store
        .dispatch("loadBreeds")
        .then(() => (this.breedsList = this.$store.state.breedsList))
        .finally(() => (this.loading = false));
    } else {
      this.breedsList = this.$store.state.breedsList;
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
