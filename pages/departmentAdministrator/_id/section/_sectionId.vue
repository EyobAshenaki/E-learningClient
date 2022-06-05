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
                <v-btn outlined color="error lighten-1" @click="deleteStudents">
                  Remove
                </v-btn>

                <!-- Assign Student dialog -->
                <admit-students-dialog
                  :class-id="$nuxt.context.params.sectionId"
                  @updateComponent="initializeClass"
                />
              </div>
            </v-col>

            <!-- Students section -->
            <!-- TODO: mass student assign and remove -->
            <v-col v-if="studentClass.students" cols="12">
              <students-table
                :students="studentClass.students"
                :courses="courses"
                :is-rows-in-table-selectable="isDeletable"
                @updateComponent="initializeClass"
              />
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
      updateDom: false,
      studentClass: null,
      courses: [],
      assignedCourses: [],
      unassignedCourses: [],
      isDeletable: false,
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
      this.updateDom = true
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

    deleteStudents() {
      this.isDeletable = !this.isDeletable
    },
  },
}
</script>
