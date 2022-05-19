<template>
  <v-app>
    <app-header />
    <admin-side-bar />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AdminSideBar from '~/components/AdminSideBar.vue'
export default {
  name: 'NavLayout',
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