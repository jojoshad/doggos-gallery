<template>
  <v-card class="mx-auto">
    <v-img
      :src="dog.img"
      :alt="dog.name"
      @error="onErrorImg"
      height="300px"
      @click.stop="openModal()"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            v-if="!imgError"
            key="image-loading"
            indeterminate
            color="blue"
          ></v-progress-circular>
          <div v-else key="image-failed">
            <img :src="require(`@/assets/doge.jpg`)" alt="doge" />
            <span class="imgText">
              Couldn't load
            </span>
          </div>
        </v-row>
      </template>
    </v-img>
    <!-- optional delete button -->
    <v-btn
      v-if="deletable"
      class="deleteIcon"
      color="white"
      icon
      @click="emitDelete()"
    >
      <v-icon>mdi-delete</v-icon>
    </v-btn>

    <template v-if="dog.name">
      <router-link
        v-if="parentBreed"
        key="subbreed-link"
        class="link"
        :to="{
          name: 'SubbreedPage',
          params: { subbreed: dog.name, parent: parentBreed }
        }"
        @click.native="subbreedSelected()"
      >
        <v-card-title>
          {{ dog.name }}
        </v-card-title>
      </router-link>

      <router-link
        v-else
        key="breed-link"
        class="link"
        :to="{ name: 'BreedPage', params: { breed: dog.name } }"
      >
        <v-card-title>
          {{ dog.name }}
        </v-card-title>
      </router-link>
    </template>
  </v-card>
</template>

<script>
export default {
  name: "DoggoCard",

  props: {
    dog: {
      type: Object,
      required: true
    },
    parentBreed: {
      type: String
    },
    deletable: {
      type: Boolean
    }
  },

  data: () => ({
    imgError: false
  }),

  methods: {
    openModal() {
      // can't open modal for a wrong img
      if (!this.imgError) {
        this.$emit("openModal", this.dog.img);
      }
    },
    onErrorImg() {
      this.imgError = true;
    },
    emitDelete() {
      this.$emit("deleteItem", this.dog.img);
    },
    subbreedSelected() {
      this.$root.$emit("subbreed_selected");
    }
  }
};
</script>

<style lang="scss" scoped>
.link {
  color: black;
  text-decoration: none;
}
.imgText {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
}
.deleteIcon {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
