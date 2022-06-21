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
            route: '/administrator',
          },
          {
            title: 'All Users',
            icon: 'mdi-account',
            route: '/administrator/users',
          },
          {
            title: 'Students',
            icon: 'mdi-bookshelf',
            route: '/administrator/students',
          },
          {
            title: 'Teachers',
            icon: 'mdi-note-edit',
            route: '/administrator/teachers',
          },
          {
            title: 'Course Managers',
            icon: 'mdi-text-box-check',
            route: 'course-managers',
          },
          { title: 'Administrators', icon: 'mdi-calendar-month' },
          { title: 'Department Administrators', icon: 'mdi-calendar-month' },
        ],
      }
    },
  }
</script>