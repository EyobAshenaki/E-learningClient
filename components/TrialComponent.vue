<template>
  <v-row class="ma-auto mt-8">
    <v-card flat>
      <v-tabs v-model="tabs" background-color="transparent" color="blue" grow>
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <AdminAllAccounts />
        </v-tab-item>
        <v-tab-item>
          <AdminStudentsStudents />
        </v-tab-item>
        <v-tab-item>
          <AdminTeachersTeachers />
        </v-tab-item>
        <v-tab-item>
          <AdminCourseManagerCourseManager />
        </v-tab-item>
        <v-tab-item>
          <AdminAdminsAdmins />
        </v-tab-item>
        <v-tab-item>
          <AdminDepartmentAdminsDepAdmins />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    tabs: null,
    items: [
      'All Users',
      'Students',
      'Teachers',
      'Course Managers',
      'Administartors',
      'Department Administrtors',
    ],
  }),
}
</script>
