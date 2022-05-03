<template>
  <v-container class="index-container">
    <login-page />
  </v-container>
</template>

<script>
import loginPage from './loginPage.vue'
export default {
  name: 'IndexPage',
  components: { loginPage },
}
</script>

<style scoped>
.index-container {
  box-sizing: border-box;
  padding: 0;
  margin: auto;
  height: 96vh;
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
