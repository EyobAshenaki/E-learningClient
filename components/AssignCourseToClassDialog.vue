<template>
  <v-dialog width="25%">
    <template #activator="{ on, attrs }">
      <v-btn
        v-if="isSingleAssign"
        outlined
        color="orange darken-4"
        v-bind="attrs"
        v-on="on"
        @click="getUnassignedCourses"
      >
        Assign
      </v-btn>
      <v-btn
        v-else
        block
        outlined
        class="mb-2"
        color="#25327F lighten-4"
        v-bind="attrs"
        v-on="on"
        @click="getUnassignedCourses"
      >
        <v-icon class="pr-2" style="color: #25327f">
          mdi-book-plus-multiple
        </v-icon>
        <span style="color: #25327f"> Assign Courses </span>
      </v-btn>
    </template>
    <template #default="dialog">
      <v-card>
        <v-card-title>
          {{
            isSingleAssign
              ? 'Assign Course to a Class'
              : 'Assign Courses to a Classes'
          }}
        </v-card-title>
        <v-card-text class="pb-0">
          <v-select
            v-model="seletedAssignCourse"
            :items="unassignedCourses"
            item-text="name"
            :menu-props="{ bottom: true, offsetY: true }"
            outlined
            clearable
            :multiple="!isSingleAssign"
            return-object
            label="Course"
          ></v-select>
        </v-card-text>
        <v-card-actions class="pt-0 justify-space-between">
          <v-btn text color="error" @click="closeAssignCourseToClass(dialog)"
            >Cancel</v-btn
          >
          <v-btn text color="primary" @click="assignCourseToClass(dialog)"
            >Assign</v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: {
    unassignedCourses: {
      type: Array,
      required: true,
    },
    classId: {
      type: String,
      default: '',
    },
    isSingleAssign: {
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
      seletedAssignCourse: null,
    }
  },

  methods: {
    getUnassignedCourses() {
      this.$emit('getUnassignedCourses')
    },

    closeAssignCourseToClass(dialog) {
      dialog.value = false

      this.$nextTick(() => {
        this.seletedAssignCourse = null

        this.$emit('updateComponent')
      })
    },

    async assignClassToCourse(courseId, classId) {
      const query = `mutation assignClassToCourse($courseId: ID!, $classId: ID!) {
                      assignClassToCourse(courseId: $courseId, classId: $classId)
                    }`

      const variables = {
        courseId,
        classId,
      }

      const assignClassToCourseResponse = await this.$axios.post('/graphql', {
        query,
        variables,
      })

      return assignClassToCourseResponse.data.data.assignClassToCourse
    },

    async assignClassesToCourses(coursesIds, classesIds) {
      const query = `mutation assignClassesToCourses ($coursesIds: UUIDArrayDto! $classesIds: UUIDArrayDto!) {
                      assignClassesToCourses (coursesIds: $coursesIds classesIds: $classesIds)
                    }`

      const variables = {
        coursesIds,
        classesIds,
      }

      const assignClassesToCoursesResponse = await this.$axios.post(
        '/graphql',
        {
          query,
          variables,
        }
      )

      return assignClassesToCoursesResponse.data.data.assignClassesToCourses
    },

    assignCourseToClass(dialog) {
      if (!this.isSingleAssign) {
        const coursesIds = {
          ids: this.seletedAssignCourse.map((course) => course.id),
        }
        const classesIds = {
          ids: this.classesIds,
        }

        const isCoursesAssigned = this.assignClassesToCourses(
          coursesIds,
          classesIds
        )

        if (isCoursesAssigned) {
          console.log('Courses Assigned')
        }
      } else if (this.isSingleAssign) {
        const isCourseAssigned = this.assignClassToCourse(
          this.seletedAssignCourse.id,
          this.classId
        )

        if (isCourseAssigned) {
          console.log('Course Assigned')
        }
      }

      this.closeAssignCourseToClass(dialog)
    },
  },
}
</script>
