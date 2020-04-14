<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        color="primary"
        fab
        large
        bottom
        right
        fixed
        @click="getNewBatch()"
      >
        <v-icon class="btnIcon">mdi-refresh</v-icon>
      </v-btn>
    </template>
    <span>A new batch please!</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "NewBatchButton",

  methods: {
    getNewBatch() {
      this.$emit("getNewBatch");
    }
  }
};
</script>
