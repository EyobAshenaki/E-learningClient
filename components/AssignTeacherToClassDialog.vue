<template>
  <v-dialog width="25%">
    <template #activator="{ on, attrs }">
      <v-btn
        outlined
        color="orange darken-4"
        v-bind="attrs"
        v-on="on"
        @click="getUnassignedTeachersOfCourses"
      >
        Assign
      </v-btn>
    </template>
    <template #default="dialog">
      <v-card>
        <v-card-title> Assign Teacher to a Class </v-card-title>
        <v-card-text class="pb-0">
          <v-select
            v-model="seletedAssignTeacher"
            :items="unassignedTeachersOfCourse"
            item-text="firstName"
            :menu-props="{ bottom: true, offsetY: true }"
            outlined
            clearable
            return-object
            label="Teacher"
          ></v-select>
        </v-card-text>
        <v-card-actions class="pt-0 justify-space-between">
          <v-btn text color="error" @click="closeAssignTeacherToClass(dialog)"
            >Cancel</v-btn
          >
          <v-btn text color="primary" @click="assignTeacherToClass(dialog)"
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
    unassignedTeachersOfCourse: {
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
      seletedAssignTeacher: null,
    }
  },

  methods: {
    getUnassignedTeachersOfCourses() {
      this.$emit('getUnassignedTeachers')
    },

    closeAssignTeacherToClass(dialog) {
      dialog.value = false

      this.$nextTick(() => {
        this.seletedAssignTeacher = null

        this.$emit('updateComponent')
      })
    },

    async assignTeacherToClass(dialog) {
      const query = `mutation assignTeacherToClass($teacherId: ID!, $classId: ID!) {
                      assignTeacherToClass(teacherId: $teacherId, classId: $classId)
                    }`

      const variables = {
        teacherId: this.seletedAssignTeacher.id,
        classId: this.classId,
      }

      const assignTeacherToClassResponse = await this.$axios.post('/graphql', {
        query,
        variables,
      })

      const isTeacherAssigned =
        assignTeacherToClassResponse.data.data.assignTeacherToClass

      if (isTeacherAssigned) {
        console.log('Teacher Assigned')
      }

      this.closeAssignTeacherToClass(dialog)
    },
  },
}
</script>
