<template>
  <v-row justify="center" align="center">
    <v-col cols="11" class="mt-10">
      <div class="blue--text">
        <v-breadcrumbs :items="items"></v-breadcrumbs>
      </div>
      <AdminDashboardCards />
      <AdminDashTableTabs />
      <!-- <AdminStudentsStudents v-if="studentToggle" /> -->
    </v-col>
  </v-row>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
export default {
  layout: 'administrator',
  name: 'AdminIndexPage',
  data: () => ({
    items: [
      {
        text: 'Dashboard',
      },
    ],
  }),
  // computed: mapState(['studentToggle']),
  // methods: {
  //   ...mapActions(['viewStudents']),
  // },
}
</script>
