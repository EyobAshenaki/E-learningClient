<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="11" class="mt-10">
        <div>
          <v-breadcrumbs :items="items"></v-breadcrumbs>
        </div>
        <AdminStudentsStudents />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: 'administrator',
  name: 'StudentIndexPage',
  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        href: '/administrator/_id',
      },
      {
        text: 'Students',
        disabled: true,
        href: '/administrator/_id/student',
      },
    ],
  }),
}
</script>
