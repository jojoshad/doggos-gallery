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

    <v-card-title>
      {{ dog.name }}
    </v-card-title>

    <v-card-actions>
      <v-btn color="purple" text>
        Explore
      </v-btn>
    </v-card-actions>
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
    }
  },
  methods: {
    openModal() {
      this.$emit("openModal", this.dog.img);
    }
  }
};
</script>
