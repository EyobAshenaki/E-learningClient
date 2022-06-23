<template>
  <!-- todo! complete course details on this page -->
  <!-- todo! complete tooltips for all icon-based buttons -->
  <v-card outlined class="py-4 px-2">
    <!-- Course card head section -->
    <v-row justify="space-around" class="px-2">
      <v-col cols="4" align-self="center">
        <v-avatar size="90" color="grey lighten-3">
          <v-icon size="60" color="#25327F">mdi-book-open-outline</v-icon>
        </v-avatar>
      </v-col>
      <v-col cols="8">
        <v-card-title style="word-break: break-word">{{
          course.name
        }}</v-card-title>
        <v-card-subtitle>{{ course.code }}</v-card-subtitle>
      </v-col>
    </v-row>
    <v-card-text>
      <!-- Course Button Group -->
      <v-row>
        <v-col>
          <v-btn
            nuxt
            :to="`${$route.path}/${course.id}/course-documents`"
            block
          >
            Course Documents
            <v-icon color="orange darken-4" class="ml-2">mdi-file</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn nuxt :to="`${$route.path}/${course.id}/quizzes`" block>
            Quizzes
            <v-icon color="#25327F" class="ml-2">mdi-text-box</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn block>
            Assignments
            <v-icon color="amber darken-3" class="ml-2"
              >mdi-clipboard-text-clock</v-icon
            >
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      course: {
        type: Object,
        required: true,
      },
    },
  }
</script>
