<template>
  <section style="width: 100%">
    <v-col cols="12" class="pb-0 pt-5 d-flex justify-space-between">
      <span class="text-h5"> Courses </span>

      <div>
        <!-- Remove Course dialog -->
        <remove-course-from-class-dialog
          :class-id="classId"
          :assigned-courses="assignedCourses"
          @updateComponent="updateComponent"
        />

        <!-- Assign Course dialog -->
        <assign-course-to-class-dialog
          :class-id="classId"
          :unassigned-courses="unassignedCourses"
          @updateComponent="updateComponent"
        />
      </div>
    </v-col>

    <!-- Courses Body Section -->
    <template v-if="assignedCourses">
      <v-col
        v-for="course in assignedCourses"
        :key="course.id"
        class="pa-2"
        cols="12"
      >
        <course-info-card :course="course" />
      </v-col>
    </template>
  </section>
</template>

<script>
export default {
  props: {
    classId: {
      type: String,
      required: true,
    },
    unassignedCourses: {
      type: Array,
      required: true,
    },
    assignedCourses: {
      type: Array,
      required: true,
    },
  },

  methods: {
    updateComponent() {
      this.$emit('updateComponent')
    },
  },
}
</script>
