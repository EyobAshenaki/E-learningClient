<template>
  <v-app>
    <app-header />
    <app-side-bar />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppSideBar from '@/components/AppSideBar.vue'
export default {
  name: 'NavLayout',
  components: { AppHeader, AppSideBar },
  // comments: {
  //   AppHeader,
  //   AppSideBar
  // },
  data() {
    return {}
  },
}
</script>
