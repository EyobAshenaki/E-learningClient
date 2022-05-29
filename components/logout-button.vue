<template>
  <v-btn text block @click="logout">
    <v-list-item-title class="text-center"
      >Logout
      <span>
        <v-icon>mdi-exit-to-app</v-icon>
      </span></v-list-item-title
    >
  </v-btn>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$axios
        .post('/api/auth/signout')
        .then(() => {
          this.$store.dispatch('auth/logout')
        })
        .catch((error) => this.$toast.error(error.message))
    },
  },
}
</script>
