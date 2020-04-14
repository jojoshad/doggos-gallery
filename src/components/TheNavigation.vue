<template>
  <v-app-bar app color="white" elevate-on-scroll>
    <router-link :to="{ name: 'Home' }">
      <v-toolbar-title>
        <div class="title"><span>&#128054;</span>Doggos as a service</div>
      </v-toolbar-title>
    </router-link>

    <v-spacer></v-spacer>

    <router-link :to="{ name: 'Bookmarked' }">
      <v-btn text small>
        <v-badge
          :content="$store.getters.bookmarkCount"
          :value="$store.getters.bookmarkCount"
          color="red"
          overlap
          left
        >
          <v-icon color="red">mdi-heart</v-icon>
        </v-badge>
        <span class="mr-2">Bookmarked</span>
      </v-btn>
    </router-link>

    <router-link :to="{ name: 'History' }">
      <v-btn text small>
        <v-icon color="grey">mdi-history</v-icon>
        <span class="mr-2">History</span>
      </v-btn>
    </router-link>
  </v-app-bar>
</template>

<script>
export default {
  name: "TheNavigation",

  data() {
    return {
      search: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  span {
    font-size: 25px;
    margin-right: 10px;
  }
}

a {
  text-decoration: none;

  button {
    margin: 0 5px;

    i {
      margin-right: 5px;
    }
  }
}
</style>
