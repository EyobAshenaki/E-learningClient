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
            <!-- Student Head Section -->
            <v-col cols="12" class="pb-0 d-flex justify-space-between">
              <span class="text-h5"> Students </span>

              <div>
                <!-- Remove Student dialog -->
                <v-btn outlined color="orange darken-4"> Remove </v-btn>

                <!-- Assign Student dialog -->
                <v-dialog width="50%">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      outlined
                      color="orange darken-4"
                      v-bind="attrs"
                      v-on="on"
                    >
                      Admit
                    </v-btn>
                  </template>
                  <!-- <template #default="dialog">
                    <v-card>
                      <v-card-title> Admit Students to a Class </v-card-title>
                      <v-card-text class="pb-0">
                        Add Table here
                      </v-card-text>
                    </v-card>
                  </template> -->
                </v-dialog>
              </div>
            </v-col>

            <!-- Students section -->
            <!-- TODO: mass student asssign and remove -->
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
                        mdi-book-plus
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
                        mdi-book-minus
                      </v-icon>
                    </template>
                    <span>Remove Course</span>
                  </v-tooltip>
                </template>
              </v-data-table>

              <!-- Assign Course to Student Dialog -->
              <v-dialog
                v-model="assignStudentCourseDialog"
                :retain-focus="false"
                width="25%"
              >
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
                v-model="removeStudentCourseDialog"
                :retain-focus="false"
                width="25%"
              >
                <v-card>
                  <v-card-title> Remove Course </v-card-title>
                  <v-card-text class="pb-0">
                    <v-select
                      v-model="seletedStudentRemovedCourses"
                      :items="studentAssignedCourses"
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
            <department-admin-courses-section
              :class-id="$nuxt.context.params.sectionId"
              :assigned-courses="studentClass.attendingCourses"
              :unassigned-courses="unassignedCourses"
              @updateComponent="initializeClass"
            />

            <!-- Teachers Head Section -->
            <department-admin-teachers-section
              :class-id="$nuxt.context.params.sectionId"
              :teachers="studentClass.teachers"
              :courses="assignedCourses"
              @updateComponent="initializeClass"
            />
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
        { text: 'Section', value: 'attendingClass.section' },
        { text: 'Year', value: 'attendingClass.year' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      updateDom: false,
      studentClass: null,
      courses: [],
      assignedCourses: [],
      unassignedCourses: [],
      assignStudentCourseDialog: false,
      removeStudentCourseDialog: false,
      selectedStudentId: null,
      seletedStudentAssignedCourses: null,
      seletedStudentRemovedCourses: null,
      studentAssignedCourses: [],
      studentUnassignedCourses: [],
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
    await this.initializeClass()
  },

  async beforeUpdate() {
    if (this.updateDom) {
      await this.initializeClass()
      this.updateDom = false
    }
  },

  methods: {
    async initializeClass() {
      const query = `query class($id: ID!) {
                      studentClass(id: $id) {
                        year
                        section
                        attendingCourses {
                          id
                          name
                          code
                          creditHour
                          teachers {
                            id
                            firstName
                            middleName
                            lastName
                          }
                        }
                        teachers {
                          id
                          firstName
                          middleName
                          lastName
                          email
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
                          email
                          attendingClass {
                            id
                            year
                            section
                          }
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
      await this.initializeDepartmentCourses()
    },

    async initializeDepartmentCourses() {
      const query = `query user($id: ID!) {
                      user(id: $id) {
                        department{
                          name
                          ownedCourses {
                            id
                            code
                            name
                            creditHour
                          }
                        }
                      }
                    }`

      const variables = {
        id: this.$nuxt.context.params.id,
      }

      const departmentCouresesResponse = await this.$axios.post('/graphql', {
        query,
        variables,
      })

      const departmentCourses =
        departmentCouresesResponse.data.data.user.department.ownedCourses

      this.courses = [...departmentCourses]
      this.organizeCourses(departmentCourses)
    },

    organizeCourses(courses) {
      this.unassignedCourses = []
      this.assignedCourses = [...this.studentClass.attendingCourses]

      for (const course of courses) {
        let existsFlag = false
        for (const assignedCourse of this.assignedCourses) {
          if (assignedCourse.id === course.id) {
            existsFlag = true
            break
          }
        }
        if (!existsFlag) this.unassignedCourses.push(course)
      }
    },

    fullName(item) {
      return (
        `${item.firstName.substr(0, 1).toUpperCase()}${item.firstName
          .substr(1)
          .toLowerCase()}` +
        ` ${item.middleName.substr(0, 1).toUpperCase()}${item.middleName
          .substr(1)
          .toLowerCase()}` +
        ` ${item.lastName.substr(0, 1).toUpperCase()}${item.lastName
          .substr(1)
          .toLowerCase()}`
      )
    },

    // Courses Assignation and Removal to and from Student

    organizeStudentCourses(item) {
      for (const course of this.courses) {
        let existsFlag = false
        for (const attCourse of item.attendingCourses) {
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

    enrollStudentToCourses(item) {
      this.studentUnassignedCourses = []

      this.organizeStudentCourses(item)

      this.selectedStudentId = item.id
      this.assignStudentCourseDialog = true
    },

    removeStudentFromCourses(item) {
      this.studentAssignedCourses = []
      this.studentAssignedCourses = [...item.attendingCourses]

      this.selectedStudentId = item.id
      this.removeStudentCourseDialog = true
    },

    closeAssignCourses() {
      this.$nextTick(() => {
        this.seletedStudentAssignedCourses = null
        this.updateDom = true
      })

      this.assignStudentCourseDialog = false
      this.selectedStudentId = null
    },

    closeRemoveCourses() {
      this.$nextTick(() => {
        this.seletedStudentRemovedCourses = null
        this.updateDom = true
      })

      this.removeStudentCourseDialog = false
      this.selectedStudentId = null
    },

    assignCourses() {
      for (const selectedCourse of this.seletedStudentAssignedCourses) {
        const isCourseAssigned = this.assignStudentToCourse(
          selectedCourse.id,
          this.selectedStudentId
        )
        if (isCourseAssigned) console.log('Course Assigned')
      }

      this.closeAssignCourses()
    },

    removeCourses() {
      for (const selectedCourse of this.seletedStudentRemovedCourses) {
        const isCourseRemoved = this.unassignStudentFromCourse(
          selectedCourse.id,
          this.selectedStudentId
        )
        if (isCourseRemoved) console.log('Course Removed')
      }

      this.closeRemoveCourses()
    },
  },
}
</script>
Save
