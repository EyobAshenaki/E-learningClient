<template>
  <v-dialog width="50%">
    <template #activator="{ on, attrs }">
      <v-btn
        outlined
        color="orange darken-4"
        v-bind="attrs"
        v-on="on"
        @click="admitStudents"
      >
        Admit
      </v-btn>
    </template>
    <template #default="dialog">
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <span> Admit Students to a Class </span>
          <v-icon @click="closeAdmitStudents(dialog)">mdi-close</v-icon>
        </v-card-title>
        <v-btn
          class="d-flex ml-auto mr-9"
          color="primary lighten-1"
          @click="confirmAdmitStudents(dialog)"
          >Save</v-btn
        >
        <v-card-text class="pb-0">
          <students-table
            :students="unassignedStudents"
            :is-rows-in-table-selectable="isSelectable"
            @selectionChange="updateSelectedStudents($event)"
          />
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: {
    classId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      students: [],
      unassignedStudents: [],
      isSelectable: false,
      selectedStudents: [],
    }
  },

  methods: {
    async getDepartmentStudents() {
      const query = `query students($filter: UserFilter) {
                        users(filter: $filter) {
                            id
                            firstName
                            middleName
                            lastName
                            email
                            attendingClass {
                                id
                                year
                                section
                            }
                        }
                    }`
      const variables = {
        filter: {
          roleName: 'STUDENT',
        },
      }

      const studentsResponse = await this.$axios.post('/graphql', {
        query,
        variables,
      })

      this.students = studentsResponse.data.data.users
    },

    async admitStudents() {
      await this.getDepartmentStudents()

      this.unassignedStudents = this.students.filter(
        (student) => !student.attendingClass
      )

      this.isSelectable = true
    },

    updateSelectedStudents(students) {
      this.selectedStudents = [...students]
    },

    async admitStudentsToClass(studentIds, classId) {
      const query = `mutation admitStudentsToClass($studentIds: UUIDArrayDto!, $classId: ID!) {
                      admitStudentsToClass(studentIds: $studentIds, classId: $classId)
                    }`
      const variables = {
        studentIds,
        classId,
      }

      const admitStudentsToClassResponse = await this.$axios.post('/graphql', {
        query,
        variables,
      })

      return admitStudentsToClassResponse.data.data.admitStudentsToClass
    },

    closeAdmitStudents(dialog) {
      this.$nextTick(() => {
        this.selectedStudents = []
      })

      dialog.value = false
    },

    confirmAdmitStudents(dialog) {
      const studentIds = {
        ids: this.selectedStudents.map((selectedStudent) => selectedStudent.id),
      }
      this.admitStudentsToClass(studentIds, this.classId)
      this.$emit('updateComponent')

      this.closeAdmitStudents(dialog)
    },
  },
}
</script>
