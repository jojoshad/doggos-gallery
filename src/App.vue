<template>
  <v-app>
    <TheNavigation />

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import TheNavigation from "./components/TheNavigation";

export default {
  name: "App",

  components: {
    // HelloWorld,
    TheNavigation
  },

  data: () => ({
    //
  })
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
