<template>
  <v-app>
    <app-header />
    <student-side-bar />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import StudentSideBar from '~/components/StudentSideBar.vue'
export default {
  name: 'NavLayout',
  components: { AppHeader, StudentSideBar },
  // comments: {
  //   AppHeader,
  //   StudentSideBar
  // },
  data() {
    return {}
  },
}
</script>
