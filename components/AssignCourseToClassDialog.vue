<template>
  <v-dialog width="25%">
    <template #activator="{ on, attrs }">
      <v-btn
        outlined
        color="orange darken-4"
        v-bind="attrs"
        v-on="on"
        @click="getUnassignedCourses"
      >
        Assign
      </v-btn>
    </template>
    <template #default="dialog">
      <v-card>
        <v-card-title> Assign Course to a Class </v-card-title>
        <v-card-text class="pb-0">
          <v-select
            v-model="seletedAssignCourse"
            :items="unassignedCourses"
            item-text="name"
            :menu-props="{ bottom: true, offsetY: true }"
            outlined
            clearable
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
      required: true,
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
      //   this.updateDom = true

      this.$nextTick(() => {
        this.seletedAssignCourse = null

        this.$emit('updateComponent')
      })
    },

    async assignCourseToClass(dialog) {
      const query = `mutation assignClassToCourse($courseId: ID!, $classId: ID!) {
                      assignClassToCourse(courseId: $courseId, classId: $classId)
                    }`

      const variables = {
        courseId: this.seletedAssignCourse.id,
        classId: this.classId,
      }

      const assignClassToCourseResponse = await this.$axios.post('/graphql', {
        query,
        variables,
      })

      const isCourseAssigned =
        assignClassToCourseResponse.data.data.assignClassToCourse

      if (isCourseAssigned) {
        console.log('Course Assigned')
      }

      this.closeAssignCourseToClass(dialog)
    },
  },
}
</script>
