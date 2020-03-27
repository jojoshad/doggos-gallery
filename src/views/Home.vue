<template>
  <div v-if="loading" class="loader">
    <v-progress-circular
      :size="400"
      :width="8"
      color="blue"
      indeterminate
    ></v-progress-circular>
  </div>

  <div v-else class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data: () => ({
    loading: true
  }),
  mounted() {
    this.$dogApi
      .get("breeds/list/all")
      .then(response => {
        this.$store.commit("setBreedsList", response.data.message);
        console.log(this.$store.getters.breedsList);
      })
      .catch(error => console.log(error))
      .finally(() => (this.loading = false));
  }
};
</script>

<style lang="scss" scoped>
.loader {
  text-align: center;
}
</style>