<template>
  <div>
    <v-app-bar app color="white" elevate-on-scroll>
      <v-app-bar-nav-icon
        @click="drawer = true"
        class="d-flex d-md-none"
      ></v-app-bar-nav-icon>

      <router-link :to="{ name: 'Home' }">
        <v-toolbar-title>
          <div class="title"><span>&#128054;</span>Doggos as a service</div>
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <!-- Desktop Navigation -->
      <div class="d-none d-md-flex">
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
      </div>
    </v-app-bar>

    <!-- Mobile navigation -->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <router-link :to="{ name: 'Bookmarked' }">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="red">mdi-heart</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Bookmarked</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link :to="{ name: 'History' }">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="grey">mdi-history</v-icon>
              </v-list-item-icon>
              <v-list-item-title>History</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "TheNavigation",

  data() {
    return {
      drawer: false
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
