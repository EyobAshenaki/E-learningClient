<template>
  <v-dialog width="25%">
    <template #activator="{ on, attrs }">
      <v-btn outlined color="orange darken-4" v-bind="attrs" v-on="on">
        Remove
      </v-btn>
    </template>
    <template #default="dialog">
      <v-card>
        <v-card-title> Remove Course from a Class </v-card-title>
        <v-card-text class="pb-0">
          <v-select
            v-model="seletedRemoveCourse"
            :items="assignedCourses"
            item-text="name"
            :menu-props="{ bottom: true, offsetY: true }"
            outlined
            clearable
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
      required: true,
    },
  },

  data() {
    return {
      seletedRemoveCourse: null,
    }
  },

  methods: {
    closeRemoveCourseFromClass(dialog) {
      dialog.value = false

      this.$nextTick(() => {
        this.seletedRemoveCourse = null

        this.$emit('updateComponent')
      })
    },

    async removeCourseFromClass(dialog) {
      const query = `mutation unassignClassFromCourse($courseId: ID!, $classId: ID!) {
                      unassignClassFromCourse(courseId: $courseId, classId: $classId)
                    }`

      const variables = {
        courseId: this.seletedRemoveCourse.id,
        classId: this.classId,
      }

      const unassignClassFromCourseResponse = await this.$axios.post(
        '/graphql',
        {
          query,
          variables,
        }
      )

      const isCourseRemoved =
        unassignClassFromCourseResponse.data.data.unassignClassFromCourse

      if (isCourseRemoved) {
        console.log('Course Removed')
      }

      this.closeRemoveCourseFromClass(dialog)
    },
  },
}
</script>
