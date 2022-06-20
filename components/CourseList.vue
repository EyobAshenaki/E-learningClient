<template>
  <div>
    <v-subheader v-if="!courses" class="mt-3"
      >You have no courses owned yet. Please contact your department for
      support.</v-subheader
    >
    <course-card-mini
      v-for="course in courses"
      :key="course.id"
      :course="course"
      class="my-5"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return { courses: [] }
    },
    fetchOnServer:false,
    async fetch() {
     await this.$store.dispatch(
        'course-management/fetchCourseOwner',
        this.$store.getters['auth/id']
      )
      const owner = this.$store.getters['course-management/getCourseOwner']
      this.courses = owner?.ownedCourses
    },
  }
</script>

<style lang="scss" scoped></style>
