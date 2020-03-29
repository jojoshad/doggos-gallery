<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" color="primary" fab large @click="getNewBatch()">
        <v-icon class="btnIcon">mdi-refresh</v-icon>
      </v-btn>
    </template>
    <span>A new batch please!</span>
  </v-tooltip>
</template>

<script>
export default {
  methods: {
    getNewBatch() {
      this.$emit("getNewBatch");
    }
  }
};
</script>
