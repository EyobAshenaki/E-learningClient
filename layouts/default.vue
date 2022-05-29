<template>
  <v-app>
    <GuestNav />
    <v-container class="main-container" fluid>
      <Nuxt />
    </v-container>
    <ToastSnackbar :activator.sync="toast" :content="toastContent" />
  </v-app>
</template>

<script>
import ToastSnackbar from '~/components/toast-snackbar.vue'
export default {
  components: { ToastSnackbar },
  data() {
    return {
      toast: false,
      toastContent: {},
    }
  },
  created() {
    this.$nuxt.$on('toast-notification', (event) => {
      this.toast = true
      this.toastContent = event
    })
  },
}
</script>
