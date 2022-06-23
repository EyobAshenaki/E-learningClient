<template>
  <v-card
    max-width="360"
    elevation="7"
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
        Score {{ quiz.maxScore }}%
      </v-col>
    </v-row>

    <v-card-actions class="pl-6 py-5">
      <v-btn
        class="black--text text--lighten-4"
        color="secondary lighten-1"
        depressed
        :disabled="!quiz.isQuizOngoing"
        :to="{
          name: 'student-id-quizzes-quizPage',
          params: { id: $route.params.id, quizId: quiz.id },
        }"
      >
        Start now
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: {
      quiz: {
        type: Object,
        required: true,
      },
    },

    methods: {
      formatDate(dateObj) {
        const date = new Date(dateObj)

        return `${date.getDate()} ${
          date.toString().split(' ')[1]
        }, ${date.getHours()}:${date.getMinutes().toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}`
      },
    },
  }
</script>
