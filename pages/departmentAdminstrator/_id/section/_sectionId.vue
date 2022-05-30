<template>
  <v-row>
    <v-col cols="12">
      <!-- Header Section -->
      <v-row v-if="studentClass">
        <v-col cols="12">
          <span class="text-h4">
            {{ `Year ${studentClass.year} - Section ${studentClass.section}` }}
          </span>
        </v-col>

        <!-- Students Card -->
        <v-col cols="3">
          <v-card elevation="0" outlined>
            <v-card-text>
              <v-row>
                <v-col cols="4" class="d-flex justify-center align-center">
                  <v-avatar size="64" color="orange lighten-4">
                    <v-icon size="40" color="orange darken-2">
                      mdi-account-group
                    </v-icon>
                  </v-avatar>
                </v-col>
                <v-col cols="8">
                  <v-card-title class="pa-0 text-h5"> Students </v-card-title>
                  <v-card-title class="pa-0 text-h5">
                    {{ studentClass.students.length }}
                  </v-card-title>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Courses Card -->
        <v-col cols="3">
          <v-card elevation="0" outlined>
            <v-card-text>
              <v-row>
                <v-col cols="4" class="d-flex justify-center align-center">
                  <v-avatar size="64" color="orange lighten-4">
                    <v-icon size="40" color="orange darken-2">
                      mdi-book-multiple
                    </v-icon>
                  </v-avatar>
                </v-col>
                <v-col cols="8">
                  <v-card-title class="pa-0 text-h5"> Courses </v-card-title>
                  <v-card-title class="pa-0 text-h5">
                    {{ studentClass.attendingCourses.length }}
                  </v-card-title>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Teachers Card -->
        <v-col cols="3">
          <v-card elevation="0" outlined>
            <v-card-text>
              <v-row>
                <v-col cols="4" class="d-flex justify-center align-center">
                  <v-avatar size="64" color="orange lighten-4">
                    <v-icon size="40" color="orange darken-2">
                      mdi-account-group
                    </v-icon>
                  </v-avatar>
                </v-col>
                <v-col cols="8">
                  <v-card-title class="pa-0 text-h5"> Teachers </v-card-title>
                  <v-card-title class="pa-0 text-h5">
                    {{ studentClass.teachers.length }}
                  </v-card-title>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Creadit hours Card -->
        <v-col cols="3">
          <v-card elevation="0" outlined>
            <v-card-text>
              <v-row>
                <v-col cols="4" class="d-flex justify-center align-center">
                  <v-avatar size="64" color="orange lighten-4">
                    <v-icon size="40" color="orange darken-2">
                      mdi-timer
                    </v-icon>
                  </v-avatar>
                </v-col>
                <v-col cols="8">
                  <v-card-title class="pa-0 text-h5">
                    Credit Hours
                  </v-card-title>
                  <v-card-title class="pa-0 text-h5">
                    {{ getTotalCreditHour }}
                  </v-card-title>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <!-- Body Section -->
    <v-col cols="12">
      <v-row v-if="studentClass">
        <v-col cols="8">
          <v-row>
            <v-col cols="12" class="pb-0">
              <span class="text-h5"> Students </span>
            </v-col>
            <!-- Students section -->
            <v-col v-if="studentClass.students" cols="12">
              <v-data-table
                :headers="headers"
                :items="studentClass.students"
                class="elevation-0 pa-3"
              >
                <template #item.fullName="{ item }">
                  {{ fullName(item) }}
                </template>
                <template #item.actions="{ item }">
                  <v-tooltip top>
                    <template #activator="{ on, attrs }">
                      <v-icon
                        size="20"
                        class="mr-1"
                        color="primary lighten-2"
                        v-bind="attrs"
                        v-on="on"
                        @click.stop="enrollStudentToCourses(item)"
                      >
                        mdi-account-plus
                      </v-icon>
                    </template>
                    <span>Assign Course</span>
                  </v-tooltip>

                  <v-tooltip top>
                    <template #activator="{ on, attrs }">
                      <v-icon
                        size="20"
                        color="error lighten-1"
                        v-bind="attrs"
                        v-on="on"
                        @click.stop="removeStudentFromCourses(item)"
                      >
                        mdi-account-minus
                      </v-icon>
                    </template>
                    <span>Remove Course</span>
                  </v-tooltip>
                </template>
              </v-data-table>

              <!-- Assign Course to Student Dialog -->
              <v-dialog
                v-model="assignCourseDialog"
                :retain-focus="false"
                width="25%"
              >
                <v-card>
                  <v-card-title> Assign Course </v-card-title>
                  <v-card-text class="pb-0">
                    <v-select
                      v-model="seletedAssignCourses"
                      :items="unassignedCourses"
                      :menu-props="{ bottom: true, offsetY: true }"
                      multiple
                      outlined
                      clearable
                      label="Courses"
                    ></v-select>
                  </v-card-text>
                  <v-card-actions class="pt-0 d-flex justify-space-between">
                    <v-btn text color="error" @click="closeAssignCourses">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="assignCourses">
                      Assign
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <!-- Remove Course from Student Dialog -->
              <v-dialog
                v-model="removeCourseDialog"
                :retain-focus="false"
                width="25%"
              >
                <v-card>
                  <v-card-title> Remove Course </v-card-title>
                  <v-card-text class="pb-0">
                    <v-select
                      v-model="seletedRemoveCourses"
                      :items="assignedCourses"
                      :menu-props="{ bottom: true, offsetY: true }"
                      multiple
                      outlined
                      clearable
                      label="Courses"
                    ></v-select>
                  </v-card-text>
                  <v-card-actions class="pt-0 d-flex justify-space-between">
                    <v-btn text color="error" @click="closeRemoveCourses">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="removeCourses">
                      Remove
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="4">
          <v-row>
            <!-- Courses Head Section -->
            <v-col cols="12" class="pb-0">
              <span class="text-h5"> Courses </span>
            </v-col>

            <!-- Courses Body Section -->
            <v-col v-if="studentClass.attendingCourses" class="pb-0" cols="12">
              <v-card
                v-for="course in studentClass.attendingCourses"
                :key="course.id"
                elevation="0"
              >
                <v-card-text>
                  <v-row>
                    <v-col cols="3" class="d-flex justify-end align-center">
                      <v-avatar size="70" color="orange lighten-4">
                        <v-icon size="40" color="orange darken-2"
                          >mdi-book</v-icon
                        >
                      </v-avatar>
                    </v-col>

                    <v-col cols="9">
                      <v-row>
                        <v-col class="pa-2 pb-0" cols="12">
                          <v-card-title class="pa-0">
                            {{ course.name }}
                          </v-card-title>
                        </v-col>
                        <!-- Card Body section -->
                        <v-col class="py-5" cols="12">
                          <v-row>
                            <!-- First dection -->
                            <v-col cols="6">
                              <v-row>
                                <v-col
                                  class="pa-1 d-flex align-center justify-center"
                                  cols="4"
                                >
                                  <v-icon size="28" color="orange darken-2">
                                    mdi-clipboard-text-outline
                                  </v-icon>
                                </v-col>
                                <v-col
                                  class="pa-2 d-flex align-center"
                                  cols="8"
                                >
                                  <v-row class="pl-1">
                                    <v-col class="pa-0" cols="12">
                                      <span
                                        class="text-subtitle-1 font-weight-bold"
                                      >
                                        Course code
                                      </span>
                                    </v-col>
                                    <v-col class="pa-0 mt-n1" cols="12">
                                      <span>
                                        {{ course.code }}
                                      </span>
                                    </v-col>
                                  </v-row>
                                </v-col>
                              </v-row>
                            </v-col>

                            <!-- Secondary section -->
                            <v-col cols="6">
                              <v-row>
                                <v-col
                                  class="pa-1 d-flex align-center justify-center"
                                  cols="4"
                                >
                                  <v-icon size="28" color="orange darken-2">
                                    mdi-timer-outline
                                  </v-icon>
                                </v-col>
                                <v-col
                                  class="pa-2 d-flex align-center"
                                  cols="8"
                                >
                                  <v-row class="pl-1">
                                    <v-col class="pa-0" cols="12">
                                      <span
                                        class="text-subtitle-1 font-weight-bold"
                                      >
                                        Credit Hour
                                      </span>
                                    </v-col>
                                    <v-col class="pa-0 mt-n1" cols="12">
                                      <span>
                                        {{ course.creditHour }}
                                      </span>
                                    </v-col>
                                  </v-row>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Teachers Head Section -->
            <v-col cols="12" class="pb-0 pt-5 d-flex justify-space-between">
              <span class="text-h5"> Teachers </span>

              <div>
                <!-- Remove Teacher dialog -->
                <v-dialog width="25%">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      outlined
                      color="orange darken-4"
                      v-bind="attrs"
                      v-on="on"
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
                          :menu-props="{ bottom: true, offsetY: true }"
                          outlined
                          clearable
                          label="Teacher"
                        ></v-select>
                      </v-card-text>
                      <v-card-actions class="pt-0 justify-space-between">
                        <v-btn
                          text
                          color="error"
                          @click="closeRemoveTeacherFromClass(dialog)"
                          >Cancel</v-btn
                        >
                        <v-btn
                          text
                          color="primary"
                          @click="removeTeacherFromClass(dialog)"
                        >
                          Remove
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>

                <!-- Assign Tattcher dialog -->
                <v-dialog width="25%">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      outlined
                      color="orange darken-4"
                      v-bind="attrs"
                      v-on="on"
                    >
                      Assign
                    </v-btn>
                  </template>
                  <template #default="dialog">
                    <v-card>
                      <v-card-title> Assign Teacher to a Class </v-card-title>
                      <v-card-text class="pb-0">
                        <v-select
                          v-model="seletedCourse"
                          :items="assignedCourses"
                          :menu-props="{ bottom: true, offsetY: true }"
                          outlined
                          clearable
                          label="Courses"
                        ></v-select>
                        <v-select
                          v-model="seletedAssignTeacher"
                          :items="unassignedTeachersOfCourse"
                          :menu-props="{ bottom: true, offsetY: true }"
                          outlined
                          clearable
                          label="Teacher"
                        ></v-select>
                      </v-card-text>
                      <v-card-actions class="pt-0 justify-space-between">
                        <v-btn
                          text
                          color="error"
                          @click="closeAssignTeacherToClass(dialog)"
                          >Cancel</v-btn
                        >
                        <v-btn
                          text
                          color="primary"
                          @click="assignTeacherToClass(dialog)"
                          >Assign</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </div>
            </v-col>

            <!-- Teacher Bodu Section -->
            <v-col v-if="studentClass.teachers" class="pb-0" cols="12">
              <v-card
                v-for="teacher in studentClass.teachers"
                :key="teacher.id"
                elevation="0"
              >
                <v-card-text>
                  <v-row>
                    <v-col cols="3" class="d-flex justify-end align-center">
                      <v-avatar size="70" color="orange lighten-4">
                        <v-icon size="50" color="orange darken-2"
                          >mdi-account</v-icon
                        >
                      </v-avatar>
                    </v-col>

                    <v-col cols="9">
                      <v-row>
                        <v-col class="pa-2 pb-0" cols="12">
                          <v-card-title class="pa-0">
                            {{ fullName(teacher) }}
                          </v-card-title>
                        </v-col>
                        <!-- Card Body section -->
                        <v-col class="py-5" cols="12">
                          <v-row>
                            <!-- First Section -->
                            <v-col cols="12">
                              <v-row>
                                <v-col
                                  class="pa-1 d-flex align-center justify-center mr-1"
                                  cols="2"
                                >
                                  <v-icon size="28" color="orange darken-2">
                                    mdi-clipboard-text-outline
                                  </v-icon>
                                </v-col>
                                <v-col
                                  class="pa-2 d-flex align-center"
                                  cols="9"
                                >
                                  <v-row class="pl-1">
                                    <v-col class="pa-0" cols="12">
                                      <span
                                        class="text-subtitle-1 font-weight-bold"
                                      >
                                        Email
                                      </span>
                                    </v-col>
                                    <v-col class="pa-0 mt-n2 mb-1" cols="12">
                                      <span>
                                        {{ teacher.email }}
                                      </span>
                                    </v-col>
                                  </v-row>
                                </v-col>
                              </v-row>
                            </v-col>

                            <!-- Secondary section -->
                            <v-col class="mt-1" cols="12">
                              <v-row>
                                <v-col
                                  class="pa-1 d-flex align-center justify-center mr-1"
                                  cols="2"
                                >
                                  <v-icon size="28" color="orange darken-2">
                                    mdi-timer-outline
                                  </v-icon>
                                </v-col>
                                <v-col
                                  class="pa-2 d-flex align-center"
                                  cols="9"
                                >
                                  <v-row v-if="teacher.department" class="pl-1">
                                    <v-col class="pa-0" cols="12">
                                      <span
                                        class="text-subtitle-1 font-weight-bold"
                                      >
                                        Department
                                      </span>
                                    </v-col>
                                    <v-col class="pa-0 mt-n1 mb-1" cols="12">
                                      <span>
                                        {{ teacher.department.name }}
                                      </span>
                                    </v-col>
                                  </v-row>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'departmentAdmin',

  data() {
    return {
      headers: [
        {
          text: 'Full Name',
          align: 'start',
          value: 'fullName',
        },
        { text: 'Email', value: 'email' },
        { text: 'Section', value: 'section' },
        { text: 'Year', value: 'year' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      studentClass: null,
      courses: [],
      assignedCourses: [],
      unassignedCourses: [],
      assignCourseDialog: false,
      removeCourseDialog: false,
      selectedStudentId: null,
      seletedAssignCourses: null,
      seletedRemoveCourses: null,
      seletedCourse: null,
      seletedAssignTeacher: null,
      seletedRemoveTeacher: null,
      unassignedTeachersOfCourse: [],
      assignedTeachersOfCourse: [],
    }
  },

  computed: {
    getTotalCreditHour() {
      return this.studentClass.attendingCourses.reduce(
        (prev, cur) => prev + parseInt(cur.creditHour),
        0
      )
    },
  },

  async created() {
    await this.initilizeClass()
  },

  methods: {
    async initilizeClass() {
      const query = `query class($id: ID!) {
                      studentClass(id: $id) {
                        year
                        section
                        attendingCourses {
                          id
                          name
                          code
                          creditHour
                        }
                        teachers {
                          id
                          firstName
                          middleName
                          lastName
                          department {
                            id
                            name
                          }
                        }
                        students {
                          id
                          firstName
                          middleName
                          lastName
                          attendingCourses {
                            id
                            name
                          }
                        }
                      }
                    }`

      const variables = { id: this.$nuxt.context.params.sectionId }

      const studentClassResponse = await this.$axios.post('/graphql', {
        query,
        variables,
      })

      this.studentClass = studentClassResponse.data.data.studentClass

      console.log(this.studentClass)
    },

    fullName(item) {
      return (
        `${item.firstName.substr(0, 1).toUpperCase()}${item.firstName
          .substr(1)
          .toLowerCase()}` +
        ` ${item.father.firstName
          .substr(0, 1)
          .toUpperCase()}${item.father.firstName.substr(1).toLowerCase()}` +
        ` ${item.father.lastName
          .substr(0, 1)
          .toUpperCase()}${item.father.lastName.substr(1).toLowerCase()}`
      )
    },

    enrollStudentToCourses(item) {
      console.log('Enroll Student:', item.fullName)

      // this.selectedStudentId = item.id
      this.assignCourseDialog = true
    },

    removeStudentFromCourses(item) {
      console.log('Remove Student: ', item.fullName)

      // this.selectedStudentId = item.id
      this.removeCourseDialog = true
    },

    closeAssignCourses() {
      console.log('Close Assign Dialog')

      this.assignCourseDialog = false
    },

    assignCourses() {
      console.log('Assign Courses')

      this.closeAssignCourses()
    },

    closeRemoveCourses() {
      console.log('Close Remove Dialog')

      this.removeCourseDialog = false
    },

    removeCourses() {
      console.log('Remove Courses')

      this.closeRemoveCourses()
    },

    closeAssignTeacherToClass(dialog) {
      console.log('Close Assign Teacher to Course: ', dialog)

      dialog.value = false
    },

    closeRemoveTeacherFromClass(dialog) {
      console.log('Close Remove Teacher from Course: ', dialog)

      dialog.value = false
    },

    assignTeacherToClass(dialog) {
      console.log('Assign Teacher to Course')

      this.closeAssignTeacherToClass(dialog)
    },

    removeTeacherFromClass(dialog) {
      console.log('Assign Teacher to Course')

      this.closeRemoveTeacherFromClass(dialog)
    },
  },
}
</script>
Save
