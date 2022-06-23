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
            route: '/teacher',
          },
        ],
      }
    },
  }
</script>