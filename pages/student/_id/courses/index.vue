<template>
  <v-row>
    <v-col cols="12" class="pb-0 mt-5">
      <span class="text-h5">Current Courses</span>
    </v-col>
    <v-col cols="12" class="pt-0 mt-5">
      <v-row>
        <v-col v-for="course in courses" :key="course.id" cols="4">
          <student-course-card :course-id="course.id" />
        </v-col>
      </v-row>
    </v-col>

    <!-- Activities Section -->
    <!-- <v-col cols="7">
      <v-row>
        <v-col cols="12">
          <v-banner single-line>
            <h3>February 2022</h3>

            <template #actions>
              <v-btn fab x-small elevation="5">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn fab x-small elevation="5">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </template>
          </v-banner>
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-slide-group
            v-model="activitySlideGroup"
            class="py-2"
            center-active
            show-arrows
          >
            <v-slide-item v-for="n in 15" :key="n" v-slot="{ active, toggle }">
              <v-card
                :class="active ? 'text--primary' : 'text--black'"
                class="mx-2 border-radius-1"
                height="50"
                width="50"
                outlined
                @click="toggle"
              >
                <v-card-text
                  class="fill-height pa-0 d-flex align-center justify-center"
                >
                  <h3>{{ n }}</h3>
                </v-card-text>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-col>
        <v-col cols="12">
          <v-list>
            <v-list-item
              v-for="n in 2"
              :key="n"
              class="grey lighten-3 ma-2 border-radius-1"
            >
              <v-list-item-content
                class="justify-center"
                style="max-width: 60px"
              >
                <v-card
                  height="50"
                  max-width="50"
                  outlined
                  class="border-radius-1"
                >
                  <v-card-text
                    class="fill-height pa-0 d-flex align-center justify-center"
                  >
                    <h3>DB</h3>
                  </v-card-text>
                </v-card>
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-title class="text-center">
                  Database Design
                </v-list-item-title>

                <v-list-item-subtitle class="text-center"
                  >Aster Muleta</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-title class="text-center">
                  Assignment-2
                </v-list-item-title>

                <v-list-item-subtitle class="text-center">
                  out of 20
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-information</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <div class="blur">
            <v-btn class="quiz-btn"> View all</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-col> -->
  </v-row>
</template>

<script>
  export default {
    layout: 'student',

    data() {
      return {
        courses: [],
      }
    },

    created() {
      this.initialize()
    },

    methods: {
      async initialize() {
        const query = `query user($id: ID!) {
                          user(id: $id) {
                            attendingCourses {
                              id
                              code
                              name
                              description
                              overview
                              creditHour
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

        this.courses = userResponse.data.data.user.attendingCourses
      },
    },
  }
</script>

<style scoped>
  .half-fullheight {
    position: relative;
    max-height: 41vh;
    overflow: hidden;
  }

  .blur {
    margin-top: -3em;
    margin-left: -0.2em;
    position: relative;
    height: 55px;
    width: 102%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(
      rgb(255 255 255 / 0%),
      rgb(255 255 255 / 95%),
      rgb(255 255 255 / 100%)
    );
  }

  .border-radius-1 {
    border-radius: 0.7em;
  }
</style>
