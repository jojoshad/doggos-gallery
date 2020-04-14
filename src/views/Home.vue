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
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-text-field
          v-model="filter"
          label="Search"
          hint="Search for your favorite doggo!"
          placeholder="Search"
          solo
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <template v-if="filteredBreeds.length">
        <DoggosGridGallery
          key="breeds-gallery"
          :breeds-list="breedsToDisplay"
        />
        <v-pagination v-model="page" :length="pagesCount"></v-pagination>
      </template>
      <EmptyDataSection v-else key="breeds-empty" />
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import DoggosGridGallery from "@/components/DoggosGridGallery.vue";
import EmptyDataSection from "@/components/VEmptyDataSection";

export default {
  name: "Home",

  components: {
    DoggosGridGallery,
    EmptyDataSection
  },

  data: () => ({
    breedsList: undefined,
    loading: true,
    filter: "",
    page: 1,
    amountPerPage: 16
  }),

  computed: {
    filteredBreeds: function() {
      return this.breedsList.filter(breed => breed.includes(this.filter));
    },
    pagesCount: function() {
      return Math.ceil(this.filteredBreeds.length / this.amountPerPage);
    },
    breedsToDisplay: function() {
      var breedsToDisplay = this.filteredBreeds.filter(
        (breed, index) =>
          index >= (this.page - 1) * this.amountPerPage &&
          index < this.page * this.amountPerPage
      );
      return breedsToDisplay;
    }
  },

  watch: {
    // when filter changes => reset pagination
    filter: function() {
      this.page = 1;
    }
  },

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
