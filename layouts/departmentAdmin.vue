<template>
  <v-app>
    <app-header />
    <department-admin-side-bar />
    <v-main class="grey lighten-4">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import AppHeader from '@/components/AppHeader.vue'
  import DepartmentAdminSideBar from '@/components/DepartmentAdminSideBar.vue'
  export default {
    name: 'DepartmentAdminLayout',
    components: { AppHeader, DepartmentAdminSideBar },

    data() {
      return {}
    },
  }
</script>
