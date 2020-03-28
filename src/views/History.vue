<template>
  <v-container>
    <div class="title">
      <h1>History</h1>
      <v-btn depressed large color="primary" @click="clearHistory()">
        <v-icon>mdi-delete</v-icon>
        Clear History
      </v-btn>
    </div>
    <v-row>
      <template v-for="(dogPicture, index) in history">
        <v-col :key="index" cols="12" sm="6" md="4" lg="3">
          <v-card class="mx-auto">
            <v-img :src="dogPicture" :alt="'dog-'+index" height="200px"></v-img>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "History",
  data() {
    return {
      history: undefined
    };
  },
  components: {},
  mounted() {
    if (localStorage.getItem("history")) {
      try {
        this.history = JSON.parse(localStorage.getItem("history"));
      } catch (e) {
        localStorage.removeItem("history");
      }
    }
  },
  methods: {
    clearHistory() {
      if (this.history) {
        // clear component data
        this.history.splice(0);
        // clear local storage
        localStorage.removeItem("history");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}
</style>
