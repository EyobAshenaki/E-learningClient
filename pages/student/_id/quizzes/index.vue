<template>
  <v-row>
    <v-col cols="12" class="d-flex align-center">
      <h2 style="display: inline">All Tests</h2>
      <v-divider class="mx-2 my-0" vertical></v-divider>
      <span v-if="quizzes"> {{ quizzes.length }} in total</span>
    </v-col>
    <v-col cols="12">
      <v-card
        v-for="quiz in quizzes"
        :key="quiz.id"
        max-width="360"
        elevation="14"
        class="ma-3"
        style="display: inline-block"
      >
        <v-card-title>
          {{ quiz.title }}
        </v-card-title>
        <v-card-subtitle class="pb-2">
          {{ quiz.description }}
        </v-card-subtitle>

        <v-chip
          v-if="!quiz.isQuizOngoing"
          class="ml-4 mb-3 font-weight-medium"
          color="success darken-2"
          outlined
          label
        >
          <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
          Complete
        </v-chip>
        <v-chip
          v-else
          class="ml-4 mb-3 font-weight-medium"
          color="primary"
          outlined
          label
        >
          <v-icon left> mdi-timelapse </v-icon>
          Incomplete
        </v-chip>

        <v-divider class="mx-4"></v-divider>

        <v-row class="pa-6 pb-0">
          <v-col cols="5" class="px-0">
            <v-icon color="primary darken-1"> mdi-calendar-range </v-icon>
            {{ formatDate(quiz.start) }}
          </v-col>
          <v-col cols="2" class="px-0 d-flex justify-center">
            <v-icon color="primary darken-1"> mdi-arrow-right </v-icon>
          </v-col>
          <v-col cols="5" class="px-0">
            <v-icon color="primary darken-1">mdi-calendar-range</v-icon>
            {{ formatDate(quiz.end) }}
          </v-col>
          <v-col cols="6">
            <v-icon color="primary darken-1">mdi-timer-outline</v-icon>
            {{ quiz.duration / 60000 }} min
          </v-col>
          <v-col cols="6">
            <v-icon color="primary darken-1"> mdi-chart-sankey-variant </v-icon>
            Grade {{ quiz.maxScore }}%
          </v-col>
        </v-row>

        <v-card-actions class="pl-6 py-5">
          <v-btn
            class="black--text text--lighten-4"
            color="secondary lighten-1"
            depressed
            :disabled="!quiz.isQuizOngoing"
            @click="gotoQuizPage(quiz.id)"
            >Start now</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    layout: 'student',

    data() {
      return {
        quizzes: [],
      }
    },

    created() {
      this.initialize()
    },

    methods: {
      async initialize() {
        const query = `query quizzes {
                      quizzes {
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

        const quizzesResponse = await this.$axios.post('/graphql', {
          query,
        })

        // this.quizzes = await this.organizeQuizzes(
        //   quizzesResponse.data.data.quizzes
        // )

        this.quizzes = await this.assignQuizStatuses(
          quizzesResponse.data.data.quizzes
        )
      },

      async organizeQuizzes(quizzes) {
        const tempArr = []
        for (const quiz of quizzes) {
          const temp = await this.quizStatus(quiz.id)
          if (temp) tempArr.push(quiz)
        }

        return tempArr
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

      formatDate(dateObj) {
        const date = new Date(dateObj)

        return `${date.getDate()} ${
          date.toString().split(' ')[1]
        }, ${date.getHours()}:${date.getMinutes().toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}`
      },

      gotoQuizPage(quizId) {
        this.$router.push({
          name: 'student-id-quizzes-quizPage',
          params: { id: this.$nuxt.context.params.id, quizId },
        })
      },
    },
  }
</script>
