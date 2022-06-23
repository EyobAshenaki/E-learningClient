<template>
  <div>
    <assignment-definition-list class="mt-3" :course-id="$route.params.courseId" />
  </div>
</template>

<script>
  export default {
    layout: 'teacher'
  }
</script>

<style lang="scss" scoped></style>
