<template>
  <v-card>
    <v-img :src="doggoPicture" alt="doggo"></v-img>

    <v-card-actions>
      <v-spacer></v-spacer>

      <!-- <v-btn color="green darken-1" text @click="dialog = false">
        Disagree
      </v-btn>

      <v-btn color="green darken-1" text @click="dialog = false">
        Agree
      </v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "DialogContent",

  data: () => ({}),
  props: {
    doggoPicture: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
