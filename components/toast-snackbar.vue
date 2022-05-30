<template>
  <v-snackbar
    v-model="toast"
    :color="statusColor"
    timeout="3000"
    transition="fade-transition"
  >
    {{ message || 'Unknown Error' }}
    <template #action="{ attrs }">
      <v-btn v-bind="attrs" icon @click="display = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
  export default {
    data() {
      return {
        toast: false,
        toastContent: {},
      }
    },
    computed: {
      message() {
        return this.toastContent.message
      },
      statusColor() {
        let color
        switch (this.toastContent.status) {
          case 'SUCCESS': {
            color = 'green'
            break
          }
          case 'WARNING': {
            color = 'orange lighten-1'
            break
          }
          case 'ERROR': {
            color = 'red lighten-2'
            break
          }
          default: {
            color = 'red'
          }
        }
        return color
      },
    },
    mounted() {
      this.$nuxt.$on('toast-notification', (event) => {
        this.toast = true
        this.toastContent = event
      })
    },
  }
</script>
