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
    created() {
      // todo! replace 'f8263dd9-060f-4449-a568-9d7c90b16172' with current
      //! logged-in course onwer user
      this.$store.dispatch(
        'course-management/fetchCourseOwner',
        'f8263dd9-060f-4449-a568-9d7c90b16172'
      )
      const owner = this.$store.getters['course-management/getCourseOwner']
      this.courses = owner?.ownedCourses
    },
  }
</script>

<style lang="scss" scoped></style>
