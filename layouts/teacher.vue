<template>
  <DefaultLayout>
    <template #nav>
      <AuthNav />
    </template>
    <template #sideNav>
      <TeacherSideBar />
    </template>
    <Nuxt />
  </DefaultLayout>
</template>
<script>
  import DefaultLayout from './default.vue'
  export default {
    components: { DefaultLayout },
    middleware: ['authenticated'],
  }
</script>
