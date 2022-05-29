<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <span class="text-h4">Year 1 - Section A</span>
        </v-col>

        <v-col cols="3">
          <v-card elevation="0" outlined>
            <v-card-text>
              <v-row>
                <v-col cols="4" class="d-flex justify-center align-center">
                  <v-avatar size="50" color="orange darken-4">
                    <v-icon size="35" color="orange lighten-4">
                      mdi-account-group
                    </v-icon>
                  </v-avatar>
                </v-col>
                <v-col cols="8">
                  <v-card-title class="pa-0 text-h5"> Students </v-card-title>
                  <v-card-title class="pa-0 text-h5"> 50 </v-card-title>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="3">
          <v-card elevation="0" outlined>
            <v-card-text>
              <v-row>
                <v-col cols="4" class="d-flex justify-center align-center">
                  <v-avatar size="50" color="orange darken-4">
                    <v-icon size="35" color="orange lighten-4">
                      mdi-book-multiple
                    </v-icon>
                  </v-avatar>
                </v-col>
                <v-col cols="8">
                  <v-card-title class="pa-0 text-h5"> Courses </v-card-title>
                  <v-card-title class="pa-0 text-h5"> 5 </v-card-title>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="3">
          <v-card elevation="0" outlined>
            <v-card-text>
              <v-row>
                <v-col cols="4" class="d-flex justify-center align-center">
                  <v-avatar size="50" color="orange darken-4">
                    <v-icon size="35" color="orange lighten-4">
                      mdi-account-group
                    </v-icon>
                  </v-avatar>
                </v-col>
                <v-col cols="8">
                  <v-card-title class="pa-0 text-h5"> Teachers </v-card-title>
                  <v-card-title class="pa-0 text-h5"> 10 </v-card-title>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="3">
          <v-card elevation="0" outlined>
            <v-card-text>
              <v-row>
                <v-col cols="4" class="d-flex justify-center align-center">
                  <v-avatar size="50" color="orange darken-4">
                    <v-icon size="35" color="orange lighten-4">
                      mdi-timer
                    </v-icon>
                  </v-avatar>
                </v-col>
                <v-col cols="8">
                  <v-card-title class="pa-0 text-h5">
                    Credit Hours
                  </v-card-title>
                  <v-card-title class="pa-0 text-h5"> 19 </v-card-title>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-row>
        <v-col cols="8">
          <v-row>
            <v-col cols="12" class="pb-0">
              <span class="text-h5"> Students </span>
            </v-col>
            <!-- Students section -->
            <v-col cols="12">
              <v-data-table
                :headers="headers"
                :items="students"
                class="elevation-0 pa-3"
              >
                <template #item.actions="{ item }">
                  <v-tooltip top>
                    <template #activator="{ on, attrs }">
                      <v-icon
                        size="20"
                        class="mr-1"
                        color="primary lighten-1"
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
                        color="error"
                        v-bind="attrs"
                        v-on="on"
                        @click.stop="removeStudentFromCourses(item)"
                      >
                        mdi-account-minus
                      </v-icon>
                    </template>
                    <span>Remove Course</span>
                  </v-tooltip>

                  <!-- Assign Course to Student Dialog -->
                  <v-dialog v-model="assignCourseDialog" width="25%">
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
                  <v-dialog v-model="removeCourseDialog" width="25%">
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
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="4">
          <v-row>
            <!-- Courses Section -->
            <v-col cols="12" class="pb-0">
              <span class="text-h5"> Courses </span>
            </v-col>

            <v-col class="pb-0" cols="12">
              <v-card elevation="0">
                <v-card-text>
                  <v-row>
                    <v-col cols="3" class="d-flex justify-end align-center">
                      <v-avatar size="60" color="orange darken-4">
                        <v-icon size="40" color="orange lighten-4"
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
                                  <v-icon size="28" color="orange darken-4">
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
                                  <v-icon size="28" color="orange darken-4">
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

            <!-- Teachers Section -->
            <v-col cols="12" class="pb-0 pt-5">
              <span class="text-h5"> Teachers </span>
            </v-col>

            <v-col class="pb-0" cols="12">
              <v-card elevation="0">
                <v-card-text>
                  <v-row>
                    <v-col cols="3" class="d-flex justify-end align-center">
                      <v-avatar size="70" color="orange darken-4">
                        <v-icon size="50" color="orange lighten-4"
                          >mdi-account</v-icon
                        >
                      </v-avatar>
                    </v-col>

                    <v-col cols="9">
                      <v-row>
                        <v-col class="pa-2 pb-0" cols="12">
                          <v-card-title class="pa-0">
                            Eyob Aschenaki
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
                                  <v-icon size="28" color="orange darken-4">
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
                                      <span>ethioeyoba@gmail.com</span>
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
                                  <v-icon size="28" color="orange darken-4">
                                    mdi-timer-outline
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
                                        Department
                                      </span>
                                    </v-col>
                                    <v-col class="pa-0 mt-n1 mb-1" cols="12">
                                      <span>Software Engineering</span>
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
        { text: 'Entrance Year', value: 'entranceYear' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      students: [
        {
          fullName: 'Benat Endale',
          email: 'ben10@gmail,com',
          section: 'A',
          entranceYear: '2009',
        },
        {
          fullName: 'Benat Endale',
          email: 'ben10@gmail,com',
          section: 'A',
          entranceYear: '2009',
        },
        {
          fullName: 'Benat Endale',
          email: 'ben10@gmail,com',
          section: 'A',
          entranceYear: '2009',
        },
        {
          fullName: 'Benat Endale',
          email: 'ben10@gmail,com',
          section: 'A',
          entranceYear: '2009',
        },
        {
          fullName: 'Benat Endale',
          email: 'ben10@gmail,com',
          section: 'A',
          entranceYear: '2009',
        },
        {
          fullName: 'Benat Endale',
          email: 'ben10@gmail,com',
          section: 'A',
          entranceYear: '2009',
        },
        {
          fullName: 'Benat Endale',
          email: 'ben10@gmail,com',
          section: 'A',
          entranceYear: '2009',
        },
        {
          fullName: 'Benat Endale',
          email: 'ben10@gmail,com',
          section: 'A',
          entranceYear: '2009',
        },
        {
          fullName: 'Benat Endale',
          email: 'ben10@gmail,com',
          section: 'A',
          entranceYear: '2009',
        },
        {
          fullName: 'Benat Endale',
          email: 'ben10@gmail,com',
          section: 'A',
          entranceYear: '2009',
        },
        {
          fullName: 'Benat Endale',
          email: 'ben10@gmail,com',
          section: 'A',
          entranceYear: '2009',
        },
        {
          fullName: 'Benat Endale',
          email: 'ben10@gmail,com',
          section: 'A',
          entranceYear: '2009',
        },
        {
          fullName: 'Benat Endale',
          email: 'ben10@gmail,com',
          section: 'A',
          entranceYear: '2009',
        },
        {
          fullName: 'Benat Endale',
          email: 'ben10@gmail,com',
          section: 'A',
          entranceYear: '2009',
        },
        {
          fullName: 'Benat Endale',
          email: 'ben10@gmail,com',
          section: 'A',
          entranceYear: '2009',
        },
        {
          fullName: 'Benat Endale',
          email: 'ben10@gmail,com',
          section: 'A',
          entranceYear: '2009',
        },
        {
          fullName: 'Benat Endale',
          email: 'ben10@gmail,com',
          section: 'A',
          entranceYear: '2009',
        },
        {
          fullName: 'Benat Endale',
          email: 'ben10@gmail,com',
          section: 'A',
          entranceYear: '2009',
        },
        {
          fullName: 'Benat Endale',
          email: 'ben10@gmail,com',
          section: 'A',
          entranceYear: '2009',
        },
        {
          fullName: 'Benat Endale',
          email: 'ben10@gmail,com',
          section: 'A',
          entranceYear: '2009',
        },
        {
          fullName: 'Benat Endale',
          email: 'ben10@gmail,com',
          section: 'A',
          entranceYear: '2009',
        },
        {
          fullName: 'Benat Endale',
          email: 'ben10@gmail,com',
          section: 'A',
          entranceYear: '2009',
        },
      ],
      courses: [],
      assignedCourses: [],
      unassignedCourses: [],
      assignCourseDialog: false,
      removeCourseDialog: false,
      selectedStudentId: null,
      seletedAssignCourses: null,
      seletedRemoveCourses: null,
    }
  },

  methods: {
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
  },
}
</script>
Save
