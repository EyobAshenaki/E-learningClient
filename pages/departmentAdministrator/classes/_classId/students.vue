<template>
  <v-row>
    <v-col class="my-15">
      <StudentsTable
        :students="students"
        :courses="courses"
        :is-rows-in-table-selectable="false"
        @updateComponent="initialize"
      />
    </v-col>
  </v-row>
</template>

<script>
  import StudentsTable from '~/components/StudentsTable.vue'
  export default {
    components: { StudentsTable },

    layout: 'departmentAdmin',

    data() {
      return {
        students: [],
        courses: [],
      }
    },

    created() {
      this.initialize()
    },

    methods: {
      async initialize() {
        this.students = []
        if (this.$nuxt.context.params.classId)
          await this.initializeClassStudents()
        else await this.initializeUser()

        await this.initializeCourses()
      },

      async initializeClassStudents() {
        const query = `query class($id: ID!) {
                        studentClass(id: $id) {
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

        const variables = {
          id: this.$nuxt.context.params.classId,
        }

        const classResponse = await this.$axios.post('/graphql', {
          query,
          variables,
        })

        this.students = classResponse.data.data.studentClass.students
      },

      async initializeCourses() {
        const query = `query user($id: ID!) {
                        user(id: $id) {
                          department {
                            ownedCourses {
                              id
                              name
                              code
                              creditHour
                            }
                          }
                        }
                      }`

        const variables = {
          id: this.$store.getters['auth/id'],
        }

        const userResponse = await this.$axios.post('/graphql', {
          query,
          variables,
        })

        this.courses = [...userResponse.data.data.user.department.ownedCourses]
      },

      async initializeUser() {
        const query = `query user($id: ID!) {
                        user(id: $id) {
                          id
                          firstName
                          middleName
                          lastName
                          department {
                            classes {
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

        this.students = userResponse.data.data.user.department.classes.reduce(
          (students, clss) => {
            if (clss.students.length > 0) {
              students.push(...clss.students)
            }
            return students
          },
          []
        )
      },
    },
  }
</script>
