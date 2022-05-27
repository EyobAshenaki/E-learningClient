<template>
  <v-row>
    <v-col cols="12"> <span class="text-h4">Edit Course</span> </v-col>
    <v-col cols="8" class="mb-16">
      <v-row v-if="course">
        <v-col cols="12">
          <v-banner single-line class="">
            <span class="text-h5">Basic Information</span>
            <template #actions>
              <v-btn outlined color="error" @click="deleteCourse">
                <v-icon class="pr-1">mdi-delete-outline</v-icon>
                Delete
              </v-btn>
              <v-btn
                outlined
                color="#25327F"
                :loading="editLoading"
                :disabled="editLoading"
                @click="editCourse"
              >
                <v-icon class="pr-1">mdi-content-save-outline</v-icon>
                Save
              </v-btn>
            </template>
          </v-banner>
        </v-col>

        <!-- Course Delete Dialog -->
        <v-dialog v-model="courseDeleteDialog" max-width="50%">
          <v-card>
            <v-card-title class="text-h5 justify-center"
              >Are you sure you want to delete this Course?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" text @click="deleteCourseClose"
                >Cancel</v-btn
              >
              <v-btn color="#25327F" text @click="deleteCourseConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-col cols="12" class="pb-0">
          <span class="text-h6 font-weight-regular">Course Title</span>
        </v-col>

        <v-col cols="12" class="pb-0">
          <v-text-field
            v-model="course.name"
            class="text-h5"
            solo
            height="70"
          ></v-text-field>
        </v-col>

        <v-col cols="6" class="py-0">
          <span class="text-h6 font-weight-regular">Course code</span>
        </v-col>
        <v-col cols="6" class="py-0">
          <span class="text-h6 font-weight-regular">Course Credit Hour</span>
        </v-col>

        <v-col cols="6" class="pb-0">
          <v-text-field
            v-model="course.code"
            class="text-h5"
            solo
            height="50"
          ></v-text-field>
        </v-col>

        <v-col cols="6" class="pb-0">
          <v-text-field
            v-model="course.creditHour"
            class="text-h5"
            solo
            height="50"
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="py-0">
          <span class="text-h6 font-weight-regular">Overview</span>
        </v-col>

        <v-col cols="12" class="pb-0">
          <v-textarea
            v-model="course.overview"
            class="text-subtitle-1 pa-0 z"
            auto-grow
            row-height="40"
            solo
          ></v-textarea>
        </v-col>

        <v-col cols="12" class="py-0">
          <span class="text-h6 font-weight-regular">Description</span>
        </v-col>

        <v-col cols="12" class="pb-0">
          <v-textarea
            v-model="course.description"
            class="text-subtitle-1 pa-0 z"
            auto-grow
            row-height="40"
            solo
          ></v-textarea>
        </v-col>

        <v-col cols="12" class="pt-0">
          <v-banner single-line class="">
            <span class="text-h5">Specific Information</span>
          </v-banner>
        </v-col>

        <v-col cols="12" class="pb-0 d-flex justify-space-between">
          <span class="text-h5 font-weight-regular">Chapters</span>
          <v-btn
            outlined
            large
            class="text-body-1 font-weight-medium"
            color="#25327F"
            :loading="createChapterLoading"
            :disabled="createChapterLoading"
            @click="addChapter"
            >Add Chapter</v-btn
          >
        </v-col>

        <v-col class="12">
          <v-expansion-panels multiple>
            <v-expansion-panel
              v-for="chapter in course.chapters"
              :key="chapter.id"
              readonly
            >
              <v-expansion-panel-header class="font-weight-regular text-h6">
                {{ `Chapter ${chapter.sequenceNumber} - ${chapter.title}` }}
                <template #actions>
                  <v-icon
                    color="#25327F"
                    class="mr-2"
                    @click="editChapter(chapter)"
                  >
                    mdi-pencil-outline
                  </v-icon>
                  <v-icon
                    color="error"
                    class="mr-3"
                    :disabled="deleteChapterDialog"
                    :loading="deleteChapterDialog"
                    @click="deleteChapter(chapter)"
                  >
                    mdi-delete-outline
                  </v-icon>
                </template>
              </v-expansion-panel-header>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>

        <!-- Chapter Add/Edit Dialog -->
        <v-dialog v-model="chapterDialog" max-width="50%">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ chapterFormTitle }}</span>
            </v-card-title>

            <v-card-text class="pb-0">
              <v-container>
                <v-row>
                  <v-col cols="4" class="pb-0">
                    <v-text-field
                      v-model="editedChapter.sequenceNumber"
                      label="Chapter Number"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col cols="8" class="pb-0">
                    <v-text-field
                      v-model="editedChapter.title"
                      label="Chapter Title"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" text @click="closeAddChapter">
                Cancel
              </v-btn>
              <v-btn color="#25327F" text @click="confirmAddChapter">
                Add
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Chapter Delete Dialog -->
        <v-dialog v-model="deleteChapterDialog" max-width="50%">
          <v-card>
            <v-card-title class="text-h5 justify-center"
              >Are you sure you want to delete this Chapter?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" text @click="closeDeleteChapter"
                >Cancel</v-btn
              >
              <v-btn color="#25327F" text @click="confirmDeleteChapter"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-col>

    <!-- Assign Teacher Section -->
    <v-col cols="4">
      <v-row>
        <v-col cols="8" class="text-h6">Assigned Teachers</v-col>
        <v-col cols="4" class="d-flex justify-end">
          <v-btn outlined color="orange darken-4" @click="assignCourseTeacher">
            <v-icon class="pr-1">mdi-account-plus-outline</v-icon>
            Assign
          </v-btn>
        </v-col>
        <v-col
          v-for="teacher in teachers"
          :key="teacher.id"
          cols="12"
          class="py-1"
        >
          <v-card outlined class="py-1" height="130%">
            <v-row>
              <v-col cols="4" class="pr-0 d-flex justify-end align-center">
                <v-avatar size="80" color="grey lighten-3">
                  <v-icon size="70" color="#25327F">mdi-account-outline</v-icon>
                </v-avatar>
              </v-col>
              <v-col cols="8">
                <v-row>
                  <v-col cols="12" class="pb-0">
                    <v-card-title>
                      {{
                        `${teacher.firstName} ${teacher.middleName} ${teacher.lastName}`
                      }}
                    </v-card-title>
                    <v-card-subtitle class="pb-0">
                      {{ teacher.department ? teacher.department.name : 'N/A' }}
                    </v-card-subtitle>
                  </v-col>
                  <v-col cols="12" class="pb-0 pl-6 pr-15">
                    <v-btn
                      block
                      outlined
                      color="error"
                      @click="removeCourseTeacher(teacher.id)"
                    >
                      <v-icon class="pr-1">mdi-account-minus-outline</v-icon>
                      Remove
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <!-- Assign Teacher to a Course -->
        <v-dialog v-model="assignTeacherDialog" max-width="25%">
          <v-card>
            <v-card-title class="pb-7">Assign Teacher</v-card-title>
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
            <v-card-actions class="pb-4 px-6 d-flex justify-space-between">
              <v-btn @click="assignCourseTeacherClose">Cancel</v-btn>
              <v-btn @click="assignCourseTeacherConfirm">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'courseManager',

  data() {
    return {
      course: null,
      teachers: [],
      courseId: this.$nuxt.context.params.courseId,
      overviewPanel: [0, 1],
      editedIndex: -1,
      editedChapter: {
        title: '',
        sequenceNumber: 0,
      },
      defaultChapter: {
        title: '',
        sequenceNumber: 0,
      },
      chapterDialog: false,
      deleteChapterDialog: false,
      assignTeacherDialog: false,
      courseDeleteDialog: false,
      editLoading: false,
      createChapterLoading: false,
      deleteChapterLoading: false,
      unassignedTeachers: [],
      teacherTypes: [],
      selectedTeacher: '',
      selectedTeacherType: '',
    }
  },

  computed: {
    chapterFormTitle() {
      return this.editedIndex === -1 ? 'New Chapter' : 'Edit Chapter'
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    async initialize() {
      const query = `query course($id: ID!) {
                      course(id: $id) {
                        id
                        code
                        name
                        description
                        overview
                        creditHour
                        chapters {
                          id
                          title
                          sequenceNumber
                        }
                        users {
                          id
                          firstName
                          middleName
                          lastName
                          roles {
                            id
                            name
                          }
                          department {
                            id
                            name
                          }
                        }
                      }
                    }`

      const variables = { id: this.courseId }

      const courseResponse = await this.$axios.post('/graphql', {
        query,
        variables,
      })

      this.course = courseResponse.data.data.course

      this.teachers = []
      for (const user of this.course.users) {
        for (const role of user.roles) {
          if (
            role !== 'TEACHER' ||
            role !== 'COURSE_OWNER' ||
            role !== 'COURSE_TEACHER'
          )
            break
        }
        this.teachers.push(user)
      }
    },

    async editCourse() {
      this.editLoading = true
      const query = `mutation updateCourse(
                      $id: ID!
                      $code: String
                      $name: String
                      $description: String
                      $overview: String
                      $creditHour: Int
                    ) {
                      updateCourse(
                        updateCourseInput: {
                          id: $id
                          code: $code
                          name: $name
                          description: $description
                          overview: $overview
                          creditHour: $creditHour
                        }
                      ) {
                        id
                        name
                        code
                        overview
                        description
                        creditHour
                      }
                    }`

      const variables = {
        id: this.courseId,
        code: this.course.code,
        name: this.course.name,
        description: this.course.description,
        overview: this.course.overview,
        creditHour: parseInt(this.course.creditHour),
      }

      await this.$axios.post('/graphql', {
        query,
        variables,
      })

      this.editLoading = false
    },

    deleteCourse() {
      this.courseDeleteDialog = true
    },

    deleteCourseClose(isCourseRemoved) {
      if (!isCourseRemoved) {
        this.courseDeleteDialog = false
        return null
      }

      this.$nextTick(() => {
        this.courseDeleteDialog = false
        this.$router.push({
          name: 'courseManager-id',
          params: { id: this.$nuxt.context.params.userId },
        })
      })
    },

    async deleteCourseConfirm() {
      const query = `mutation removeCourse($id: ID!) {
                      removeCourse(id: $id)
                    }`
      const variables = {
        id: this.courseId,
      }

      const removeCourseResponse = await this.$axios.post('/graphql', {
        query,
        variables,
      })

      const isCourseRemoved = removeCourseResponse.data.data.removeCourse

      if (isCourseRemoved) this.deleteCourseClose(true)

      this.deleteCourseClose(false)
    },

    addChapter() {
      this.chapterDialog = true
      this.createChapterLoading = true
    },

    editChapter(chapter) {
      this.editedIndex = chapter.id
      this.editedChapter = Object.assign({}, chapter)
      this.chapterDialog = true
    },

    deleteChapter(chapter) {
      this.editedIndex = chapter.id
      this.deleteChapterDialog = true
      this.deleteChapterLoading = true
    },

    closeAddChapter() {
      this.chapterDialog = false
      this.$nextTick(() => {
        this.editedChapter = Object.assign({}, this.defaultChapter)
        this.editedIndex = -1
        this.createChapterLoading = false
      })
    },

    async confirmAddChapter() {
      if (this.editedIndex !== -1) {
        // Edit Chapter with an id of this.editedIndex
        const updateChapterQuery = `mutation updateChapter($id: ID!, $title: String, $sequenceNumber: Int) {
                                      updateChapter(
                                        updateChapterInput: {
                                          id: $id
                                          title: $title
                                          sequenceNumber: $sequenceNumber
                                        }
                                      ) {
                                        id
                                        title
                                        sequenceNumber
                                      }
                                    }`
        const updateChapterVariables = {
          id: this.editedIndex,
          title: this.editedChapter.title,
          sequenceNumber: parseInt(this.editedChapter.sequenceNumber),
        }

        await this.$axios.post('/graphql', {
          query: updateChapterQuery,
          variables: updateChapterVariables,
        })
      } else {
        // Create a new Chapter
        const createChapterQuery = `mutation createChapter($title: String!, $sequenceNumber: Int!, $courseId: ID!) {
                                      createChapter(
                                        createChapterInput: {
                                          title: $title
                                          sequenceNumber: $sequenceNumber
                                          courseId: $courseId
                                        }
                                      ) {
                                        id
                                        title
                                        sequenceNumber
                                      }
                                    }`

        const createChapterVariables = {
          title: this.editedChapter.title,
          sequenceNumber: parseInt(this.editedChapter.sequenceNumber),
          courseId: this.courseId,
        }

        await this.$axios.post('/graphql', {
          query: createChapterQuery,
          variables: createChapterVariables,
        })
      }

      this.initialize()
      this.closeAddChapter()
    },

    closeDeleteChapter(isChapterRemoved) {
      this.deleteChapterDialog = false

      this.$nextTick(() => {
        this.editedIndex = -1
        this.deleteChapterLoading = false
        if (isChapterRemoved) this.initialize()
      })
    },

    async confirmDeleteChapter() {
      const query = `mutation removeChapter($id: ID!) {
                      removeChapter(id: $id)
                    }`

      const variables = {
        id: this.editedIndex,
      }

      const removeChaperResponse = await this.$axios.post('/graphql', {
        query,
        variables,
      })

      const isChapterRemoved = removeChaperResponse.data.data.removeChapter

      if (isChapterRemoved) this.closeDeleteChapter(true)
      else this.closeDeleteChapter(false)
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

    async assignCourseTeacher() {
      this.assignTeacherDialog = true

      this.teacherTypes = ['Course Owner', 'Course Teacher']

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

    async removeCourseTeacher(teacherId) {
      const query = `mutation unassignUserFromCourse ($courseId: ID! $userId: ID!) {
                      unassignUserFromCourse (courseId: $courseId userId: $userId)
                    }`

      const variables = {
        courseId: this.courseId,
        userId: teacherId,
      }

      const unassignedTeacherResponse = await this.$axios.post('/graphql', {
        query,
        variables,
      })

      const unassignedTeacher =
        unassignedTeacherResponse.data.data.unassignUserFromCourse

      if (unassignedTeacher) {
        // // Then revoke 'teacher' Role from assigned user
        // const revokeUserRoleQuery = `mutation revokeUserRole ($userId: ID! $roleName: RoleName!) {
        //                               revokeUserRole (userId: $userId roleName: $roleName) {
        //                                 id
        //                                 roles {
        //                                   id
        //                                   name
        //                                 }
        //                               }
        //                             }`
        // const revokeUserRoleVariables = {
        //   userId: this.selectedTeacher.id,
        //   roleName: 'TEACHER',
        // }
        // const revokeUserRoleResponse = await this.$axios.post('/graphql', {
        //   query: revokeUserRoleQuery,
        //   variables: revokeUserRoleVariables,
        // })
        // console.log('revokeUserRoleResponse', revokeUserRoleResponse)
      }

      this.initialize()
    },

    assignCourseTeacherClose() {
      this.assignTeacherDialog = false
    },

    async assignCourseTeacherConfirm() {
      const query = `mutation assignUserToCourse ($courseId: ID! $userId: ID!) {
                        assignUserToCourse (courseId: $courseId userId: $userId)
                      }`
      const variables = {
        userId: this.selectedTeacher.id,
        courseId: this.courseId,
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

      this.initialize()
      this.assignCourseTeacherClose()
    },
  },
}
</script>
