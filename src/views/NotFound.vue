<template>
  <div>
    <h1>404 - Not found</h1>
    <p>
      Oops we couldn't find that page. Try going
      <router-link :to="{ name: 'Home' }">home</router-link>
    </p>
  </div>
</template>

<style lang="scss" scoped>
div {
  text-align: center;
}
</style>
