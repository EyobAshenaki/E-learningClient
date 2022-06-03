<template>
  <DefaultLayout>
    <template #nav>
      <AuthNav />
    </template>
    <template #sideNav>
      <AdminSideBar />
    </template>
    <Nuxt />
  </DefaultLayout>
</template>
<script>
  import DefaultLayout from './default.vue'
  export default {
    components: { DefaultLayout },
    middleware: ['authenticated', 'admin'],
  }
</script>
