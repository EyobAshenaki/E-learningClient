<template>
  <div>
    <v-row align="center">
      <v-col cols="8" class="mt-10">
        <div>
          <v-breadcrumbs :items="items"></v-breadcrumbs>
        </div>
        <AdminStudentsStudents />
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title> Teachers </v-card-title>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col class="d-flex justify-center" cols="4">
        <v-row>
          <v-btn color="primary" dark class="mb-2"> Add New Teacher </v-btn>
          <TeacherCards />
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: 'administrator',
  name: 'ClassIndexPage',
  data: () => ({
    dialog: false,
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        href: '/administrator/_id',
      },
      {
        text: 'Class',
        disabled: true,
        href: '/administrator/_id/class',
      },
    ],
  }),
  computed: {
    classId() {
      return this.$nuxt.context.params.classId
    },
  },
}
</script>
