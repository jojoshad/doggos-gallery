<template>
  <v-card class="cardContainer">
    <div>
      <v-img :src="doggoPicture" alt="doggo" max-height="90vh">
        <BookmarkButton :doggo-picture="doggoPicture" class="bookmarkBtn" />
      </v-img>
      <v-btn class="closeIcon" color="white" icon @click="closeModal">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import BookmarkButton from "./BookmarkButton";

export default {
  name: "DialogContent",

  components: {
    BookmarkButton
  },

  props: {
    doggoPicture: {
      type: String,
      required: true
    }
  },

  data: () => ({}),

  methods: {
    closeModal() {
      this.$emit("closeModal");
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

  .closeIcon {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;

    i {
      font-size: 30px;
    }
  }
}
</style>
