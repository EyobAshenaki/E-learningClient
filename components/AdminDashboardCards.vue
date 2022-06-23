<template>
  <v-row class="ma-auto mt-8">
    <template v-if="$fetchState.pending">
      <v-col cols="3" v-for="item in 3" :key="item">
        <v-skeleton-loader type="card"></v-skeleton-loader>
      </v-col>
    </template>
    <template v-else>
      <v-col cols="4">
        <v-card
          class="mx-4 mb-4 rounded-lg d-flex align-center"
          max-width="300"
          outlined
          elevation="10"
          color="#D2042D"
        >
          <v-row>
            <v-col cols="12" class="pa-0 ml-7 mt-n5">
              <v-avatar size="65" color="white">
                <v-icon size="40" color="#000080"> mdi-account </v-icon>
              </v-avatar>
            </v-col>
            <v-col cols="7" class="pr-0">
              <v-list-item single-line class="pr-0">
                <v-list-item-content>
                  <v-list-item-title class="text-h9 white--text">
                    TOTAL Accounts
                  </v-list-item-title>
                  <v-list-item-subtitle class="white--text">{{
                    allUsers
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="5" class="pl-0 d-flex align-center">
              <v-btn
                color="#000080"
                class="white--text"
                :to="`${$route.path}/users`"
              >
                Details
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="mx-4 mb-4 rounded-lg d-flex align-center"
          max-width="300"
          outlined
          elevation="10"
          color="#30D5C8"
        >
          <v-row class="">
            <v-col cols="12" class="pa-0 ml-7 mt-n5">
              <v-avatar size="65" color="white">
                <v-icon size="40" color="#DA70D6"> mdi-account </v-icon>
              </v-avatar>
            </v-col>
            <v-col cols="7" class="pr-0">
              <v-list-item single-line class="pr-0">
                <v-list-item-content>
                  <v-list-item-title class="text-h9 white--text">
                    TOTAL STUDENTS
                  </v-list-item-title>
                  <v-list-item-subtitle class="white--text">{{
                    students
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="5" class="pl-0 d-flex align-center">
              <v-btn
                color="#DA70D6"
                class="white--text"
                :to="`${$route.path}/students`"
              >
                Details
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="mx-4 mb-4 rounded-lg d-flex align-center"
          max-width="300"
          outlined
          elevation="10"
          color="#8db600"
        >
          <v-row class="">
            <v-col cols="12" class="pa-0 ml-7 mt-n5">
              <v-avatar size="65" color="white">
                <v-icon size="40" color="#2a52be"> mdi-account </v-icon>
              </v-avatar>
            </v-col>
            <v-col cols="7" class="pr-0">
              <v-list-item single-line class="pr-0">
                <v-list-item-content>
                  <v-list-item-title class="text-h9 white--text">
                    TOTAL Teachers
                  </v-list-item-title>
                  <v-list-item-subtitle class="white--text">{{
                    teachers
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="5" class="pl-0 d-flex align-center">
              <v-btn
                color="#2a52be"
                class="white--text"
                :to="`${$route.path}/teachers`"
              >
                Details
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </template>
  </v-row>
</template>

<script>
  import { ACCOUNT_COUNTERS } from '~/utils/queries'

  export default {
    data() {
      return {
        allUsers: 0,
        students: 0,
        teachers: 0,
      }
    },
    fetchOnServer: false,
    async fetch() {
      const counters = await this.$axios
        .post('/graphql', {
          query: ACCOUNT_COUNTERS,
        })
        .then(({ data }) => data.data.accountCounters)
      this.allUsers = counters.allUsers
      this.students = counters.students
      this.teachers = counters.teachers
    },
  }
</script>
