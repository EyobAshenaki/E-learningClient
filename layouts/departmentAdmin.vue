<template>
  <v-app>
    <department-admin-side-bar />
    <v-main class="grey lighten-4">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import DepartmentAdminSideBar from '@/components/DepartmentAdminSideBar.vue'
  export default {
    name: 'DepartmentAdminLayout',
    components: {
      DepartmentAdminSideBar,
    },

    data() {
      return {}
    },
  }
</script>
