<template>
  <DefaultLayout>
    <template #nav>
      <AuthNav />
    </template>
    <template #sideNav>
      <DepartmentAdminSideBar />
    </template>
  </DefaultLayout>
</template>

<script>
  import DefaultLayout from './default.vue'
  export default {
    name: 'departmentAdmin',
    components: { DefaultLayout },
    middleware: ['authenticated', 'departmentAdmin'],
  }
</script>
