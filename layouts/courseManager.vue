<template>
  <v-app>
    <course-manager-side-bar />
    <v-main class="grey lighten-4">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import CourseManagerSideBar from '~/components/CourseManagerSideBar.vue'
  export default {
    name: 'NavLayout',
    components: { CourseManagerSideBar },
    data() {
      return {}
    },
  }
</script>
