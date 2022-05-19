<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="11" class="mt-10">
        <div>
          <v-breadcrumbs :items="items"></v-breadcrumbs>
        </div>
        <AdminDeptTableTabs />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: 'administrator',
  name: 'DepartmentIndexPage',
  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        href: '/administrator/_id',
      },
      {
        text: 'Department',
        disabled: true,
        href: '/administrator/_id/department',
      },
    ],
  }),
}
</script>
