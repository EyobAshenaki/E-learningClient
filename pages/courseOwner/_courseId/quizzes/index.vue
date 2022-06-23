<template>
  <v-row>
    <v-col>
      <v-card flat color="transparent">
        <v-card-text class="text-h4 d-flex justify-space-between"
          ><p>
            Quizzes for {{ course.name }}
            <span class="text-h5 text--lighten-4">({{ course.code }})</span>
          </p>
          <v-btn to="addQuiz" replace
            >Add Quiz <v-icon color="orange">mdi-plus</v-icon></v-btn
          >
        </v-card-text>
        <v-divider class="mx-4 mt-2" />
        <v-card-text>
          <v-row>
            <v-col v-for="quiz in quizzes" :key="quiz.id" cols="4">
              <quizCard :quiz="quiz" @delete:quiz="updateQuizzes" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import { COURSE, QUIZZES_FOR_COURSE } from '~/utils/queries'
  export default {
    async asyncData({ params, $axios }) {
      const quizzes = await $axios
        .post('/graphql', {
          query: QUIZZES_FOR_COURSE,
          variables: { id: params.courseId },
        })
        .then(({ data }) => data.data.quizzesForCourse)
      const course = await $axios
        .post('/graphql', {
          query: COURSE,
          variables: { id: params.courseId },
        })
        .then(({ data }) => data.data.course)
      return { quizzes, course }
    },
    methods: {
      updateQuizzes(id) {
        const indexOfQuizToRemove = this.quizzes.findIndex(
          (quiz) => quiz.id === id
        )
        this.quizzes.splice(indexOfQuizToRemove, 1)
      },
    },
  }
</script>