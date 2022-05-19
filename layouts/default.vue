<template>
  <v-app>
    <app-header />
    <admin-side-bar />
    <v-main>
      <v-container class="main-container" fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <ToastSnackbar />
  </v-app>
</template>

<script>
  import AppHeader from '@/components/AppHeader.vue'
  import AdminSideBar from '~/components/AdminSideBar.vue'
  export default {
    name: 'DefaultLayout',
    components: { AppHeader, AdminSideBar },
    // comments: {
    //   AppHeader,
    //   AdminSideBar
    // },
    data() {
      return {}
    },
  }
</script>
