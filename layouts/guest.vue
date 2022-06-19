<template>
  <DefaultLayout>
    <template #nav>
      <div></div>
    </template>
  </DefaultLayout>
</template>
<script>
  import DefaultLayout from './default.vue'
  export default {
    components: { DefaultLayout },
    middleware: 'guest',
  }
</script>
