<template>
  <v-card class="cardContainer">
    <v-img :src="doggoPicture" alt="doggo">
      <BookmarkButton :doggoPicture="doggoPicture" class="bookmarkBtn" />
    </v-img>

    <!-- <v-card-actions> -->
      <!-- <v-spacer></v-spacer> -->

      <!-- <BookmarkButton /> -->
      <!-- <BookmarkButton class="bookmarkBtn" /> -->
      <!-- <v-btn color="green darken-1" text @click="dialog = false">
        Disagree
      </v-btn>

      <v-btn color="green darken-1" text @click="dialog = false">
        Agree
      </v-btn> -->
    <!-- </v-card-actions> -->
  </v-card>
</template>

<script>
import BookmarkButton from "./BookmarkButton";

export default {
  name: "DialogContent",

  data: () => ({}),
  components: {
    BookmarkButton
  },
  props: {
    doggoPicture: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.cardContainer {
  position: relative;
  width: 100%;

  img {
    width: 100%;
    height: auto;
  }

  .bookmarkBtn {
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }
}
</style>
