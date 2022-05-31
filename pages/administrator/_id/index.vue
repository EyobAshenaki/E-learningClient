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
  export default {
    name: 'AdminIndexPage',
    layout: 'admin',
    data: () => ({
      items: [
        {
          text: 'Dashboard',
        },
      ],
    }),
  }
