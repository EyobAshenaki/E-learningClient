<template>
  <DefaultLayout>
    <template #nav>
      <AuthNav/>
    </template>
    <template #sideNav>
      <CourseManagerSideBar/>
    </template>
  </DefaultLayout>
</template>

<script>
  import DefaultLayout from './default.vue'
  import CourseManagerSideBar from '~/components/CourseManagerSideBar.vue'
  export default {
    name: 'NavLayout',
    components: { CourseManagerSideBar , DefaultLayout},
    middleware: ['authenticated', 'courseManager'],
    data() {
      return {}
    },
  }
</script>
