<template>
  <SideBar :items="items" />
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {
            title: 'Dashboard',
            icon: 'mdi-view-dashboard',
            route: '/courseManager',
          },
          {
            title: 'Teachers',
            icon: 'mdi-account-group',
            route: '/courseManager/teachers',
          },
        ],
        mini: true,
      }
    },
  }
</script>
