<template>
  <v-row style="margin-top: 2em">
    <v-col cols="8">
      <v-row>
        <!-- Welcome section -->
        <v-col cols="12">
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
                  <v-col cols="11" class="py-0">
                    <p
                      class="orange--text text--darken-4 text-h4 text-left font-weight-medium"
                    >
                      Adem
                    </p>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <img
                  style="height: 120%; margin-top: -3.3em"
                  src="../../../assets/img/tourist-welcome.svg"
                  alt=""
                />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <!-- Courses section -->
        <v-col cols="12" class="mt-15">
          <v-row>
            <v-col cols="12">
              <v-row>
                <!-- Course header Section -->
                <v-col cols="3" class="text-h5 d-flex align-center"
                  >Courses</v-col
                >
                <v-spacer></v-spacer>
                <v-col cols="4" class="d-flex justify-end">
                  <v-btn text color="orange darken-4" @click="createCourse">
                    <v-icon>mdi-plus</v-icon>
                    Create Course
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <!-- Course cards Section -->
            <v-col
              v-for="course in courses"
              :key="course.id"
              cols="12"
              md="6"
              class="mt-5"
            >
              <v-card elevation="6">
                <v-row>
                  <!-- Course card head section -->
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="4" class="d-flex justify-end align-center">
                        <v-avatar size="90" color="grey lighten-3">
                          <v-icon size="60" color="#25327F"
                            >mdi-book-open-outline</v-icon
                          >
                        </v-avatar>
                      </v-col>
                      <v-col cols="8">
                        <v-row>
                          <v-col cols="12" class="pb-0">
                            <v-card-title class="px-0">{{
                              course.name
                            }}</v-card-title>
                            <v-card-subtitle class="px-0 pb-0">{{
                              course.code
                            }}</v-card-subtitle>
                          </v-col>
                          <!-- Course Button Group -->
                          <v-col cols="12" class="p-0">
                            <v-btn-toggle v-model="chosenAction">
                              <v-btn
                                @click="goToCourseDetail(course)"
                                @mouseenter="detailEnter($event)"
                                @mouseleave="detailLeave()"
                              >
                                <v-icon color="#25327F"
                                  >mdi-format-list-bulleted</v-icon
                                >
                              </v-btn>

                              <v-btn
                                @click="editCourse(course)"
                                @mouseenter="editEnter($event)"
                                @mouseleave="editLeave()"
                              >
                                <v-icon color="orange darken-4"
                                  >mdi-pencil</v-icon
                                >
                              </v-btn>

                              <v-btn
                                @click="deleteCourse(course)"
                                @mouseenter="deleteEnter($event)"
                                @mouseleave="deleteLeave()"
                              >
                                <v-icon color="error">mdi-delete</v-icon>
                              </v-btn>
                            </v-btn-toggle>

                            <!-- Button group Tooltips -->
                            <v-tooltip
                              v-model="showTooltip"
                              top
                              open-delay="1000"
                              close-delay="1000"
                              :nudge-right="tooltipPositionX"
                              :nudge-bottom="tooltipPositionY"
                            >
                              {{ tooltipText }}
                            </v-tooltip>
                          </v-col>

                          <!-- Course Delete Dialog -->
                          <v-dialog
                            v-model="courseDialogDelete"
                            max-width="50%"
                          >
                            <v-card>
                              <v-card-title class="text-h5 justify-center"
                                >Are you sure you want to delete this
                                Course?</v-card-title
                              >
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="error"
                                  text
                                  @click="deleteCourseClose"
                                  >Cancel</v-btn
                                >
                                <v-btn
                                  color="#25327F"
                                  text
                                  @click="deleteCourseConfirm"
                                  >OK</v-btn
                                >
                                <v-spacer></v-spacer>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>

                          <!-- Course Create/Edit Dialog -->
                          <v-dialog v-model="courseDialog" max-width="50%">
                            <v-card>
                              <v-card-title>
                                <span class="text-h5">{{
                                  courseFormTitle
                                }}</span>
                              </v-card-title>

                              <v-card-text>
                                <v-container>
                                  <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                      <v-text-field
                                        v-model="editedCourse.name"
                                        label="Name"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="3">
                                      <v-text-field
                                        v-model="editedCourse.code"
                                        label="Code"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="3">
                                      <v-text-field
                                        v-model="editedCourse.creditHour"
                                        label="Credit Hour"
                                        type="number"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                      <v-textarea
                                        v-model="editedCourse.overview"
                                        label="Overview"
                                        auto-grow
                                        filled
                                      ></v-textarea>
                                    </v-col>
                                    <v-col cols="12">
                                      <v-textarea
                                        v-model="editedCourse.description"
                                        label="description"
                                        auto-grow
                                        filled
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card-text>

                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="error"
                                  text
                                  @click="saveCourseClose"
                                >
                                  Cancel
                                </v-btn>
                                <v-btn color="#25327F" text @click="saveCourse">
                                  Save
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-divider class="mt-5 mx-6"></v-divider>
                  </v-col>

                  <!-- Course card body section -->
                  <v-col cols="12">
                    <v-row class="mx-1 d-flex justify-space-around">
                      <!-- <v-spacer></v-spacer> -->

                      <v-col cols="5" class="pt-0">
                        <v-list-item class="px-0">
                          <v-list-item-avatar color="grey lighten-3">
                            <v-icon color="#25327F"
                              >mdi-book-open-page-variant-outline</v-icon
                            >
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>
                              {{ course.chapters.length }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                              Chapters
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                      <v-col cols="5" class="pt-0 px-0">
                        <v-list-item class="px-0">
                          <v-list-item-avatar color="grey lighten-3">
                            <v-icon color="#25327F">mdi-folder</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>
                              {{ course.creditHour }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                              Credit Hour
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <!-- Teacher section -->
    <v-col cols="4">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="6" class="text-h5 d-flex align-center">
              Teachers
            </v-col>
            <v-col cols="6" class="d-flex justify-end">
              <v-btn text color="orange darken-4" @click="goToTeachersPage"
                >View all</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
        <v-col v-for="n in 10" :key="n" cols="12" class="py-1">
          <v-card outlined class="py-3">
            <v-row>
              <v-col cols="4" class="pr-0 d-flex justify-end">
                <v-avatar size="80" color="grey lighten-3">
                  <v-icon size="50" color="#25327F">mdi-account-outline</v-icon>
                </v-avatar>
              </v-col>
              <v-col>
                <v-card-title>Betel Desalegn</v-card-title>
                <v-card-subtitle>Software enginnering</v-card-subtitle>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'courseManager',

  data() {
    return {
      courses: [
        {
          id: 1,
          code: 'sweg4052',
          name: 'Course-1',
          description:
            'lorem this itjdnf dfnadkj fakdjfakdfkjadbsf kajdsfbakj fbkajbsf',
          overview:
            'dfhuf aiuf aif iuafb aifaif afafn ajdfuia faf aif aidfbaf ajdbfiabf',
          creditHour: '4',
          chapters: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
            { id: 6 },
          ],
        },
        {
          id: 2,
          code: 'sweg4053',
          name: 'Course-2',
          description:
            'lorem this itjdnf dfnadkj fakdjfakdfkjadbsf kajdsfbakj fbkajbsf',
          overview:
            'dfhuf aiuf aif iuafb aifaif afafn ajdfuia faf aif aidfbaf ajdbfiabf',
          creditHour: '3',
          chapters: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
            { id: 6 },
            { id: 7 },
            { id: 8 },
          ],
        },
        {
          id: 3,
          code: 'sweg4054',
          name: 'Course-3',
          description:
            'lorem this itjdnf dfnadkj fakdjfakdfkjadbsf kajdsfbakj fbkajbsf',
          overview:
            'dfhuf aiuf aif iuafb aifaif afafn ajdfuia faf aif aidfbaf ajdbfiabf',
          creditHour: '1',
          chapters: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
        },
        {
          id: 4,
          code: 'sweg4055',
          name: 'Course-4',
          description:
            'lorem this itjdnf dfnadkj fakdjfakdfkjadbsf kajdsfbakj fbkajbsf',
          overview:
            'dfhuf aiuf aif iuafb aifaif afafn ajdfuia faf aif aidfbaf ajdbfiabf',
          creditHour: '2',
          chapters: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
            { id: 6 },
            { id: 7 },
          ],
        },
        {
          id: 5,
          code: 'sweg4056',
          name: 'Course-5',
          description:
            'lorem this itjdnf dfnadkj fakdjfakdfkjadbsf kajdsfbakj fbkajbsf',
          overview:
            'dfhuf aiuf aif iuafb aifaif afafn ajdfuia faf aif aidfbaf ajdbfiabf',
          creditHour: '3',
          chapters: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
            { id: 6 },
            { id: 7 },
            { id: 8 },
            { id: 9 },
          ],
        },
      ],
      editedIndex: -1,
      editedCourse: {
        code: '',
        name: '',
        description: '',
        overview: '',
        creditHour: '',
      },
      defaultCourse: {
        code: '',
        name: '',
        description: '',
        overview: '',
        creditHour: '',
      },
      courseDialog: false,
      courseDialogDelete: false,
      tooltipValue: '',
      showTooltip: false,
      tooltipPositionX: null,
      tooltipPositionY: null,
      chosenAction: undefined,
    }
  },

  computed: {
    tooltipText() {
      if (this.tooltipValue === 'detail') return 'Course Detail'
      else if (this.tooltipValue === 'edit') return 'Edit Course'
      else if (this.tooltipValue === 'delete') return 'Delete Course'
      else return null
    },

    courseFormTitle() {
      return this.editedIndex === -1 ? 'New Course' : 'Edit Course'
    },
  },

  methods: {
    goToTeachersPage() {
      this.$router.push({
        name: 'courseManager-id-teachers',
        params: { id: 1 },
      })
    },

    // Tooltip functions

    detailEnter(event) {
      this.tooltipPositionX = event.clientX
      this.tooltipPositionY = event.clientY - 20
      this.tooltipValue = 'detail'
      this.showTooltip = true
    },
    editEnter(event) {
      this.tooltipPositionX = event.clientX
      this.tooltipPositionY = event.clientY - 20
      this.tooltipValue = 'edit'
      this.showTooltip = true
    },
    deleteEnter(event) {
      this.tooltipPositionX = event.clientX
      this.tooltipPositionY = event.clientY - 20
      this.tooltipValue = 'delete'
      this.showTooltip = true
    },

    detailLeave() {
      this.showTooltip = false
    },
    editLeave() {
      this.showTooltip = false
    },
    deleteLeave() {
      this.showTooltip = false
    },

    // Course CRUD functions

    createCourse() {
      this.courseDialog = true
    },

    goToCourseDetail(course) {
      console.log('Go to ', course)
    },

    editCourse(course) {
      this.editedIndex = course.id
      this.editedCourse = Object.assign({}, course)
      this.courseDialog = true
    },

    deleteCourse(course) {
      this.editedCourse = Object.assign({}, course)
      this.courseDialogDelete = true
    },

    deleteCourseConfirm() {
      console.log('Course delete Confirm')

      this.courseDialogDelete = false
      this.deleteCourseClose()
    },

    deleteCourseClose() {
      console.log('Course delete closed')

      this.courseDialogDelete = false
      this.$nextTick(() => {
        this.editedCourse = Object.assign({}, this.defaultCourse)
        this.editedIndex = -1
      })
    },

    saveCourseClose() {
      console.log('Course create/edit Closed')

      this.courseDialog = false
      this.$nextTick(() => {
        this.editedCourse = Object.assign({}, this.defaultCourse)
        this.editedIndex = -1
      })
    },

    saveCourse() {
      if (this.editedIndex > -1) {
        // Edit Course with an id of this.editedIndex
      } else {
        // Create a new Course
      }

      this.saveCourseClose()
    },
  },
}
</script>
