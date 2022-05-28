<template>
  <v-row style="margin-top: 2em">
    <v-col cols="12">
      <v-row>
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
                          class="orange--text text--darken-4 text-h4 text-left font-weight-medium"
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
            <!-- Courses section -->
            <v-col cols="12" class="mt-15">
              <v-row>
                <v-col cols="12">
                  <v-row>
                    <!-- Course header Section -->
                    <v-col cols="3" class="text-h5 d-flex align-center"
                      >Classes</v-col
                    >
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <!-- Classes section -->
        <v-col cols="4">
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col cols="6" class="text-h5 d-flex align-center">
                  Courses
                </v-col>
                <v-col cols="6" class="d-flex justify-end">
                  <v-btn text color="orange darken-4" @click="goToClassesPage"
                    >View all</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
            <v-col v-for="n in 3" :key="n" cols="12" class="py-1">
              Course
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>

    <!-- Class cards Section -->
    <v-col v-for="n in 4" :key="n" cols="12" md="4" class="mt-5">
      <v-card elevation="0" outlined width="340">
        <v-card-text class="pa-3">
          <v-row>
            <!-- Class Card head -->
            <v-col cols="12">
              <v-row>
                <v-col cols="12" class="d-flex justify-center">
                  <v-avatar size="50" color="orange lighten-4">
                    <v-icon size="40" color="orange darken-4"
                      >mdi-roman-numeral-1</v-icon
                    >
                  </v-avatar>
                </v-col>
                <v-col cols="12" class="pt-0 d-flex justify-center">
                  <span class="pa-0 text-h6 font-weight-regular black--text">
                    1st year
                  </span>
                </v-col>
              </v-row>
            </v-col>

            <!-- Class Card body -->
            <v-col cols="12" class="py-6 grey lighten-4">
              <v-row>
                <v-col cols="12" class="pa-0 pl-5 pb-3">
                  <v-avatar
                    size="40"
                    color="orange darken-4"
                    class="mr-2"
                    rounded
                  >
                    <v-icon size="28" color="orange lighten-5"
                      >mdi-alphabetical-variant</v-icon
                    >
                  </v-avatar>
                  <span class="text-body-1">Sections</span>
                </v-col>
                <v-col cols="12" class="">
                  <v-row>
                    <v-col
                      v-for="s in 3"
                      :key="s"
                      cols="6"
                      class="pa-0 d-flex justify-center"
                    >
                      <v-chip
                        class="ma-2 elevation-3"
                        color="white"
                        @click="goToSectionPage()"
                      >
                        <v-avatar
                          size="30"
                          color="orange darken-4"
                          class="pl-3 ml-n1 mr-2"
                        >
                          <v-icon left color="orange lighten-5" size="28">
                            mdi-alpha-a
                          </v-icon>
                        </v-avatar>

                        Students - 50
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="pl-5">
              <span class="text-subtitle-1">Total students - 150</span>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="px-5 d-flex flex-column">
          <v-btn
            block
            outlined
            class="mb-2"
            color="#25327F lighten-4"
            @click="assignCoursesToClasses()"
          >
            <v-icon class="pr-2" style="color: #25327f">
              mdi-book-plus-multiple
            </v-icon>
            <span class="text--darken-4" style="color: #25327f">
              Assign Courses
            </span>
          </v-btn>
          <v-btn
            block
            outlined
            class="ml-0"
            color="orange darken-4"
            @click="removeCoursesToClasses()"
          >
            <v-icon class="pr-2" color="orange darken-4">
              mdi-book-minus-multiple
            </v-icon>
            <span class="orange--text text--darken-4"> Remove Courses </span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'departmentAdmin',

  data() {
    return {
      user: null,
    }
  },

  created() {
    this.initializeUser()
  },

  methods: {
    async initializeUser() {
      const query = `query user ($id: ID!) {
                      user (id: $id) {
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

    goToClassesPage() {
      console.log('Classes Page')
    },

    assignCoursesToClasses() {
      console.log('Assign Courses')
    },

    removeCoursesToClasses() {
      console.log('Remove Courses')
    },

    goToSectionPage() {
      console.log('Section Page')
      this.$router.push({
        name: 'departmentAdminstrator-id-section-sectionId',
        params: { id: this.$nuxt.context.params.id, sectionId: 1 },
      })
    },
  },
}
</script>
