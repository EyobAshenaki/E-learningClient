<template>
  <v-row>
    <v-col>
      <v-card color="transparent">
        <v-card-title class="text-h4">Quiz Attempts </v-card-title>
        <v-card-text>
          <v-data-table :items="attempts" :headers="headers">
            <template #item.user="{ item }">
              <span>{{ fullName(item.user) }}</span>
            </template>
            <template #item.completed="{ item }">
              <v-chip v-if="item.completed" color="green" label
                >Completed</v-chip
              >
              <v-chip v-else color="orange" label>Ongoing</v-chip>
            </template>
            <template #item.actions="{ item }">
              <v-btn
                replace
                :to="`grade/${item.id}`"
                :disabled="item.grade !== null || !item.completed"
                color="primary"
                text
                outlined
                >Grade <v-icon class="ml-2">mdi-chevron-right</v-icon></v-btn
              >
            </template>
            <template #item.grade="{ item }">
              <v-chip v-if="item.grade === null" color="grey"
                >Not Graded</v-chip
              >
              <v-chip v-else color="orange lighten-2">
                {{ item.grade.score }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
  import { ATTEMPTS_FOR_QUIZ } from '~/utils/queries'
  export default {
    layout: "teacher",
    async asyncData({ params, $axios }) {
      const attempts = await $axios
        .post('/graphql', {
          query: ATTEMPTS_FOR_QUIZ,
          variables: {
            id: params.quizId,
          },
        })
        .then(({ data }) => data.data.attemptsForQuiz)
      return { attempts }
    },
    data() {
      return {
        headers: [
          {
            text: 'Student',
            value: 'user',
          },
          {
            text: 'Completed',
            value: 'completed',
          },
          {
            text: 'Score',
            value: 'grade',
          },
          {
            text: 'Actions',
            value: 'actions',
            sortable: false,
            width: '25%',
          },
        ],
      }
    },
    methods: {
      fullName(user) {
        console.log(user)
        return [user.firstName, user?.middleName, user?.lastName].join(' ')
      },
    },
  }
</script>