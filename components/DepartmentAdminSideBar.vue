<template>
  <SideBar :items="items" />
</template>

<script>
  export default {
    data() {
      return {
        drawer: true,
        items: [
          {
            title: 'Dashboard',
            icon: 'mdi-view-dashboard',
            route: '/departmentAdministrator',
          },
          {
            title: 'Classes',
            icon: 'mdi-home-city',
            route: '/departmentAdministrator/classes',
          },
          {
            title: 'Department Students',
            icon: 'mdi-account-group-outline',
            route: '/departmentAdministrator/students',
          },
        ],
      }
    },
  }
</script>
