<template>
  <v-card color="transparent">
    <v-card-title class="text-h5 font-weight-medium">
      <span>{{ quiz.title }} </span>
      <v-card-subtitle class="text-h6">{{ quiz.subtitle }}</v-card-subtitle>
      <v-spacer />
      <v-dialog v-model="deleteDialog" max-width="500px">
        <template #activator="{ attrs, on }">
          <v-btn outlined color="red" v-bind="attrs" v-on="on"> Delete </v-btn>
        </template>
        <v-card :disabled="deleting" :loading="deleting" class="mx-auto">
          <v-card-title>Confirm Action</v-card-title>
          <v-card-text class="text-body-1"
            >Are you sure you want to delete this quiz?</v-card-text
          >
          <v-card-actions>
            <v-btn
              :disabled="deleting"
              :loading="deleting"
              outlined
              color="red"
              @click="deleteQuiz"
            >
              Delete
            </v-btn>
            <v-spacer />
            <v-btn :disabled="deleting" outlined @click="deleteDialog = false">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-title>
    <v-divider class="mx-4 my-2" />
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <p class="text-h6 d-flex align-center">
            Duration
            <v-icon dark color="orange" size="25" class="mx-2"
              >mdi-clock</v-icon
            >
          </p>
          <p class="text-body-1">{{ duration }} minutes</p>
        </v-col>
        <v-col cols="4">
          <p class="text-h6 d-flex align-center">
            Start Date
            <v-icon dark color="blue" size="25" class="mx-2"
              >mdi-alarm-check</v-icon
            >
          </p>
          <p class="text-body-1">{{ startDate }}</p>
        </v-col>
        <v-col cols="4">
          <p class="text-h6 d-flex align-center">
            End Date
            <v-icon class="mx-2" dark color="red" size="25"
              >mdi-alarm-bell</v-icon
            >
          </p>
          <p class="text-body-1">{{ endDate }}</p>
        </v-col>
        <v-divider class="mx-4 my-2" />
        <v-col cols="12">
          <v-row>
            <v-col class="d-flex align-center">
              <span class="text-h6">Status :</span>
              <v-chip
                dark
                :color="status.color"
                class="text-uppercase mx-2 py-2"
                >{{ status.text }}</v-chip
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
        large
        :disabled="attempted"
        outlined
        class="px-2 py-4"
        :to="`${$route.path}/${quiz.id}/attempts`"
        ><v-chip label dark class="mx-2" :color="attempts.color">{{
          attempts.number
        }}</v-chip>
        Attempts <v-icon>mdi-chevron-right</v-icon></v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
  import moment from 'moment'
  import { DELETE_QUIZ } from '~/utils/queries'
  export default {
    props: {
      quiz: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        deleteDialog: false,
        deleting: false,
      }
    },
    computed: {
      attempted() {
        return this.attempts.length > 0
      },
      duration() {
        return moment.duration(this.quiz.duration).asMinutes()
      },
      startDate() {
        return moment(this.quiz.start).format('DD-MM-YY : h:mm A')
      },
      endDate() {
        return moment(this.quiz.end).format('DD-MM-YY : h:mm A')
      },
      status() {
        if (moment().isBefore(this.quiz.start)) {
          return {
            text: 'pending',
            color: 'green darken-2',
          }
        } else if (moment().isBefore(this.quiz.end)) {
          return {
            text: 'ongoing',
            color: 'orange darken-2',
          }
        } else {
          return {
            text: 'complete',
            color: 'red darken-2',
          }
        }
      },
      attempts() {
        const number = this.quiz.attempts.length
        const color = number ? 'primary' : 'grey'
        return {
          color,
          number,
        }
      },
    },
    methods: {
      async deleteQuiz() {
        this.deleting = true
        await this.$axios.post('/graphql', {
          query: DELETE_QUIZ,
          variables: {
            id: this.quiz.id,
          },
        })
        this.$emit('delete:quiz', this.quiz.id)
      },
    },
  }
</script>