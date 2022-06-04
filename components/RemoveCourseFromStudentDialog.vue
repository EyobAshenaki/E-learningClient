<template>
  <v-dialog :retain-focus="false" width="25%">
    <template #activator="{ on: dialogOn, attrs: dialogAttrs }">
      <v-tooltip top>
        <template #activator="{ on: tooltipOn, attrs: tooltipAttrs }">
          <v-icon
            size="20"
            color="error lighten-1"
            v-bind="{ ...dialogAttrs, ...tooltipAttrs }"
            v-on="{ ...tooltipOn, ...dialogOn }"
          >
            mdi-book-minus
          </v-icon>
        </template>
        <span>Remove Course</span>
      </v-tooltip>
    </template>
    <template #default="dialog">
      <v-card>
        <v-card-title> Remove Course </v-card-title>
        <v-card-text class="pb-0">
          <v-select
            v-model="seletedStudentRemovedCourses"
            :items="student.attendingCourses"
            item-text="name"
            :menu-props="{ bottom: true, offsetY: true }"
            multiple
            outlined
            clearable
            return-object
            label="Courses"
          ></v-select>
        </v-card-text>
        <v-card-actions class="pt-0 d-flex justify-space-between">
          <v-btn text color="error" @click="closeRemoveCourses(dialog)">
            Cancel
          </v-btn>
          <v-btn text color="primary" @click="removeCourses(dialog)">
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: {
    student: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      seletedStudentRemovedCourses: null,
    }
  },

  methods: {
    async unassignStudentFromCourse(courseId, studentId) {
      const query = `mutation unassignStudentFromCourse ($courseId: ID! $studentId: ID!) {
                      unassignStudentFromCourse (courseId: $courseId studentId: $studentId)
                    }`

      const variables = {
        courseId,
        studentId,
      }

      const unassignStudentToCourseFromsponse = await this.$axios.post(
        '/graphql',
        {
          query,
          variables,
        }
      )

      return unassignStudentToCourseFromsponse.data.data
        .unassignStudentFromCourse
    },

    closeRemoveCourses(dialog) {
      this.$nextTick(() => {
        this.seletedStudentRemovedCourses = null
        this.$emit('updateComponent')
      })
      dialog.value = false
    },

    removeCourses(dialog) {
      for (const selectedCourse of this.seletedStudentRemovedCourses) {
        const isCourseRemoved = this.unassignStudentFromCourse(
          selectedCourse.id,
          this.student.id
        )
        if (!isCourseRemoved) {
          console.warn('Course Removal Failed')
          break
        }

        console.log('Course Removal Success')
      }

      this.closeRemoveCourses(dialog)
    },
  },
}
</script>
