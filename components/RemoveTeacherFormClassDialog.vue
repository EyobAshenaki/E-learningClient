<template>
  <v-dialog width="25%">
    <template #activator="{ on, attrs }">
      <v-btn
        outlined
        color="orange darken-4"
        v-bind="attrs"
        v-on="on"
        @click="getAssignedTeachersOfCourses"
      >
        Remove
      </v-btn>
    </template>
    <template #default="dialog">
      <v-card>
        <v-card-title> Remove Teacher from a Class </v-card-title>
        <v-card-text class="pb-0">
          <v-select
            v-model="seletedRemoveTeacher"
            :items="assignedTeachersOfCourse"
            item-text="firstName"
            :menu-props="{ bottom: true, offsetY: true }"
            outlined
            clearable
            return-object
            label="Teacher"
          ></v-select>
        </v-card-text>
        <v-card-actions class="pt-0 justify-space-between">
          <v-btn text color="error" @click="closeRemoveTeacherFromClass(dialog)"
            >Cancel</v-btn
          >
          <v-btn text color="primary" @click="removeTeacherFromClass(dialog)">
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
    assignedTeachersOfCourse: {
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
      seletedRemoveTeacher: null,
    }
  },

  methods: {
    getAssignedTeachersOfCourses() {
      this.$emit('getAssignedTeachers')
    },
    closeRemoveTeacherFromClass(dialog) {
      dialog.value = false
      //* for updating fot the last element is removed
      // this.$emit('updateDom', true)

      this.$nextTick(() => {
        this.seletedRemoveTeacher = null

        this.$emit('updateComponent')
      })
    },

    async removeTeacherFromClass(dialog) {
      const query = `mutation dismissTeacherFromClass($teacherId: ID!, $classId: ID!) {
                      dismissTeacherFromClass(teacherId: $teacherId, classId: $classId)
                    }`

      const variables = {
        teacherId: this.seletedRemoveTeacher.id,
        classId: this.$nuxt.context.params.sectionId,
      }

      const dismissTeacherFromClassResponse = await this.$axios.post(
        '/graphql',
        {
          query,
          variables,
        }
      )

      const isTeacherDismissed =
        dismissTeacherFromClassResponse.data.data.dismissTeacherFromClass

      if (isTeacherDismissed) {
        console.log('Teacher Dismissed')
      }

      this.closeRemoveTeacherFromClass(dialog)
    },
  },
}
</script>
