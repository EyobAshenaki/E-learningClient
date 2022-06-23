<template>
  <div>
    <h1>Home Page</h1>
  </div>
</template>
<script>
  export default {
    layout: 'authenticated',
    middleware({ store, redirect }) {
      if (store.getters['auth/isAdmin']) {
        return redirect('/administrator')
      } else if (store.getters['auth/isCourseManager']) {
        return redirect('/courseManager')
      } else if (store.getters['auth/isDepartmentAdmin']) {
        return redirect('/departmentAdministrator')
      } else if (store.getters['auth/isTeacher']) {
        return redirect('/teacher')
      }
    },
  }
</script>
