<template>
  <v-app>
    <TheNavigation />

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import TheNavigation from "./components/TheNavigation";

export default {
  name: "App",

  components: {
    TheNavigation
  },

  data: () => ({
    //
  }),

  mounted() {
    this.$store.dispatch("loadBookmarks");
    this.$store.dispatch("loadHistory");
  }
};
</script>

<style lang="scss">
h1 {
  text-align: center;
  padding: 50px 0;
}
.loader {
  text-align: center;
}
</style>
