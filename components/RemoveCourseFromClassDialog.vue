<template>
  <v-dialog width="25%">
    <template #activator="{ on, attrs }">
      <v-btn
        v-if="isSingleRemove"
        outlined
        color="orange darken-4"
        v-bind="attrs"
        v-on="on"
        @click="getAssignedCourses"
      >
        Remove
      </v-btn>
      <v-btn
        v-else
        block
        outlined
        class="ml-0"
        color="orange darken-4"
        v-bind="attrs"
        v-on="on"
        @click="getAssignedCourses"
      >
        <v-icon class="pr-2" color="orange darken-4">
          mdi-book-minus-multiple
        </v-icon>
        <span class="orange--text text--darken-4"> Remove Courses </span>
      </v-btn>
    </template>
    <template #default="dialog">
      <v-card>
        <v-card-title>
          {{
            isSingleRemove
              ? 'Remove Course from a Class'
              : 'Remove Courses from a Classes'
          }}
        </v-card-title>
        <v-card-text class="pb-0">
          <v-select
            v-model="seletedRemoveCourse"
            :items="assignedCourses"
            item-text="name"
            :menu-props="{ bottom: true, offsetY: true }"
            outlined
            clearable
            :multiple="!isSingleRemove"
            return-object
            label="Course"
          ></v-select>
        </v-card-text>
        <v-card-actions class="pt-0 justify-space-between">
          <v-btn text color="error" @click="closeRemoveCourseFromClass(dialog)"
            >Cancel</v-btn
          >
          <v-btn text color="primary" @click="removeCourseFromClass(dialog)">
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
    assignedCourses: {
      type: Array,
      required: true,
    },
    classId: {
      type: String,
      default: '',
    },
    isSingleRemove: {
      type: Boolean,
      default: true,
    },
    classesIds: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      seletedRemoveCourse: null,
    }
  },

  methods: {
    getAssignedCourses() {
      this.$emit('getAssignedCourses')
    },

    closeRemoveCourseFromClass(dialog) {
      dialog.value = false

      this.$nextTick(() => {
        this.seletedRemoveCourse = null

        this.$emit('updateComponent')
      })
    },

    async unassignCourseFromClass(courseId, classId) {
      const query = `mutation unassignClassFromCourse($courseId: ID!, $classId: ID!) {
                      unassignClassFromCourse(courseId: $courseId, classId: $classId)
                    }`

      const variables = {
        courseId,
        classId,
      }

      const unassignClassFromCourseResponse = await this.$axios.post(
        '/graphql',
        {
          query,
          variables,
        }
      )

      return unassignClassFromCourseResponse.data.data.unassignClassFromCourse
    },

    async unassignClassesFromCourses(coursesIds, classesIds) {
      const query = `mutation unassignClassesFromCourses ($coursesIds: UUIDArrayDto! $classesIds: UUIDArrayDto!) {
                      unassignClassesFromCourses (coursesIds: $coursesIds classesIds: $classesIds)
                    }`

      const variables = {
        coursesIds,
        classesIds,
      }

      const unassignClassesFromCoursesResponse = await this.$axios.post(
        '/graphql',
        {
          query,
          variables,
        }
      )

      return unassignClassesFromCoursesResponse.data.data
        .unassignClassesFromCourses
    },

    removeCourseFromClass(dialog) {
      if (!this.isSingleRemove) {
        const coursesIds = {
          ids: this.seletedRemoveCourse.map((course) => course.id),
        }
        const classesIds = {
          ids: this.classesIds,
        }

        const isCoursesRemoved = this.unassignClassesFromCourses(
          coursesIds,
          classesIds
        )

        if (isCoursesRemoved) {
          console.log('Courses Removed')
        }
      } else if (this.isSingleRemove) {
        const isCourseRemoved = this.unassignCourseFromClass(
          this.seletedRemoveCourse.id,
          this.classId
        )

        if (isCourseRemoved) {
          console.log('Course Removed')
        }
      }

      this.closeRemoveCourseFromClass(dialog)
    },
  },
}
</script>
