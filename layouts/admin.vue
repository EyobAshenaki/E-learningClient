<template>
  <DefaultLayout>
    <template #nav>
      <AuthNav />
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
