<template>
  <v-row>
    <v-col cols="8">
      <!-- Welcome section -->
      <v-card height="250" elevation="0" color="transparent">
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
                  class="
                    orange--text
                    text--darken-2 text-h4 text-left
                    font-weight-medium
                  "
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
      <v-row>
        <!-- Classes section -->
        <v-col cols="12" class="mt-3">
          <!-- Class header Section -->
          <v-col cols="3" class="text-h5 d-flex align-center">Classes</v-col>
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
                      <span
                        class="pa-0 text-h6 font-weight-regular black--text"
                      >
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
                            :to="`${$route.path}/section/${clss.id}`"
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
                    {{ `Total students - ${getTotalStudents(year)}` }}
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
                @getUnassignedCourses="organizeClassCourses(year)"
                @updateComponent="initializeDepartment"
              />
              <remove-course-from-class-dialog
                :is-single-remove="false"
                :classes-ids="year.map((section) => section.id)"
                :assigned-courses="assignedCourses"
                @getAssignedCourses="organizeClassCourses(year)"
                @updateComponent="initializeDepartment"
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="4">
      <!-- Courses section -->
      <div><p class="text-h5 text--lighten-2">Courses</p></div>
      <v-row>
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
                              <v-col class="pa-2 d-flex align-center" cols="8">
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
                              <v-col class="pa-2 d-flex align-center" cols="8">
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
</template>

<script>
  import { mapGetters } from 'vuex'
  // import { flattenDeep } from 'lodash'
  import { DEPARTMENT_FOR_DEPARTMENT_ADMINISTRATOR } from '~/utils/queries'
  export default {
    layout: 'departmentAdmin',
    async asyncData({ $axios, store }) {
      const department = await $axios
        .post('/graphql', {
          query: DEPARTMENT_FOR_DEPARTMENT_ADMINISTRATOR,
          variables: { id: store.getters['auth/id'] },
        })
        .then(({ data }) => data.data.user.department)

      return { department }
    },

    data() {
      return {
        updateDom: false,
        department: null,
        totalStudents: null,
        classes: [],
        unassignedCourses: [],
        assignedCourses: [],
      }
    },
    computed: {
      ...mapGetters({ user: 'auth/user' }),
      classesByYear() {
        const classesByYear = this.department.classes.reduce((acc, cur) => {
          if (!acc[cur.year]) acc[cur.year] = []
          acc[cur.year].push(cur)
          return acc
        }, {})
        return classesByYear
      },
    },
    methods: {
      initializeDepartment() {
        return this.$axios
          .post('/graphql', {
            query: DEPARTMENT_FOR_DEPARTMENT_ADMINISTRATOR,
            variables: {
              id: this.user.id,
            },
          })
          .then(({ data }) => data.data.user.department)
      },

      organizeClassCourses(year) {
        this.unassignedCourses = []
        this.assignedCourses = []

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
      },

      getPostfix(idx) {
        if (idx === '1') return 'st'
        else if (idx === '2') return 'nd'
        else if (idx === '3') return 'rd'
        else return 'th'
      },

      getTotalStudents(year) {
        return year.reduce(
          (totalStudents, section) => totalStudents + section.students.length,
          0
        )
      },
    },
  }
</script>
