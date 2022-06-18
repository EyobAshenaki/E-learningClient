<template>
  <v-app>
    <student-side-bar />
    <v-main class="grey lighten-4">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import StudentSideBar from '~/components/StudentSideBar.vue'
  export default {
    name: 'NavLayout',
    components: { StudentSideBar },
    data() {
      return {}
    },
  }
</script>
