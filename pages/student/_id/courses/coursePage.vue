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
                      <span class="text-h6">{{ quizzes.length }} &nbsp;</span>
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
                        {{ assignments.length }}&nbsp;
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
              v-for="chapter in sortChapters"
              :key="chapter.id"
              readonly
            >
              <v-expansion-panel-header class="font-weight-regular text-h6">
                {{ `Chapter ${chapter.sequenceNumber} - ${chapter.title}` }}
              </v-expansion-panel-header>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <v-col v-else cols="12">
          <span class="text-h6">No Chapters Currently...</span>
        </v-col>
      </v-row>
    </v-col>

    <!-- Assignments Section -->
    <v-col cols="12" class="justify-center ml-15 mt-6">
      <v-row style="width: 100%">
        <v-col cols="12" class="">
          <span style="margin-left: 0.8em; font-size: 1.8em">Assignments</span>
        </v-col>
        <v-col v-if="assignments.length" cols="12" class="pt-0 pb-2">
          <v-row
            v-for="assignment in assignments"
            :key="assignment.id"
            class="d-flex align-center"
          >
            <v-col cols="6">
              <assignment-definition-card
                :assignment="assignment"
                :is-student="true"
              />
            </v-col>
            <v-col cols="1" class="d-flex justify-center align-center">
              <v-icon color="success" size="50">mdi-arrow-right</v-icon>
            </v-col>
            <v-col cols="5">
              <assignment-submission-card
                v-for="submission in assignment.submissions"
                :key="submission.id"
                :submission="submission"
                :definition="assignment"
                :is-student="true"
              />
            </v-col>

            <v-divider></v-divider>
          </v-row>
        </v-col>
        <v-col v-else cols="12">
          <span class="text-h6">No Assignments Currently...</span>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-divider class="mx-14 my-6"></v-divider>
    </v-col>

    <!-- Quizzes Section -->
    <v-col cols="12" class="justify-center mt-6">
      <v-row style="width: 100%; max-height: 47em; overflow: hidden">
        <v-col cols="12" class="ml-10">
          <v-row>
            <v-col cols="10">
              <span style="margin-left: 0.8em; font-size: 1.8em">Quizzes</span>
            </v-col>

            <v-col v-if="quizzes.length" cols="2">
              <v-btn
                color="secondary"
                text
                :to="{
                  name: 'student-id-quizzes',
                  params: { id: $route.params.id, courseId: course.id },
                }"
              >
                View all
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col v-if="quizzes.length" cols="12" class="pt-0 pb-2 ml-5">
          <v-row>
            <v-col v-for="quiz in quizzes" :key="quiz.id" cols="4">
              <quiz-info-card :quiz="quiz" />
            </v-col>
          </v-row>
        </v-col>
        <v-col v-else cols="12" class="ml-15">
          <span class="text-h6">No Quizzes Currently...</span>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-divider class="mx-14 my-6"></v-divider>
    </v-col>

    <!-- Teachers Section -->
    <v-col cols="12" class="d-flex justify-center">
      <v-row style="margin-left: 1.5em">
        <!-- Teacher list Section -->
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
  </v-row>
</template>

<script>
  import _ from 'lodash'
  import AssignmentDefinitionCard from '~/components/AssignmentDefinitionCard.vue'
  import AssignmentSubmissionCard from '~/components/AssignmentSubmissionCard.vue'
  import QuizInfoCard from '~/components/QuizInfoCard.vue'
  export default {
    components: {
      AssignmentDefinitionCard,
      AssignmentSubmissionCard,
      QuizInfoCard,
    },
    layout: 'student',

    data() {
      return {
        course: null,
        teachers: [],
        assignments: [],
        quizzes: [],
      }
    },

    computed: {
      sortChapters() {
        return _.orderBy(this.course.chapters, 'sequenceNumber')
      },
    },

    async created() {
      await this.initialize()
      await this.initializeAssignments()
      await this.initializeQuizzes()
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

        console.log(this.assignments)
      },

      async initializeAssignments() {
        const query = `query assignmentDefinitions($courseId: ID!) {
                        assignmentDefinitions(courseId: $courseId) {
                          id
                          created_at
                          name
                          submissionDeadline
                          maximumScore
                          isCriteriaBased
                          instructionsFile
                          course {students{id firstName middleName lastName}}
                          criteria { id title weight }
                          submissions {
                            id
                            submissionDate
                            submissionFile
                            totalScore
                            submittedBy {
                              firstName
                              middleName
                              lastName
                            }
                          }
                        }
                      }`

        const variables = {
          courseId: this.course.id,
        }

        const assignmentsRes = await this.$axios.post('/graphql', {
          query,
          variables,
        })

        this.assignments = assignmentsRes.data.data.assignmentDefinitions

        console.log(this.assignments)
      },

      async initializeQuizzes() {
        const query = `query quizzesForCourse($courseId: ID!) {
                        quizzesForCourse(courseId: $courseId) {
                          id
                          title
                          description
                          start
                          end
                          duration
                          maxScore
                          sections {
                            id
                            description
                            sectionType
                            number
                            questions {
                              id
                              text
                              number
                              questionType
                            }
                          }
                        }
                      }`

        const variables = {
          courseId: this.$nuxt.context.params.courseId,
        }

        const quizzesForCourseResponse = await this.$axios.post('/graphql', {
          query,
          variables,
        })

        this.quizzes = await this.assignQuizStatuses(
          quizzesForCourseResponse?.data?.data?.quizzesForCourse
        )
      },

      async assignQuizStatuses(quizzes) {
        for (const quiz of quizzes) {
          const temp = await this.quizStatus(quiz.id)
          quiz.isQuizOngoing = temp
        }

        return quizzes
      },

      async quizStatus(quizId) {
        const query = `query myAttemptForQuiz($quizId: ID!, $userId: ID!) {
                        myAttemptForQuiz(quizId: $quizId, userId: $userId) {
                          id
                        }
                      }`

        const variables = {
          quizId,
          userId: this.$nuxt.context.params.id,
        }

        const myAttemptForQuizResponse = await this.$axios.post('/graphql', {
          query,
          variables,
        })

        const isQuizOngoing =
          !myAttemptForQuizResponse.data.data.myAttemptForQuiz

        return isQuizOngoing
      },
    },
  }
</script>
