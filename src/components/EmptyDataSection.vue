<template>
  <section>
    <v-row class="noDataSection" justify="center">
      <h2>Empty</h2>
    </v-row>
    <v-row class="noDataSection" justify="center">
      <img class="noDataImg" :src="require('@/assets/empty.jpg')" />
    </v-row>
  </section>
</template>

<style lang="scss" scoped>
.noDataSection {
  padding: 40px 0;
}
.noDataImg {
  height: 400px;
}
</style>
