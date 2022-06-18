<template>
  <v-app>
    <student-side-bar />
    <v-main>
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
