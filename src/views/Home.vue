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
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import DoggosGridGallery from "@/components/DoggosGridGallery.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld,
    DoggosGridGallery
  },
  data: () => ({
    breedsList: undefined,
    loading: true
    // loading: this.$store.state.loading
  }),
  mounted() {
    if (!this.$store.state.breedsList) {
      // this.$store.dispatch("loadBreeds");
      this.$dogApi
        .get("breeds/list")
        .then(response => {
          this.$store.commit("setBreedsList", response.data.message);
          this.breedsList = response.data.message;
          console.log(this.breedsList);
        })
        .catch(error => console.log(error))
        .finally(() => (this.loading = false));
    } else {
      this.breedsList = this.$store.state.breedsList;
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
