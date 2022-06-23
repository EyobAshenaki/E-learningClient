<template>
  <!-- v-if="moment(assignment.submissionDeadline).isAfter(moment())" -->
  
  <div class="mt-3">
    <v-card>
      <v-card-title primary-title>
        <span> Title: </span>
        <h2>{{ assignment.name }}</h2>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-row>
          <h4 class="ma-3">
            Submission Deadline on:
            <span>{{
              `${moment(assignment.submissionDeadline).format(
                'llll'
              )} - ${new moment().to(moment(assignment.submissionDeadline))}`
            }}</span>
          </h4>
        </v-row>
        <v-divider class="mt-3"></v-divider>
        <v-row class="mt-1">
          <h4 class="ma-3">
            Total Submissions:
            <span>{{ `${assignment.submissions.length}` }}</span> /
            <span>{{ `${assignment.course.students.length}` }}</span>
          </h4>
          <h4 class="ma-3">
            Total Evaluated:
            <span>{{ `${evaluatedCount}` }}</span> /
            <span>{{ `${assignment.submissions.length}` }}</span>
          </h4>
        </v-row>
        <v-divider class="mt-3"></v-divider>
        <v-row class="mt-1">
          <v-col>
            <v-btn
              small
              target="_blank"
              :href="`${$config.baseUrl}/upload/${assignment.instructionsFile}`"
              class="mx-auto"
              ><v-icon class="mr-3">mdi-cloud-download</v-icon> Instructions
              File
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-btn
              small
              class="mx-0"
              nuxt
              :to="`${$route.path}/${assignment.id}/submissions`"
              ><v-icon class="mr-3">mdi-file-upload</v-icon> Submissions
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="assignment.isCriteriaBased && assignment.criteria.length">
          <v-col cols="12">
            <criteria-list :criteria="assignment.criteria" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    props: {
      assignment: {
        type: Object,
        required: true,
      },
    },
    computed: {
      evaluatedCount() {
        const { submissions } = this.assignment
        return submissions.filter((v) => v.totalScore !== null).length
      },
    },
    methods: { moment },
  }
</script>

<style lang="scss" scoped></style>
