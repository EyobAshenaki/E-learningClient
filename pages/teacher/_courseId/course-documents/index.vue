<template>
  <div>
    <h1>Documents</h1>
    <v-divider></v-divider>
    <course-document-list class="mt-3" :course-id="$route.params.courseId" />
  </div>
</template>

<script>
export default {
  layout: 'teacher'
}
</script>