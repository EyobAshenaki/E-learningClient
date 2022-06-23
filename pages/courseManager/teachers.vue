<template>
  <v-row>
    <v-col v-for="teacher in teachers" :key="teacher.id" cols="4" class="mt-5">
      <v-card>
        <v-row class="py-4">
          <!-- Teacher card head section -->
          <v-col cols="12">
            <v-row>
              <v-col cols="4" class="d-flex justify-end">
                <v-avatar size="90" color="grey lighten-3">
                  <v-icon size="70" color="#25327F">mdi-account-outline</v-icon>
                </v-avatar>
              </v-col>
              <v-col cols="8">
                <v-card-title class="pa-0">
                  {{
                    `${teacher.firstName} ${teacher.middleName} ${teacher.lastName}`
                  }}
                </v-card-title>
                <v-card-subtitle class="pa-0 py-3">
                  {{ teacher.email }}
                </v-card-subtitle>
                <v-card-text
                  v-for="role in teacher.roles"
                  :key="role.id"
                  class="pa-1 pb-1"
                >
                  <v-chip small color="blue darken-2" dark>
                    {{ role.name }}
                  </v-chip>
                </v-card-text>
              </v-col>
            </v-row>
          </v-col>
          <!-- Teacher card body section -->
          <v-col cols="12">
            <v-row justify="center">
              <v-col cols="10" class="pa-0">
                <v-list-item class="px-0">
                  <v-list-item-avatar color="grey lighten-3">
                    <v-icon color="#25327F">mdi-collage</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ teacher.department ? teacher.department.name : 'N/A' }}
                    </v-list-item-title>
                    <v-list-item-subtitle> Department </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="5" class="pa-0">
                <v-list-item class="px-0">
                  <v-list-item-avatar color="grey lighten-3">
                    <v-icon color="#25327F">mdi-book-multiple-outline</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{
                        teacher.teachingCourses
                          ? teacher.teachingCourses.length
                          : 'N/A'
                      }}
                    </v-list-item-title>
                    <v-list-item-subtitle> Courses </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="5" class="pa-0">
                <v-list-item class="px-0">
                  <v-list-item-avatar color="grey lighten-3">
                    <v-icon color="#25327F">mdi-home-city-outline</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{
                        teacher.attendingClass
                          ? teacher.attendingClass.length
                          : 'N/A'
                      }}
                    </v-list-item-title>
                    <v-list-item-subtitle> Classes </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    layout: 'courseManager',
    data() {
      return {
        teachers: [],
      }
    },

    created() {
      this.initialize()
    },

    methods: {
      async initialize() {
        this.teachers = await this.getTeachers()
      },

      getRoleName(role) {
        const tempRole = role.split(' ')
        return tempRole.length > 1
          ? `${tempRole[0].toUpperCase()}_${tempRole[1].toUpperCase()}`
          : `${tempRole[0].toUpperCase()}`
      },

      async getUsersWithRole(role) {
        const query = `query users($filter: UserFilter) {
                            users(filter: $filter) {
                              id
                              firstName
                              middleName
                              lastName
                              email
                              roles {
                                id
                                name
                              }
                              department{
                                name
                              }
                              attendingClass {
                                id
                                year
                                section
                              }
                              teachingCourses {
                                id
                                name
                              }
                            }
                          }`

        const variables = {
          filter: {
            roleName: this.getRoleName(role),
          },
        }

        const userResponse = await this.$axios.post('/graphql', {
          query,
          variables,
        })

        return userResponse.data.data.users
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
    },
  }
</script>
