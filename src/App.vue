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

<style lang="scss" scoped></style>
