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
    if (localStorage.getItem("bookmarks")) {
      try {
        this.$store.commit(
          "setBookmarks",
          JSON.parse(localStorage.getItem("bookmarks"))
        );
      } catch (e) {
        localStorage.removeItem("bookmarks");
      }
    }
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
