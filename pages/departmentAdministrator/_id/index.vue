<template>
  <v-row style="margin-top: 2em">
    <v-col cols="12">
      <v-row>
        <!-- Welcome section -->
        <v-col cols="8">
          <v-card height="250" elevation="0" color="grey lighten-4">
            <v-row style="height: 100%">
              <v-col
                cols="6"
                class="d-flex align-center justify-center"
                style="height: 100%"
              >
                <v-row class="d-flex justify-end">
                  <v-col cols="11" class="py-0">
                    <p class="mb-0 text-h3 text-left font-weight-light">
                      Welcome Back,
                    </p>
                  </v-col>
                  <v-col v-if="user" cols="11" class="py-0">
                    <p
                      class="orange--text text--darken-2 text-h4 text-left font-weight-medium"
                    >
                      {{ user.firstName }}
                    </p>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <img
                  style="height: 120%; margin-top: -3.3em"
                  src="@/assets/img/tourist-welcome.svg"
                  alt=""
                />
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <!-- Courses section -->
        <v-col
          v-if="department"
          cols="4"
          class="px-0 overflow-hidden"
          style="height: 40vh"
        >
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col cols="6" class="text-h5 d-flex align-center">
                  Courses
                </v-col>
                <v-col cols="6" class="d-flex justify-end">
                  <v-btn text color="orange darken-4" @click="goToCoursesPage"
                    >View all</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>

            <!-- Course card section -->
            <v-col
              v-for="course in department.ownedCourses"
              :key="course.id"
              cols="12"
              class="py-1"
            >
              <v-col class="pb-0" cols="12">
                <v-card elevation="0">
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
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>

    <!-- Classes section -->
    <v-col cols="12" class="mt-3">
      <v-row>
        <v-col cols="12">
          <v-row>
            <!-- Class header Section -->
            <v-col cols="3" class="text-h5 d-flex align-center">Classes</v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>

    <!-- Class cards Section -->
    <v-col
      v-for="(year, idx) in classesByYear"
      :key="idx"
      cols="12"
      md="4"
      class="mt-3"
    >
      <v-card elevation="0" outlined width="340">
        <v-card-text class="pa-3">
          <v-row>
            <!-- Class Card head -->
            <v-col cols="12">
              <v-row>
                <v-col cols="12" class="pt-4 d-flex justify-center">
                  <v-avatar size="60" color="orange lighten-4">
                    <v-icon size="50" color="orange darken-3">
                      {{ `mdi-roman-numeral-${idx}` }}
                    </v-icon>
                  </v-avatar>
                </v-col>
                <v-col cols="12" class="pt-0 d-flex justify-center">
                  <span class="pa-0 text-h6 font-weight-regular black--text">
                    {{ `${idx}${getPostfix(idx)} year` }}
                  </span>
                </v-col>
              </v-row>
            </v-col>

            <!-- Class Card body -->
            <v-col cols="12" class="py-6 grey lighten-4">
              <v-row>
                <v-col cols="12" class="pa-0 pl-5 pb-3">
                  <v-avatar
                    size="40"
                    color="orange darken-3"
                    class="mr-2"
                    rounded
                  >
                    <v-icon size="28" color="orange lighten-5"
                      >mdi-alphabetical-variant</v-icon
                    >
                  </v-avatar>
                  <span class="text-body-1">Sections</span>
                </v-col>
                <v-col cols="12" class="">
                  <v-row>
                    <!-- Section chips -->
                    <v-col
                      v-for="(clss, i) in year"
                      :key="i"
                      cols="6"
                      class="pa-0 d-flex justify-center"
                    >
                      <v-chip
                        class="ma-2 elevation-3"
                        color="white"
                        @click="goToSectionPage(clss.id)"
                      >
                        <v-avatar
                          size="30"
                          color="orange darken-3"
                          class="pl-3 ml-n1 mr-2"
                        >
                          <v-icon left color="orange lighten-5" size="28">
                            {{ `mdi-alpha-${clss.section.toLowerCase()}` }}
                          </v-icon>
                        </v-avatar>
                        <span>
                          {{ `Students - ${clss.students.length}` }}
                        </span>
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="pl-5">
              <span class="text-subtitle-1">
                {{ `Total students - ${getTotalStudents(idx)}` }}
              </span>
            </v-col>
          </v-row>
        </v-card-text>

        <!-- Class Card footer -->
        <v-card-actions class="px-5 d-flex flex-column">
          <assign-course-to-class-dialog
            :is-single-assign="false"
            :classes-ids="year.map((section) => section.id)"
            :unassigned-courses="unassignedCourses"
            @getUnassignedCourses="getClassUnassignedCourses(year)"
            @updateComponent="initializeDepartment"
          />
          <v-btn
            block
            outlined
            class="ml-0"
            color="orange darken-4"
            @click.stop="removeCoursesFromClasses()"
          >
            <v-icon class="pr-2" color="orange darken-4">
              mdi-book-minus-multiple
            </v-icon>
            <span class="orange--text text--darken-4"> Remove Courses </span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <!-- Remove Courses to Class Dialog -->
    <v-dialog v-model="removeCoursesFromClassesDialog" width="25%">
      <v-card>
        <v-card-title> Remove Courses from Classes </v-card-title>
        <v-card-text class="pb-0">
          <v-select
            v-model="seletedRemoveClasses"
            :items="classes"
            :menu-props="{ bottom: true, offsetY: true }"
            multiple
            outlined
            clearable
            label="Classes"
          ></v-select>

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
          <v-btn text color="error" @click="closeRemoveCoursesFromClasses">
            Cancel
          </v-btn>
          <v-btn text color="primary" @click="confirmRemoveCoursesFromClasses">
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  layout: 'departmentAdmin',

  data() {
    return {
      updateDom: false,
      user: null,
      department: null,
      classesByYear: null,
      totalStudents: null,
      assignCoursesToClassesDialog: false,
      removeCoursesFromClassesDialog: false,
      seletedAssignClasses: [],
      seletedRemoveClasses: [],
      classes: [],
      seletedAssignCourses: [],
      seletedRemoveCourses: [],
      unassignedCourses: [],
      assignedCourses: [],
    }
  },

  async created() {
    await this.initializeUser()
    await this.initializeDepartment()
  },

  async beforeUpdate() {
    if (this.updateDom) {
      await this.initializeDepartment()
      this.classesByYear = this.organizeClassesByYear(this.department.classes)
      this.updateDom = false
    }
  },

  methods: {
    async initializeUser() {
      const query = `query user ($id: ID!) {
                      user (id: $id) {
                        id
                        firstName
                        middleName
                        lastName
                        department {
                          id
                        }
                      }
                    }`

      const variables = {
        id: this.$nuxt.context.params.id,
      }

      const userResponse = await this.$axios.post('/graphql', {
        query,
        variables,
      })
      this.user = userResponse.data.data.user
    },

    async initializeDepartment() {
      this.updateDom = true
      const query = `query department($id: ID!) {
                      department(id: $id) {
                        name
                        ownedCourses {
                          id
                          code
                          name
                          creditHour
                        }
                        classes {
                          id
                          year
                          section
                          students {
                            id
                          }
                          attendingCourses {
                            id
                            name
                            code
                            creditHour
                          }
                        }
                      }
                    }`

      const variables = {
        id: this.user.department.id,
      }

      const departmentResponse = await this.$axios.post('/graphql', {
        query,
        variables,
      })

      this.department = departmentResponse.data.data.department
    },

    organizeClassesByYear(classes) {
      const classesByYear = classes.reduce((acc, cur) => {
        if (!acc[cur.year]) acc[cur.year] = []

        acc[cur.year].push(cur)

        return acc
      }, {})

      for (const classes in classesByYear) {
        for (const clss of classesByYear[classes]) {
          if (!this.totalStudents) this.totalStudents = {}

          if (!this.totalStudents[classes]) this.totalStudents[classes] = 0

          this.totalStudents[classes] += clss.students.length
        }
      }

      return classesByYear
    },

    getClassUnassignedCourses(year) {
      this.unassignedCourses = []

      for (const section of year) {
        for (const attendingCourse of section.attendingCourses) {
          let existsFlag = false
          for (const course of this.assignedCourses) {
            if (course.id === attendingCourse.id) {
              existsFlag = true
              break
            }
          }
          if (!existsFlag) this.assignedCourses.push(attendingCourse)
        }
      }

      for (const course of this.department.ownedCourses) {
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

    getPostfix(idx) {
      if (idx === '1') return 'st'
      else if (idx === '2') return 'nd'
      else if (idx === '3') return 'rd'
      else return 'th'
    },

    getTotalStudents(year) {
      return this.totalStudents[year]
    },

    goToCoursesPage() {
      console.log('Classes Page')
    },

    removeCoursesFromClasses() {
      console.log('Remove Courses')

      this.removeCoursesFromClassesDialog = true
    },

    goToSectionPage(sectionId) {
      this.$router.push({
        name: 'departmentAdministrator-id-section-sectionId',
        params: { id: this.$nuxt.context.params.id, sectionId },
      })
    },

    closeRemoveCoursesFromClasses() {
      console.log('Close Remove Courses from Classes')

      this.removeCoursesFromClassesDialog = false
    },

    confirmRemoveCoursesFromClasses() {
      console.log('Confirm Remove Courses to Classes')

      this.closeRemoveCoursesFromClasses()
    },
  },
}
</script>
