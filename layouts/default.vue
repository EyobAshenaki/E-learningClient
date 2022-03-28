<template>
  <v-app>
    <app-header />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
export default {
  name: 'DefaultLayout',
  components: { AppHeader },
  // comments: {
  //   AppHeader
  // },
  data() {
    return {}
  },
}
</script>
