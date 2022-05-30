<template>
  <DefaultLayout>
    <template #nav>
      <AuthNav />
    </template>
  </DefaultLayout>
</template>
<script>
  import DefaultLayout from './default.vue'
  export default {
    components: { DefaultLayout },
    middleware: 'authenticated',
  }
</script>
