<template>
  <v-card class="mx-auto">
    <v-img
      :src="dog.img"
      :alt="dog.name"
      height="300px"
      @click.stop="openModal()"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="blue">
          </v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <router-link
      v-if="parentBreed"
      class="link"
      :to="{ name: 'SubbreedPage', params: { subbreed: dog.name, parent: parentBreed } }"
    >
      <v-card-title>
        {{ dog.name }}
      </v-card-title>
    </router-link>

    <router-link
      v-else
      class="link"
      :to="{ name: 'BreedPage', params: { breed: dog.name } }"
    >
      <v-card-title>
        {{ dog.name }}
      </v-card-title>
    </router-link>

    <!-- <v-card-actions>
      <router-link class="link" :to="{ name: 'BreedPage', params: { breed: dog.name } }">
        <v-btn color="purple" text>
          Explore
        </v-btn>
      </router-link>
    </v-card-actions> -->
  </v-card>
</template>

<script>
export default {
  name: "DoggoCard",

  data: () => ({}),
  props: {
    dog: {
      type: Object,
      required: true
    },
    parentBreed: {
      type: String
    }
  },
  methods: {
    openModal() {
      this.$emit("openModal", this.dog.img);
    }
  }
};
</script>

<style lang="scss" scoped>
.link {
  color: black;
  text-decoration: none;
}
</style>
