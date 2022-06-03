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
        return redirect('/course-manager')
      }
    },
  }
</script>
