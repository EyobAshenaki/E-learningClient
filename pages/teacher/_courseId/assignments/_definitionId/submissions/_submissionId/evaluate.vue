<template>
  <div>
    <v-card v-if="!$fetchState.pending" min-width="750px">
      <v-card-title>Evaluating Submission</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        Assignment Title:&nbsp; {{ definition.name }}
        <v-row>
          <h4 class="ma-3">
            Deadline on:
            <span>{{
              `${moment(definition.submissionDeadline).format(
                'llll'
              )} - ${new moment().to(moment(definition.submissionDeadline))}`
            }}</span>
          </h4>
        </v-row>
      </v-card-text>
      <v-card-text>
        <v-card flat outlined>
          <v-card-title> Submitted By: {{ fullName }} </v-card-title>
          <v-divider />
          <v-row class="mb-1 ml-1">
            <v-col class="ml-auto my-auto mt-2 mb-n3"
              ><strong> Submitted:</strong> {{ submissionTime }}</v-col
            >
          </v-row>
          <v-divider class="mb-2"></v-divider>
          <v-row class="mb-n1 ml-1">
            <v-col class="ml-auto my-auto"
              ><v-chip>{{ evaluationStatus }}</v-chip></v-col
            >
            <v-divider vertical></v-divider
            ><v-col
              ><div class="ma-0 mt-1">
                <strong> Score:&nbsp;</strong
                >{{
                  submission.totalScore > 0 ? submission.totalScore : '-'
                }}/{{ definition.maximumScore }}
              </div></v-col
            ></v-row
          >
          <v-divider></v-divider>
          <criteria-list
            v-slot="slotProps"
            :criteria="definition.criteria"
            :is-on-evaluation="true"
            >
            
            <criterion-value-slider
              :is-on-evaluation="true"
              :criterion="slotProps.criterion"
          /></criteria-list>
        </v-card>
      </v-card-text>
    </v-card>

    <v-skeleton-loader v-else type="card" height="300px" width="600px" />
  </div>
</template>

<script>
  import moment from 'moment'
  import { humanizedDiff } from '@/utils/moment-shorthand'
  export default {
    data() {
      return {
        submission: null,
        definition: null,
      }
    },
    async fetch() {
      await this.$store.dispatch(
        'course-management/fetchSubmissionToEvaluate',
        this.$route.params.submissionId
      )
      this.submission = this.$store.getters[
        'course-management/getSubmissionToEvaluate'
      ]
      this.definition = this.submission.definition
    },
    computed: {
      fullName() {
        if (this.submission) {
          const { firstName, middleName, lastName } =
            this.submission?.submittedBy
          return `${firstName} ${middleName} ${lastName}`
        }
        return `No Data`
      },
      submissionTime() {
        const submissionDeadline = moment(this.definition?.submissionDeadline)
        let { submissionDate } = this
        submissionDate = moment(submissionDate)
        let value
        if (submissionDate.isBefore(submissionDeadline, 'seconds')) {
          value = `${humanizedDiff(
            moment,
            submissionDate,
            submissionDeadline
          )} Early`
        } else if (submissionDate.isAfter(submissionDeadline, 'seconds')) {
          value = `${humanizedDiff(
            moment,
            submissionDeadline,
            submissionDate
          )} Early`
        } else value = ` Late`
        return `${value}`
      },
      evaluationStatus() {
        return `${this.submission?.totalScore > 0 ? '' : 'NOT '} EVALUATED`
      },
    },
    methods: {
      moment,
    },
    fetchOnServer: false,
  }
</script>
