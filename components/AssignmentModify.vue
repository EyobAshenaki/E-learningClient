<template>
  <div>
    <v-card
      ><v-card-title primary-title> <h1>New Assignment</h1> </v-card-title
      ><v-divider /><v-form
        ref="assignmentModifyForm"
        lazy-validation
        class="px-7"
      >
        <v-row class="mt-1">
          <v-text-field
            id="name"
            v-model="name"
            name="name"
            label="Title"
            :rules="[required]"
          ></v-text-field>
        </v-row>
        <v-row class="mt-1">
          <v-text-field
            id="maximumScore"
            v-model="maximumScore"
            name="maximumScore"
            label="Maximum Score"
            :rules="[required, numbers, isInRange(maximumScore, 0, 25)]"
          ></v-text-field>
        </v-row>
        <v-subheader class="mb-0 mt-0"
          >Assignment Submission Deadline Date &amp; Time</v-subheader
        >
        <v-row>
          <v-col>
            <v-menu v-model="deadlineDateMenu">
              <template #activator="{ on, attrs }">
                <v-text-field
                  :value="formattedDeadlineDate"
                  label="Deadline Date"
                  readonly
                  v-bind="attrs"
                  :rules="[required, isInTheFuture]"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="deadlineDate"
                required
                @click="deadlineDateMenu = false"
              />
            </v-menu>
          </v-col>
          <v-col>
            <v-menu v-model="deadlineTimeMenu" :close-on-content-click="false">
              <template #activator="{ on, attrs }">
                <v-text-field
                  :value="formattedDeadlineTime"
                  label="Deadline Time"
                  readonly
                  v-bind="attrs"
                  :rules="[required]"
                  v-on="on"
                />
              </template>
              <v-time-picker
                v-model="deadlineTime"
                :rules="[required]"
                @click:minute="deadlineTimeMenu = false"
                @update:period="deadlineTimeMenu = false"
              />
            </v-menu> </v-col
        ></v-row>
        <v-row>
          <v-file-input
            id="instructionsFile"
            v-model="instructionsFile"
            name="instructionsFile"
            label="Instructions File"
            placeholder="Select a file"
            accept=".pdf,.doc,.docx,.zip"
            :rules="[required]"
          ></v-file-input
        ></v-row>
        <v-row class="my-0"
          ><v-col class="py-0"
            ><v-switch
              v-model="isCriteriaBased"
              label="Add Criteria?"
              inset
            ></v-switch></v-col
        ></v-row>
        <div v-if="isCriteriaBased">
          <criterion-pseudo-form
            v-for="(criterion, index) in criteria"
            :key="index"
            v-model="criteria[index]"
            @remove-criterion="removeCriterion(index + 1)"
          />
          <v-row>
            <v-col class="d-flex justify-end"
              ><v-btn color="info" outlined @click="addCriterion"
                >Add Criterion <v-icon>mdi-plus</v-icon></v-btn
              ></v-col
            >
          </v-row>
        </div> </v-form
      ><v-divider class="mt-4" />
      <v-btn color="primary" class="ml-3 my-2" @click="save()">Save</v-btn>
    </v-card>
  </div>
</template>

<script>
  import moment from 'moment'
  import {
    required,
    numbers,
    isInRange,
    isInTheFuture,
  } from '~/utils/validators'
  export default {
    props: {
      modifyMode: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        name: null,
        maximumScore: null,
        deadlineDateMenu: false,
        deadlineDate: null,
        deadlineTimeMenu: false,
        deadlineTime: null,
        instructionsFile: null,
        isCriteriaBased: false,
        criteria: [{ number: 1, title: null, weight: null }],
      }
    },
    computed: {
      formattedDeadlineDate() {
        return this.deadlineDate
          ? moment(this.deadlineDate).format('dddd, MMMM Do YYYY')
          : ''
      },
      formattedDeadlineTime() {
        return this.deadlineTime
          ? moment(this.deadlineTime, ['HH.mm']).format('h:mm A')
          : ''
      },
    },
    watch: {
      isCriteriaBased(newBool, _oldBool) {
        if (!newBool) this.criteria = [{ number: 1, title: null, weight: null }]
      },
    },
    methods: {
      required,
      numbers,
      isInRange,
      moment,
      isInTheFuture,
      addCriterion() {
        // eslint-disable-next-line dot-notation
        this.criteria.push({ number: this.criteria.length + 1 })
      },
      removeCriterion(idx) {
        if (idx === this.criteria.length) {
          if (idx !== 1) this.criteria.pop()
          else {
            this.isCriteriaBased = false
            this.criteria = [{ number: 1, title: null, weight: null }]
          }
        } else if (this.criteria.length >= idx) {
          this.criteria.splice(idx)
        }
      },
      save() {
        if (!this.$refs.assignmentModifyForm.validate()) return
        const { courseId } = this.$route.params
        const {
          name,
          maximumScore,
          isCriteriaBased,
          deadlineDate,
          deadlineTime,
          instructionsFile,
          criteria,
        } = this
        let submissionDeadline = moment(deadlineDate)
        submissionDeadline.add(Number(deadlineTime.substring(0, 2)), 'hours')
        submissionDeadline.add(Number(deadlineTime.substring(3, 5)), 'minutes')
        submissionDeadline = submissionDeadline.toISOString()
        this.$store.dispatch('course-management/createAssignmentDefinition', {
          courseId,
          name,
          maximumScore,
          isCriteriaBased,
          submissionDeadline,
          instructionsFile,
          criteria,
        })
        this.$store.dispatch('course-management/fetchAssignments')
        this.$router.push({ name: 'courseOwner-courseId-assignments' })
      },
    },
  }
</script>

<style lang="scss" scoped></style>
