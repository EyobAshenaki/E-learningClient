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
        <v-col cols="4" class="px-0 overflow-hidden" style="height: 40vh">
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
            <v-col v-for="n in 4" :key="n" cols="12" class="py-1">
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
                              Database Design
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
                                        <span>Sweg0934</span>
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
                                        <span>4</span>
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
    <v-col v-for="n in 4" :key="n" cols="12" md="4" class="mt-5">
      <v-card elevation="0" outlined width="340">
        <v-card-text class="pa-3">
          <v-row>
            <!-- Class Card head -->
            <v-col cols="12">
              <v-row>
                <v-col cols="12" class="pt-4 d-flex justify-center">
                  <v-avatar size="60" color="orange lighten-4">
                    <v-icon size="50" color="orange darken-3"
                      >mdi-roman-numeral-1</v-icon
                    >
                  </v-avatar>
                </v-col>
                <v-col cols="12" class="pt-0 d-flex justify-center">
                  <span class="pa-0 text-h6 font-weight-regular black--text">
                    1st year
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
                    <v-col
                      v-for="s in 3"
                      :key="s"
                      cols="6"
                      class="pa-0 d-flex justify-center"
                    >
                      <v-chip
                        class="ma-2 elevation-3"
                        color="white"
                        @click="goToSectionPage()"
                      >
                        <v-avatar
                          size="30"
                          color="orange darken-3"
                          class="pl-3 ml-n1 mr-2"
                        >
                          <v-icon left color="orange lighten-5" size="28">
                            mdi-alpha-a
                          </v-icon>
                        </v-avatar>

                        Students - 50
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="pl-5">
              <span class="text-subtitle-1">Total students - 150</span>
            </v-col>
          </v-row>
        </v-card-text>

        <!-- Class Card footer -->
        <v-card-actions class="px-5 d-flex flex-column">
          <v-btn
            block
            outlined
            class="mb-2"
            color="#25327F lighten-4"
            @click.stop="assignCoursesToClasses()"
          >
            <v-icon class="pr-2" style="color: #25327f">
              mdi-book-plus-multiple
            </v-icon>
            <span style="color: #25327f"> Assign Courses </span>
          </v-btn>
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

    <!-- Assign Courses to Class Dialog -->
    <v-dialog v-model="assignCoursesToClassesDialog" width="25%">
      <v-card>
        <v-card-title> Assign Courses to Classes </v-card-title>
        <v-card-text class="pb-0">
          <!-- <v-row>
                  <v-col> -->
          <v-select
            v-model="seletedAssignClasses"
            :items="classes"
            :menu-props="{ bottom: true, offsetY: true }"
            multiple
            outlined
            clearable
            label="Classes"
          ></v-select>

          <v-select
            v-model="seletedAssignCourses"
            :items="unassignedCourses"
            :menu-props="{ bottom: true, offsetY: true }"
            multiple
            outlined
            clearable
            label="Courses"
          ></v-select>
          <!-- </v-col>
                </v-row> -->
        </v-card-text>
        <v-card-actions class="pt-0 d-flex justify-space-between">
          <v-btn text color="error" @click="closeAssignCoursesToClasses">
            Cancel
          </v-btn>
          <v-btn text color="primary" @click="confirmAssignCoursesToClasses">
            Assign
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
      user: null,
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

  created() {
    this.initializeUser()
  },

  methods: {
    async initializeUser() {
      const query = `query user ($id: ID!) {
                      user (id: $id) {
                        id
                        firstName
                        middleName
                        lastName
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

    goToCoursesPage() {
      console.log('Classes Page')
    },

    assignCoursesToClasses() {
      console.log('Assign Courses')

      this.assignCoursesToClassesDialog = true
    },

    removeCoursesFromClasses() {
      console.log('Remove Courses')

      this.removeCoursesFromClassesDialog = true
    },

    goToSectionPage() {
      console.log('Section Page')
      this.$router.push({
        name: 'departmentAdminstrator-id-section-sectionId',
        params: { id: this.$nuxt.context.params.id, sectionId: 1 },
      })
    },

    closeAssignCoursesToClasses() {
      console.log('Close Assign Courses to Classes')

      this.assignCoursesToClassesDialog = false
    },

    closeRemoveCoursesFromClasses() {
      console.log('Close Remove Courses from Classes')

      this.removeCoursesFromClassesDialog = false
    },

    confirmAssignCoursesToClasses() {
      console.log('Confirm Assign Courses to Classes')

      this.closeAssignCoursesToClasses()
    },

    confirmRemoveCoursesFromClasses() {
      console.log('Confirm Remove Courses to Classes')

      this.closeRemoveCoursesFromClasses()
    },
  },
}
</script>
