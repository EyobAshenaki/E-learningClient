<template>
  <v-row style="margin-top: 2em">
    <v-col cols="8">
      <v-row>
        <!-- Welcome section -->
        <v-col cols="12">
          <v-card height="250" elevation="0" color="grey lighten-4">
            <v-row style="height: 100%">
              <v-col
                cols="6"
                class="d-flex align-center justify-center"
                style="height: 100%"
              >
                <v-row class="d-flex justify-end">
                  <v-col cols="11" class="py-0">
                    <p class="mb-0 text-h3 text-left font-weight-light">
                      Welcome Back,
                    </p>
                  </v-col>
                  <v-col v-if="user" cols="11" class="py-0">
                    <p
                      class="orange--text text--darken-2 text-h4 text-left font-weight-medium"
                    >
                      {{ user.firstName }}
                    </p>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <img
                  style="height: 120%; margin-top: -3.3em"
                  src="@/assets/img/tourist-welcome.svg"
                  alt=""
                />
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" class="mt-15">
          <span class="text-h5 d-flex align-center mb-5">
            Today's Activities
          </span>

          <v-list>
            <v-list-item v-for="n in 3" :key="n" class="mb-2">
              <v-list-item-icon>
                <v-icon>mdi-book-open-page-variant-outline</v-icon>
              </v-list-item-icon>

              <v-list-item-title>Database Design</v-list-item-title>

              <v-list-item-subtitle>Quiz</v-list-item-subtitle>

              <v-list-item-subtitle>Aster Muleta</v-list-item-subtitle>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="4">
      <v-row>
        <!-- Quizzes Section -->
        <v-col cols="12">
          <v-card class="half-fullheight pt-0" elevation="0">
            <v-card-title primary-title class="justify-center pb-0">
              Quizzes
            </v-card-title>
            <v-list>
              <template v-for="(n, idx) in 4">
                <v-list-item :key="idx" class="mx-3">
                  <v-list-item-content>
                    <v-list-item-title>Quiz 1</v-list-item-title>
                    <v-list-item-subtitle>Database Design</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-card elevation="0"> 9/10 </v-card>
                </v-list-item>
                <v-divider :key="idx" class="mx-4"></v-divider>
              </template>
            </v-list>
          </v-card>
          <div class="blur">
            <v-btn class="quiz-btn"> View all Quizzes</v-btn>
          </div>
        </v-col>

        <!-- Assignments Section -->
        <v-col cols="12">
          <v-card class="half-fullheight pt-0" elevation="0">
            <v-card-title primary-title class="justify-center pb-0">
              Assignments
            </v-card-title>
            <v-list>
              <template v-for="(n, idx) in 4">
                <v-list-item :key="idx" class="mx-3">
                  <v-list-item-content>
                    <v-list-item-title>Assignment 1</v-list-item-title>
                    <v-list-item-subtitle>Database Design</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-card elevation="0"> 9/15 </v-card>
                </v-list-item>
                <v-divider :key="idx" class="mx-4"></v-divider>
              </template>
            </v-list>
          </v-card>
          <div class="blur">
            <v-btn class="assignment-btn"> View all Assignments</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    layout: 'student',

    data() {
      return {
        model: null,
        user: null,
      }
    },

    created() {
      this.initialize()
    },

    methods: {
      async initialize() {
        const query = `query user($id: ID!) {
                        user(id: $id) {
                          id
                          firstName
                          middleName
                          lastName
                        }
                      }`

        const variables = {
          id: this.$nuxt.context.params.id,
        }

        const userResponse = await this.$axios.post('/graphql', {
          query,
          variables,
        })

        this.user = userResponse.data.data.user
      },
    },
  }
</script>

<style scoped>
  .half-fullheight {
    position: relative;
    max-height: 41vh;
    overflow: hidden;
  }

  .blur {
    margin-top: -3em;
    margin-left: -0.2em;
    position: relative;
    height: 55px;
    width: 102%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(
      rgb(255 255 255 / 0%),
      rgb(255 255 255 / 95%),
      rgb(255 255 255 / 100%)
    );
  }
</style>
