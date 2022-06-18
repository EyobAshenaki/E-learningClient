<template>
  <v-card v-if="course" class="pa-1 rounded-lg">
    <v-row align="center" justify="center" class="py-4">
      <v-col cols="12">
        <v-row>
          <v-col cols="4" class="d-flex justify-end">
            <v-avatar size="80" color="grey lighten-3">
              <v-icon size="50" color="#25327F">mdi-book</v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="8">
            <v-card-title class="pa-0">
              {{ course.name }}
            </v-card-title>
            <v-card-subtitle class="pa-0 pt-3">
              {{
                course.owner
                  ? `${course.owner.firstName} ${course.owner.middleName} ${course.owner.lastName}`
                  : 'N/A'
              }}
            </v-card-subtitle>
            <v-card-text class="pa-0">
              <v-list-item class="px-0">
                <v-list-item-avatar rounded="" color="grey lighten-3">
                  <v-icon color="#25327F">mdi-bookshelf</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ course.code }}
                  </v-list-item-title>
                  <v-list-item-subtitle> Code </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
          </v-col>
        </v-row>
      </v-col>

      <v-divider class="mx-5 mb-4"></v-divider>

      <v-col cols="12" class="pa-0 ml-12 mb-3">
        <v-row justify="center">
          <v-col cols="5" class="pa-0">
            <v-list-item class="px-0">
              <v-list-item-avatar color="grey lighten-3">
                <v-icon color="#25327F">mdi-book-open-variant</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ course.chapters ? course.chapters.length : 'N/A' }}
                </v-list-item-title>
                <v-list-item-subtitle> Chapters </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>

          <v-col cols="5" class="pa-0">
            <v-list-item class="px-0">
              <v-list-item-avatar color="grey lighten-3">
                <v-icon color="#25327F">mdi-timer-outline</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ course.creditHour }}
                </v-list-item-title>
                <v-list-item-subtitle> Credit </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-col>
      <v-btn outlined color="orange darken-4" class="mt-2 px-10"
        >View Course</v-btn
      >
    </v-row>
  </v-card>
</template>

<script>
  export default {
    props: {
      courseId: {
        type: String,
        required: true,
      },
    },

    data() {
      return {
        course: null,
      }
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
                          creditHour
                          chapters {
                            id
                          }
                          owner {
                            id
                            firstName
                            middleName
                            lastName
                          }
                        }
                      }`

        const variables = {
          id: this.courseId,
        }

        const courseResponse = await this.$axios.post('/graphql', {
          query,
          variables,
        })

        this.course = courseResponse.data.data.course
      },
    },
  }
</script>
