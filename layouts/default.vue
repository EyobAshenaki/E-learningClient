<template>
  <v-container class="main-container">
    <Nuxt />
  </v-container>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {}
  },
}
</script>

<style scoped>
.main-container {
  /* background-image: linear-gradient(to bottom right, #0156d2, #d20156); */
  background-color: #f8f8ff;
  max-width: 100%;
  max-height: 100%;
  margin: auto;
}
</style>
