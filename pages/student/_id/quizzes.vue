<template>
  <v-row>
    <v-col cols="12" class="d-flex align-center">
      <h2 style="display: inline">All Tests</h2>
      <v-divider class="mx-2 my-0" vertical></v-divider>
      <span>3 in total</span>
    </v-col>
    <v-col cols="12">
      <v-card
        v-for="n in 10"
        :key="n"
        max-width="360"
        elevation="14"
        class="ma-3"
        style="display: inline-block"
      >
        <v-card-title>Exam-1</v-card-title>
        <v-card-subtitle>Database Design</v-card-subtitle>

        <v-divider class="mx-4"></v-divider>

        <v-row class="pa-6 pb-0">
          <v-col cols="5" class="px-0">
            <v-icon>mdi-calendar-range</v-icon>21 Oct, 1:00pm
          </v-col>
          <v-col cols="2" class="px-0 d-flex justify-center">
            <v-icon>mdi-arrow-right</v-icon>
          </v-col>
          <v-col cols="5" class="px-0">
            <v-icon>mdi-calendar-range</v-icon>24 Oct, 7:00pm
          </v-col>
          <v-col cols="6"> <v-icon>mdi-timer-outline</v-icon> 3 min </v-col>
          <v-col cols="6">
            <v-icon>mdi-chart-sankey-variant</v-icon> 20 Questions
          </v-col>
          <v-col cols="6">
            <v-icon>mdi-account-multiple-outline</v-icon> 200 students
          </v-col>
        </v-row>

        <v-card-actions class="pl-6 py-5">
          <v-btn depressed @click="gotoQuizPage">Start now</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'student',

  data() {
    return {}
  },

  methods: {
    gotoQuizPage() {
      this.$router.push({ name: 'student-id-quizPage', params: { id: 1 } })
    },
  },
}
</script>
