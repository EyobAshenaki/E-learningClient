<template>
  <div>
    <v-card flat outlined class="mt-3" :width="isStudent ? '23em' : ''">
      <v-card-title v-if="!isStudent">
        Submitted By: {{ fullName }}
      </v-card-title>

      <v-divider v-if="!isStudent" />

      <v-row v-if="!isStudent" class="mb-1 ml-1">
        <v-col class="ml-auto my-auto mt-2 mb-n3">
          <strong> Submitted:</strong> {{ submissionTime }}
        </v-col>
      </v-row>

      <v-card-text v-if="isStudent" class="text-h6">
        Submitted: &nbsp;<span class="text-body-1"> {{ submissionTime }} </span>
      </v-card-text>

      <v-divider v-if="!isStudent" class="mb-2"></v-divider>

      <v-row class="mb-n1 ml-1" :class="isStudent ? 'ml-2' : ''">
        <v-col class="ml-auto my-auto">
          <v-chip outlined color="primary"> {{ evaluationStatus }} </v-chip>
        </v-col>
        <v-divider
          v-if="submission.totalScore"
          :class="isStudent ? 'my-2 ml-n5 mr-3' : ''"
          vertical
        ></v-divider>
        <v-col v-if="submission.totalScore">
          <div class="ma-0 mt-1">
            <strong> Score:&nbsp;</strong>
            {{ submission.totalScore ? submission.totalScore : '-' }}/{{
              definition.maximumScore
            }}
          </div>
        </v-col>
      </v-row>

      <v-divider v-if="!isStudent"></v-divider>

      <v-card-actions :class="isStudent ? 'pl-6 pr-10 pt-3 mb-2' : ''">
        <v-btn
          :small="!isStudent"
          outlined
          :block="isStudent"
          color="secondary darken-1"
          target="_blank"
          :href="`${$config.baseUrl}/upload/${submission.submissionFile}`"
        >
          <v-icon class="mr-2" color="secondary darken-1">mdi-download</v-icon>
          Download
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn v-if="!isStudent" small text outlined @click="evaluate()">
          <v-icon class="mr-2">mdi-file-check</v-icon> Evaluate
        </v-btn>

        <v-dialog v-if="!isStudent" v-model="evaluateDialog" max-width="450px">
          <v-card>
            <v-card-title
              primary-title
              style="word-break: break-word"
              class="text-wrap-word"
            >
              Evaluating Assignment Submitted By:&nbsp;
              <p class="brown--text mb-0">{{ `${fullName}` }}</p>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-form ref="evaluateNormalAssignmentForm" lazy-validation>
                <v-row class="mr-1">
                  <v-col cols="9.5">
                    <v-text-field
                      id="totalScore"
                      v-model="totalScore"
                      name="totalScore"
                      label="Score"
                      :rules="[
                        rules.required,
                        rules.isNumeric,
                        isInRange(totalScore, 0, definition.maximumScore),
                      ]"
                    />
                  </v-col>
                  <v-btn class="primary my-auto" @click="save()">save</v-btn>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  import moment from 'moment'
  import { humanizedDiff } from '@/utils/moment-shorthand'
  import { isInRange } from '@/utils/validators'
  export default {
    props: {
      submission: {
        type: Object,
        required: true,
      },
      definition: {
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
        evaluateDialog: false,
        totalScore: null,
        rules: {
          required: (v) => !!v || 'This field is required',
          isNumeric(v) {
            return isFinite(v) || 'Only numeric values are allowed'
          },
        },
      }
    },
    computed: {
      fullName() {
        const { firstName, middleName, lastName } = this.submission.submittedBy
        return `${firstName} ${middleName} ${lastName}`
      },
      submissionTime() {
        const submissionDeadline = moment(this.definition.submissionDeadline)
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
        return `${this.submission.totalScore > 0 ? '' : 'NOT '} EVALUATED`
      },
    },
    methods: {
      moment,
      evaluate() {
        if (this.definition.isCriteriaBased) {
          this.$router.push(
            `${this.$route.path}/${this.submission.id}/evaluate`
          )
        } else {
          this.evaluateDialog = true
        }
      },
      save() {
        if (!this.$refs.evaluateNormalAssignmentForm.validate()) return
        this.$store.dispatch('course-management/evaluateNormalAssignment', {
          submissionId: this.submission.id,
          totalScore: Number(this.totalScore),
        })
        Object.assign(this.submission, { totalScore: this.totalScore })
        this.$refs.evaluateNormalAssignmentForm.reset()
        this.evaluateDialog = false
      },
      isInRange,
    },
  }
</script>

<style lang="scss" scoped>
  .text-wrap-word {
    word-break: break-word;
  }
</style>
