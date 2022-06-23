<template>
  <v-row>
    <v-col cols="12" class="d-flex align-center">
      <h2 style="display: inline">All Tests</h2>
      <v-divider class="mx-2 my-0" vertical></v-divider>
      <span v-if="quizzes"> {{ quizzes.length }} in total</span>
    </v-col>
    <v-col cols="12">
      <quiz-info-card v-for="quiz in quizzes" :key="quiz.id" :quiz="quiz" />
    </v-col>
  </v-row>
</template>

<script>
  import QuizInfoCard from '~/components/QuizInfoCard.vue'
  export default {
    components: { QuizInfoCard },
    layout: 'student',

    data() {
      return {
        quizzes: [],
        courses: [],
      }
    },

    async created() {
      if (!this.$nuxt.context.params.courseId) await this.initialize()
      else await this.initializeQuiz(this.$nuxt.context.params.courseId)
    },

    methods: {
      async initialize() {
        const query = `query user($id: ID!) {
                        user(id: $id) {
                          attendingCourses {
                            id
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

        this.courses = userResponse?.data?.data?.user.attendingCourses

        for (const course of this.courses) {
          await this.initializeQuiz(course.id)
        }
      },

      async initializeQuiz(courseId) {
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
          courseId,
        }

        const quizzesForCourseResponse = await this.$axios.post('/graphql', {
          query,
          variables,
        })

        const quizzes = await this.assignQuizStatuses(
          quizzesForCourseResponse.data.data.quizzesForCourse
        )

        this.quizzes.push(...quizzes)

        console.log(this.quizzes)
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
