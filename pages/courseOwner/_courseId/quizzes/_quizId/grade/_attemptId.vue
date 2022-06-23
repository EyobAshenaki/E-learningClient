<template>
  <v-row>
    <v-col v-if="!$fetchState.pending">
      <v-card color="transparent">
        <v-card-title>Evaluate Attempt </v-card-title>
        <v-card-subtitle
          >Attempt by :
          <span class="font-weight-bold">{{ fullName }}</span></v-card-subtitle
        >
        <v-divider class="mx-4 my-2" />
        <v-card-text>
          <v-row>
            <v-col cols="4" class="text-h5">
              Current Score :
              <span class="font-weight-bold"
                >{{ score }} / {{ quiz.maxScore }}</span
              >
            </v-col>
          </v-row>
          <v-divider class="my-4" />
          <v-row>
            <v-col cols="6" class="text-h6">Question</v-col>
            <v-col cols="4" class="text-h6">Student Attempt</v-col>
            <v-col cols="2" class="text-h6">Evaluation</v-col>
          </v-row>
          <v-row>
            <v-col>
              <AttemptGradeInput
                v-for="(questionAndAnswer, index) in questionsAndAnswers"
                :key="questionAndAnswer.question.id"
                v-model="marks[index]"
                :data="questionAndAnswer"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :loading="loading"
            :disabled="loading"
            class="my-2 mx-4"
            large
            color="orange"
            @click="evaluate"
            >Submit Evaluation</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col v-else>
      <v-skeleton-loader type="card" />
    </v-col>
  </v-row>
</template>
<script>
  import {
    ATTEMPT,
    GRADE_ATTEMPT,
    QUESTIONS_FOR_QUIZ,
    QUIZ,
  } from '~/utils/queries'
  export default {
    data() {
      return {
        attempt: null,
        questions: null,
        loading: false,
        quiz: null,
        marks: [],
      }
    },
    fetchOnServer: false,
    async fetch() {
      this.attempt = await this.$axios
        .$post('/graphql', {
          query: ATTEMPT,
          variables: { id: this.$route.params.attemptId },
        })
        .then(({ data }) => {
          if (data.errors) throw data.errors
          return data.attempt
        })
      this.questions = await this.$axios
        .$post('/graphql', {
          query: QUESTIONS_FOR_QUIZ,
          variables: {
            id: this.$route.params.quizId,
          },
        })
        .then(({ data }) => data.questionsForQuiz)
      this.quiz = await this.$axios
        .post('/graphql', {
          query: QUIZ,
          variables: {
            id: this.$route.params.quizId,
          },
        })
        .then(({ data }) => data.data.quiz)
    },
    computed: {
      fullName() {
        const { firstName, middleName, lastName } = this.attempt.user
        return [firstName, middleName, lastName].join(' ')
      },
      questionsAndAnswers() {
        return this.questions.map((question) => ({
          question,
          answer: this.attempt.questions.find(
            (questionAttempt) => questionAttempt.question.id === question.id
          ),
        }))
      },
      score() {
        const correctMarks = this.marks.filter((mark) => mark) || []
        console.log(correctMarks)
        const percentage = correctMarks.length
          ? correctMarks.length / this.questions.length
          : 0
        return this.quiz.maxScore * percentage
      },
    },
    methods: {
      async evaluate() {
        this.loading = true
        await this.$axios.post('/graphql', {
          query: GRADE_ATTEMPT,
          variables: {
            attemptId: this.$route.params.attemptId,
            markerId: this.$store.getters['auth/id'],
            score: this.score,
          },
        })
        this.$toast.success('Successfully Graded Quiz Attempt')
        this.$router.back()
      },
    },
  }
</script>