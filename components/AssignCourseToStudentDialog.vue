<template>
  <v-dialog :retain-focus="false" width="25%">
    <template #activator="{ on: dialogOn, attrs: dialogAttrs }">
      <v-tooltip top>
        <template #activator="{ on: tooltipOn, attrs: tooltipAttrs }">
          <v-icon
            size="20"
            class="mr-1"
            color="primary lighten-2"
            v-bind="{ ...dialogAttrs, ...tooltipAttrs }"
            v-on="{ ...tooltipOn, ...dialogOn }"
            @click.stop="enrollStudentToCourses()"
          >
            mdi-book-plus
          </v-icon>
        </template>
        <span>Assign Course</span>
      </v-tooltip>
    </template>
    <template #default="dialog">
      <v-card>
        <v-card-title> Assign Course </v-card-title>
        <v-card-text class="pb-0">
          <v-select
            v-model="seletedStudentAssignedCourses"
            :items="studentUnassignedCourses"
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
          <v-btn text color="error" @click="closeAssignCourses(dialog)">
            Cancel
          </v-btn>
          <v-btn text color="primary" @click="assignCourses(dialog)">
            Assign
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
    courses: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      seletedStudentAssignedCourses: null,
      studentUnassignedCourses: [],
    }
  },

  methods: {
    organizeStudentCourses() {
      for (const course of this.courses) {
        let existsFlag = false
        for (const attCourse of this.student.attendingCourses) {
          if (attCourse.id === course.id) {
            existsFlag = true
            break
          }
        }
        if (!existsFlag) this.studentUnassignedCourses.push(course)
      }
    },

    async assignStudentToCourse(courseId, studentId) {
      const query = `mutation assignStudentToCourse ($courseId: ID! $studentId: ID!) {
                      assignStudentToCourse (courseId: $courseId studentId: $studentId)
                    }`

      const variables = {
        courseId,
        studentId,
      }

      const assignStudentToCourseResponse = await this.$axios.post('/graphql', {
        query,
        variables,
      })

      return assignStudentToCourseResponse.data.data.assignStudentToCourse
    },

    enrollStudentToCourses(item) {
      this.studentUnassignedCourses = []
      this.organizeStudentCourses(item)
    },

    closeAssignCourses(dialog) {
      this.$nextTick(() => {
        this.seletedStudentAssignedCourses = null
        this.$emit('updateComponent')
      })

      dialog.value = false
    },

    assignCourses(dialog) {
      for (const selectedCourse of this.seletedStudentAssignedCourses) {
        const isCourseAssigned = this.assignStudentToCourse(
          selectedCourse.id,
          this.student.id
        )
        if (!isCourseAssigned) {
          console.warn('Course Assignation Failed')
          break
        }
        console.log('Course Assignation Success')
      }

      this.closeAssignCourses(dialog)
    },
  },
}
</script>
