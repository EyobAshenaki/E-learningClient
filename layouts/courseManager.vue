<template>
  <v-app>
    <app-header />
    <course-manager-side-bar />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import CourseManagerSideBar from '~/components/CourseManagerSideBar.vue'
export default {
  name: 'NavLayout',
  components: { AppHeader, CourseManagerSideBar },
  data() {
    return {}
  },
}
</script>
