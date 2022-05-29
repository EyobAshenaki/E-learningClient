<template>
  <v-container class="page-wrapper">
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
