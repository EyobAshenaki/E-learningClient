<template>
  <v-app>
    <slot name="nav">
      <AppNav />
    </slot>
    <slot name="sideNav" />
    <v-main>
      <v-container class="main-container" fluid>
        <slot>
          <Nuxt v-if="!$slots.default" />
        </slot>
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
