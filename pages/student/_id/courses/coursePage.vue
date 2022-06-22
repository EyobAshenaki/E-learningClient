<template>
  <v-row v-if="course">
    <!-- Header Section -->
    <v-col cols="12" class="d-flex justify-center mt-10">
      <v-card width="90%">
        <v-card-text>
          <v-row>
            <v-col
              cols="4"
              class="text-h4 d-flex align-center font-weight-medium"
            >
              {{ course.name }}
            </v-col>

            <v-divider vertical class="my-4 mx-2"></v-divider>

            <v-col cols="7">
              <v-row>
                <!-- Chapters Part -->
                <v-col cols="4">
                  <v-row>
                    <v-col cols="12" class="d-flex justify-center">
                      <v-avatar color="primary lighten-2" size="70">
                        <v-icon class="white--text" size="40">
                          mdi-text-box-multiple
                        </v-icon>
                      </v-avatar>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center pa-0 pb-3">
                      <br />
                      <span class="text-h6">
                        {{
                          course.chapters ? course.chapters.length : 'N/A'
                        }}&nbsp;
                      </span>
                      <span class="text-h6">Chapters</span>
                    </v-col>
                  </v-row>
                </v-col>

                <!-- Quizzes Part -->
                <v-col cols="4">
                  <v-row>
                    <v-col cols="12" class="d-flex justify-center">
                      <v-avatar color="primary lighten-2" size="70">
                        <v-icon class="white--text" size="40">
                          mdi-checkbox-multiple-marked
                        </v-icon>
                      </v-avatar>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center pa-0 pb-3">
                      <br />
                      <span class="text-h6">2 &nbsp;</span>
                      <span class="text-h6">Quizzes</span>
                    </v-col>
                  </v-row>
                </v-col>

                <!-- Assignments Part -->
                <v-col cols="4">
                  <v-row>
                    <v-col cols="12" class="d-flex justify-center">
                      <v-avatar color="primary lighten-2" size="70">
                        <v-icon class="white--text" size="40">
                          mdi-file-edit
                        </v-icon>
                      </v-avatar>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center pa-0 pb-3">
                      <br />
                      <span class="text-h6">
                        {{
                          course.assignmentDefinitions
                            ? course.assignmentDefinitions.length
                            : 'N/A'
                        }}&nbsp;
                      </span>
                      <span class="text-h6">Assignments</span>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Chapter Section -->
    <v-col cols="12" class="d-flex justify-center mt-8">
      <v-row style="width: 80%">
        <v-col cols="12" class="pb-0">
          <span style="margin-left: 2.5em; font-size: 1.8em">
            Course Content
          </span>
        </v-col>

        <v-col v-if="course.chapters" cols="12">
          <v-expansion-panels multiple style="width: 90%" class="mx-auto">
            <v-expansion-panel
              v-for="chapter in course.chapters"
              :key="chapter.id"
              readonly
            >
              <v-expansion-panel-header class="font-weight-regular text-h6">
                {{ `Chapter ${chapter.sequenceNumber} - ${chapter.title}` }}
              </v-expansion-panel-header>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-col>

    <!-- Teachers Section -->
    <v-col cols="12" class="d-flex justify-center">
      <v-row style="margin-left: 1.5em">
        <v-col cols="5">
          <v-row v-if="teachers">
            <v-col cols="12" class="my-2">
              <span style="margin-left: 1.6em; font-size: 1.8em">Teachers</span>
            </v-col>
            <v-col cols="12">
              <v-row v-for="teacher in teachers" :key="teacher.id">
                <v-col cols="12">
                  <v-row>
                    <v-col
                      cols="3"
                      class="pr-0 d-flex justify-end align-center"
                    >
                      <v-avatar size="80" color="primary lighten-2">
                        <v-icon size="60" color="grey lighten-4"
                          >mdi-account-outline</v-icon
                        >
                      </v-avatar>
                    </v-col>
                    <v-col cols="9">
                      <v-row>
                        <v-col cols="12" class="pb-0">
                          <v-card-title>
                            {{
                              `${teacher.firstName} ${teacher.middleName} ${teacher.lastName}`
                            }}
                          </v-card-title>
                          <v-card-subtitle class="pb-0">
                            {{
                              teacher.department
                                ? teacher.department.name
                                : 'N/A'
                            }}
                          </v-card-subtitle>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>

        <!-- SVG Section -->
        <v-col cols="7">
          <img
            style="height: 90%; margin-left: -3em"
            src="@/assets/img/teacher_group.svg"
            alt=""
          />
        </v-col>
      </v-row>
    </v-col>

    <!--  -->
  </v-row>
</template>

<script>
  export default {
    layout: 'student',

    data() {
      return {
        course: null,
        teachers: [],
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
                          chapters {
                            id
                            title
                            sequenceNumber
                          }
                          owner {
                            id
                            firstName
                            middleName
                            lastName
                            department {
                              id
                              name
                            }
                          }
                          teachers {
                            id
                            firstName
                            middleName
                            lastName
                            department {
                              id
                              name
                            }
                          }
                          assignmentDefinitions {
                            id
                            name
                            submissionDeadline
                            maximumScore
                          }
                        }
                      }`

        const variables = {
          id: this.$nuxt.context.params.courseId,
        }

        const courseResponse = await this.$axios.post('/graphql', {
          query,
          variables,
        })

        this.course = courseResponse.data.data.course

        this.teachers = this.course.teachers.filter((teacher) => !!teacher)
        if (this.course.owner) this.teachers.push(this.course.owner)
      },
    },
  }
</script>
