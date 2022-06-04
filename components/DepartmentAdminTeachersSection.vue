<template>
  <section class="mb-8" style="width: 100%">
    <v-col cols="12" class="pb-0 pt-5 d-flex justify-space-between">
      <span class="text-h5"> Teachers </span>

      <div>
        <!-- Remove Teacher dialog -->
        <remove-teacher-form-class-dialog
          :class-id="classId"
          :assigned-teachers-of-course="assignedTeachersOfCourse"
          @getAssignedTeachers="getAllTeachersOfCourses"
          @updateComponent="updateComponent"
        />

        <!-- Assign Teacher dialog -->
        <assign-teacher-to-class-dialog
          :class-id="classId"
          :unassigned-teachers-of-course="unassignedTeachersOfCourse"
          @getUnassignedTeachers="getAllTeachersOfCourses"
          @updateComponent="updateComponent"
        />
      </div>
    </v-col>

    <!-- Teacher Bodu Section -->
    <template v-if="teachers">
      <v-col
        v-for="teacher in teachers"
        :key="teacher.id"
        class="pb-0"
        cols="12"
      >
        <teacher-info-card :teacher="teacher" />
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
    teachers: {
      type: Array,
      required: true,
    },
    courses: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      assignedTeachersOfCourse: [],
      unassignedTeachersOfCourse: [],
    }
  },

  methods: {
    updateComponent() {
      this.$emit('updateComponent')
    },

    getAllTeachersOfCourses() {
      this.unassignedTeachersOfCourse = []
      this.assignedTeachersOfCourse = [...this.teachers]

      for (const course of this.courses) {
        for (const teacher of course.teachers) {
          let existsFlag = false
          for (const assignedTeacher of this.teachers) {
            if (teacher.id === assignedTeacher.id) {
              existsFlag = true
              break
            }
          }
          if (!existsFlag) this.unassignedTeachersOfCourse.push(teacher)
        }
      }
    },
  },
}
</script>
