<template>
  <!-- v-if="moment(assignment.submissionDeadline).isAfter(moment())" -->

  <div class="mt-3">
    <v-card>
      <v-card-title primary-title class="ml-3">
        <h2>{{ assignment.name }}</h2>
      </v-card-title>
      <v-divider class="mx-6"></v-divider>

      <v-card-text class="ml-3">
        <v-row>
          <h4 class="ma-3 text-h6">
            Deadline:
            <span class="text-body-1">{{
              `${moment(assignment.submissionDeadline).format(
                'llll'
              )} - ${new moment().to(moment(assignment.submissionDeadline))}`
            }}</span>
          </h4>
        </v-row>
        <v-divider v-if="!isStudent" class="mt-3"></v-divider>
        <v-row v-if="!isStudent" class="mt-1">
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
        <v-divider v-if="!isStudent" class="mt-3"></v-divider>
        <v-row class="mt-1">
          <!-- Instraction File Button -->
          <v-col>
            <v-btn
              :small="!isStudent"
              outlined
              target="_blank"
              :href="`${$config.baseUrl}/upload/${assignment.instructionsFile}`"
              color="primary"
              class="mx-auto"
              ><v-icon color="primary" class="mr-3">mdi-cloud-download</v-icon>
              Instructions File
            </v-btn>
          </v-col>

          <v-spacer></v-spacer>

          <!-- View Submissions Button -->
          <v-col v-if="!isStudent">
            <v-btn
              small
              class="mx-0"
              nuxt
              :to="`${$route.path}/${assignment.id}/submissions`"
              ><v-icon class="mr-3">mdi-file-upload</v-icon> Submissions
            </v-btn>
          </v-col>

          <v-col v-if="isStudent" class="mr-6">
            <v-btn
              outlined
              target="_blank"
              color="secondary darken-1"
              @click="uploadDialog = true"
            >
              <v-icon color="secondary darken-1" class="mr-3">
                mdi-file-upload
              </v-icon>
              Submit File
            </v-btn>
          </v-col>
        </v-row>

        <!-- Assignment Submit Dialog -->
        <v-dialog v-model="uploadDialog" max-width="500px">
          <v-card>
            <v-card-title class="mb-3 text-h5 d-flex justify-center">
              Submit Assignment
            </v-card-title>
            <v-card-text class="pb-0">
              <v-file-input
                v-model="submittedAssignment"
                label="Assignment"
                filled
                show-size
              ></v-file-input>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-spacer></v-spacer>
              <v-btn color="error darken-1" text @click="closeAssignmentUpload">
                Cancel
              </v-btn>
              <v-btn
                color="primary darken-1"
                text
                @click="confirmAssignmentUpload"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      isStudent: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        uploadDialog: false,
        submittedAssignment: null,
      }
    },
    computed: {
      evaluatedCount() {
        const { submissions } = this.assignment
        return submissions.filter((v) => v.totalScore !== null).length
      },
    },
    methods: {
      moment,

      closeAssignmentUpload() {
        this.submittedAssignment = null
        this.uploadDialog = false
      },

      async confirmAssignmentUpload() {
        const perQuery = (studentId, definitionId, submissionDate) => ({
          operations: `
          {
            "query": "mutation create_submission($submissionDate:Date! $file:Upload! $definitionId:ID! $studentId:ID!){createAssignmentSubmission(createAssignmentSubmissionInput:{submissionDate:$submissionDate file:$file definitionId:$definitionId studentId:$studentId}){id submissionDate totalScore submissionFile}}",
            "variables": {"submissionDate": "${submissionDate}", "file": null, "definitionId": "${definitionId}", "studentId": "${studentId}"}, 
            "operationName": "create_submission"
          }`,
          map: `{"0": ["variables.file"]}`,
        })

        const query = perQuery(
          this.$nuxt.context.params.id,
          this.assignment.id,
          new Date().toISOString()
        )

        const formData = new FormData()
        formData.append('operations', query.operations)
        formData.append('map', query.map)
        formData.append('0', this.submittedAssignment)

        const createAssignmentSubmissionResponse = await this.$axios.post(
          '/graphql',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )

        const submission =
          createAssignmentSubmissionResponse?.data?.data
            ?.createAssignmentSubmission

        submission
          ? console.log('Assignment Submission Success')
          : console.log('Assignment Submission Failed')

        this.closeAssignmentUpload()
      },
    },
  }
</script>

<style lang="scss" scoped></style>
