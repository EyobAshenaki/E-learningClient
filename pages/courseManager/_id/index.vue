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
                  <v-col v-if="user" cols="11" class="py-0">
                    <p
                      class="orange--text text--darken-4 text-h4 text-left font-weight-medium"
                    >
                      {{ user.firstName }}
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
                  <v-btn outlined color="orange darken-4" @click="createCourse">
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
                            <v-btn-toggle>
                              <v-btn
                                @click="assignCourseTeacher(course.id)"
                                @mouseenter="assignEnter($event)"
                                @mouseleave="leaveBtn()"
                              >
                                <v-icon color="#25327F"
                                  >mdi-account-plus</v-icon
                                >
                              </v-btn>

                              <v-btn
                                @click="goToCourseEdit(course.id)"
                                @mouseenter="editEnter($event)"
                                @mouseleave="leaveBtn()"
                              >
                                <v-icon color="orange darken-4"
                                  >mdi-pencil</v-icon
                                >
                              </v-btn>

                              <v-btn
                                @click="deleteCourse(course)"
                                @mouseenter="deleteEnter($event)"
                                @mouseleave="leaveBtn()"
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

                          <!-- Create Course Dialog -->
                          <v-dialog
                            v-model="createCourseDialog"
                            max-width="50%"
                          >
                            <v-card>
                              <v-card-title>
                                <span class="text-h5"> New Course </span>
                              </v-card-title>

                              <v-card-text>
                                <v-container>
                                  <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                      <v-text-field
                                        v-model="newCourse.name"
                                        label="Name"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="3">
                                      <v-text-field
                                        v-model="newCourse.code"
                                        label="Code"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="3">
                                      <v-text-field
                                        v-model="newCourse.creditHour"
                                        label="Credit Hour"
                                        type="number"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                      <v-textarea
                                        v-model="newCourse.overview"
                                        label="Overview"
                                        auto-grow
                                        filled
                                      ></v-textarea>
                                    </v-col>
                                    <v-col cols="12">
                                      <v-textarea
                                        v-model="newCourse.description"
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

                          <!-- Assign Teacher to a Course -->
                          <v-dialog
                            v-model="assignTeacherDialog"
                            max-width="25%"
                          >
                            <v-card>
                              <v-card-title class="pb-7"
                                >Assign Teacher</v-card-title
                              >
                              <v-card-text class="pb-0">
                                <v-row>
                                  <v-col cols="12" class="py-0">
                                    <v-select
                                      v-model="selectedTeacher"
                                      :items="unassignedTeachers"
                                      item-text="unassignedTeacherFullName"
                                      item-value="unassignedTeacher"
                                      label="Select Teacher"
                                      outlined
                                    ></v-select>
                                  </v-col>
                                  <v-col cols="12" class="py-0">
                                    <v-select
                                      v-model="selectedTeacherType"
                                      :items="teacherTypes"
                                      label="Teacher Type"
                                      outlined
                                    ></v-select>
                                  </v-col>
                                </v-row>
                              </v-card-text>
                              <v-card-actions
                                class="pb-4 px-6 d-flex justify-space-between"
                              >
                                <v-btn @click="assignCourseTeacherClose"
                                  >Cancel</v-btn
                                >
                                <v-btn @click="assignCourseTeacherConfirm"
                                  >Save</v-btn
                                >
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
                            <v-icon color="#25327F">mdi-timer-outline</v-icon>
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
        <v-col
          v-for="teacher in teachers"
          :key="teacher.id"
          cols="12"
          class="py-1"
        >
          <v-card outlined class="py-3">
            <v-row>
              <v-col cols="4" class="pr-0 d-flex justify-end">
                <v-avatar size="80" color="grey lighten-3">
                  <v-icon size="50" color="#25327F">mdi-account-outline</v-icon>
                </v-avatar>
              </v-col>
              <v-col>
                <v-card-title>{{
                  `${teacher.firstName} ${teacher.middleName} ${teacher.lastName}`
                }}</v-card-title>
                <v-card-subtitle>{{
                  teacher.department ? teacher.department.name : 'N/A'
                }}</v-card-subtitle>
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
      user: null,
      courses: [],
      teachers: [],
      newCourse: {
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
      createCourseDialog: false,
      courseDialogDelete: false,
      tooltipValue: '',
      showTooltip: false,
      tooltipPositionX: null,
      tooltipPositionY: null,
      unassignedTeachers: [],
      teacherTypes: [],
      selectedTeacher: '',
      selectedTeacherType: '',
      selectedCourseId: null,
      assignTeacherDialog: false,
    }
  },

  computed: {
    tooltipText() {
      if (this.tooltipValue === 'assign') return 'Assign Teacher'
      else if (this.tooltipValue === 'edit') return 'Edit Course'
      else if (this.tooltipValue === 'delete') return 'Delete Course'
      else return null
    },
  },

  created() {
    this.initializeUser()
    this.initializeCourses()
    this.initializeTeachers()
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

    async initializeCourses() {
      // const userId = this.$nuxt.context.params.id

      const query = `query courses {
                      courses {
                        id
                        name
                        code
                        description
                        overview
                        creditHour
                        chapters {
                          id
                          title
                          sequenceNumber
                        }
                      }
                    }`
      const response = await this.$axios.post('/graphql', {
        query,
      })

      this.courses = [...response.data.data.courses]
    },

    async initializeTeachers() {
      this.teachers = JSON.parse(JSON.stringify(await this.getTeachers()))
    },

    async getTeachers() {
      const roles = ['Teacher', 'Course Owner', 'Course Teacher']
      const teachers = []

      for (const role of roles) {
        const users = await this.getUsersWithRole(role)

        if (users === null) break

        let duplicateFlag = false
        for (const user of users) {
          for (const teacher of teachers) {
            if (user.id === teacher.id) {
              duplicateFlag = true
              break
            }
          }
          if (!duplicateFlag) teachers.push(user)
        }
      }

      return teachers
    },

    async getUsersWithRole(role) {
      const queryRole = `query roles{
                            roles{
                              id
                              name
                            }
                          }`
      const rolesResponse = await this.$axios.post('/graphql', {
        query: queryRole,
      })
      if (rolesResponse.data.errors?.length) {
        console.warn(rolesResponse.data.errors[0].message)
        throw new Error(rolesResponse.data.errors[0].message)
      }

      this.roles = rolesResponse.data.data.roles

      const selectedRole = this.roles.filter((srole) => {
        return this.getRoleName(role) === srole.name
      })

      if (selectedRole.length > 0) {
        const roleId = selectedRole[0].id

        const queryRoleMembers = `query role($id: ID!) {
                                    role(id: $id) {
                                      name
                                      members {
                                        id
                                        firstName
                                        middleName
                                        lastName
                                        email
                                        department{
                                          name
                                        }
                                      }
                                    }
                                  }`

        const roleMembersvariables = { id: roleId }

        const roleMembersResponse = await this.$axios.post('/graphql', {
          query: queryRoleMembers,
          variables: roleMembersvariables,
        })

        if (roleMembersResponse.data.errors?.length) {
          console.warn(roleMembersResponse.data.errors[0].message)
          throw new Error(roleMembersResponse.data.errors[0].message)
        }

        return roleMembersResponse.data.data.role.members
      }

      return null
    },

    getRoleName(role) {
      const tempRole = role.split(' ')
      return tempRole.length > 1
        ? `${tempRole[0].toUpperCase()}_${tempRole[1].toUpperCase()}`
        : `${tempRole[0].toUpperCase()}`
    },

    goToTeachersPage() {
      this.$router.push({
        name: 'courseManager-id-teachers',
        params: { id: 1 },
      })
    },

    // Tooltip functions

    assignEnter(event) {
      this.tooltipPositionX = event.clientX
      this.tooltipPositionY = event.clientY - 20
      this.tooltipValue = 'assign'
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

    leaveBtn() {
      this.showTooltip = false
    },

    // Course CRUD functions

    createCourse() {
      this.createCourseDialog = true
    },

    async assignCourseTeacher(courseId) {
      this.assignTeacherDialog = true

      this.teacherTypes = ['Course Owner', 'Course Teacher']
      this.selectedCourseId = courseId

      this.unassignedTeachers = await this.getTeachers()
      this.unassignedTeachers = this.unassignedTeachers.map(
        (unassignedTeacher) => {
          return {
            unassignedTeacherFullName: `${unassignedTeacher.firstName} ${unassignedTeacher.middleName} ${unassignedTeacher.lastName}`,
            unassignedTeacher,
          }
        }
      )
    },

    goToCourseEdit(courseId) {
      this.$router.push({
        name: 'courseManager-id-courseEdit-courseId',
        params: { courseId, userId: this.$nuxt.context.params.id },
      })
    },

    deleteCourse(course) {
      this.newCourse = Object.assign({}, course)
      this.courseDialogDelete = true
    },

    async deleteCourseConfirm() {
      const query = `mutation removeCourse($id: ID!) {
                      removeCourse(id: $id)
                    }`
      const variables = {
        id: this.newCourse.id,
      }

      const removeCourseResponse = await this.$axios.post('/graphql', {
        query,
        variables,
      })

      const isCourseRemoved = removeCourseResponse.data.data.removeCourse

      this.deleteCourseClose(isCourseRemoved)
    },

    deleteCourseClose(isCourseRemoved) {
      this.courseDialogDelete = false
      this.$nextTick(() => {
        this.newCourse = Object.assign({}, this.defaultCourse)
        if (isCourseRemoved) this.initializeCourses()
      })
    },

    saveCourseClose() {
      this.createCourseDialog = false
      this.$nextTick(() => {
        this.newCourse = Object.assign({}, this.defaultCourse)
      })
    },

    assignCourseTeacherClose() {
      this.assignTeacherDialog = false
    },

    async saveCourse() {
      const query = `mutation createCourse(
                      $code: String!
                      $name: String!
                      $description: String!
                      $overview: String!
                      $creditHour: Int!
                    ) {
                      createCourse(
                        createCourseInput: {
                          code: $code
                          name: $name
                          description: $description
                          overview: $overview
                          creditHour: $creditHour
                        }
                      ) {
                        id
                      }
                    }`

      const variables = {
        code: this.newCourse.code,
        name: this.newCourse.name,
        description: this.newCourse.description,
        overview: this.newCourse.overview,
        creditHour: parseInt(this.newCourse.creditHour),
      }

      await this.$axios.post('/graphql', {
        query,
        variables,
      })

      this.$nextTick(() => {
        this.initializeCourses()
      })

      this.saveCourseClose()
    },

    async assignCourseTeacherConfirm() {
      const query = `mutation assignUserToCourse ($courseId: ID! $userId: ID!) {
                        assignUserToCourse (courseId: $courseId userId: $userId)
                      }`
      const variables = {
        userId: this.selectedTeacher.id,
        courseId: this.selectedCourseId,
      }

      const assignUserResponse = await this.$axios.post('/graphql', {
        query,
        variables,
      })

      const assignedRole = this.getRoleName(this.selectedTeacherType)

      if (assignUserResponse.data.data.assignUserToCourse === true) {
        // Change role to selectedTeacherType using Update user
        const changeUserRoleQuery = `mutation updateUser ($id: ID! $roleName: RoleName) {
                                      updateUser (updateUserInput: {id: $id roleName: $roleName}) {
                                        id
                                        roles {
                                          id
                                          name
                                        }
                                      }
                                    }`
        const changeUserRoleVariables = {
          id: this.selectedTeacher.id,
          roleName: assignedRole,
        }

        await this.$axios.post('/graphql', {
          query: changeUserRoleQuery,
          variables: changeUserRoleVariables,
        })
      }

      this.initializeCourses()
      this.initializeTeachers()
      this.assignCourseTeacherClose()
    },
  },
}
</script>
