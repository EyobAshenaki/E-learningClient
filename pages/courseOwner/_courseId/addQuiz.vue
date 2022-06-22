<template>
  <v-container>
    <v-card>
      <v-card-title>Create A Quiz</v-card-title>
      <v-divider class="my-2 mx-4" />
      <v-card-text>
        <v-container>
          <v-form v-model="valid">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="title"
                  label="Quiz Title"
                  :rules="[rules.required]"
                />
                <v-text-field
                  v-model="description"
                  label="Quiz Description"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="maxScore"
                  label="Maximum score allowed"
                  :rules="[rules.required, rules.numbers]"
                  type="number"
                  min="0"
                />
                <v-text-field
                  v-model="duration"
                  label="Maximum allowed time in minutes"
                  :rules="[rules.required, rules.numbers]"
                  type="number"
                  min="0"
                />
              </v-col>
            </v-row>
            <v-divider class="my-2" />
            <v-row>
              <v-col cols="6">
                <p class="text-h6">Quiz Start Date</p>
                <v-menu
                  v-model="start_date_menu"
                  :close-on-click="false"
                  max-width="300"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      :value="formattedStartDate"
                      label="Start Date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="start_date"
                    required
                    @click="start_date_menu = false"
                  />
                </v-menu>
                <v-menu
                  v-model="start_time_menu"
                  :close-on-click="false"
                  max-width="300"
                  :close-on-content-click="false"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      :value="formattedStartTime"
                      label="Start Time"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-time-picker
                    v-model="start_time"
                    @click:minute="start_time_menu = false"
                    @update:period="start_time_menu = false"
                  />
                </v-menu>
              </v-col>
              <v-col cols="6">
                <p class="text-h6">Quiz End Date</p>
                <v-menu
                  v-model="end_date_menu"
                  :close-on-click="false"
                  max-width="300"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      :value="formattedEndDate"
                      label="End Date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="end_date"
                    required
                    @click="end_date_menu = false"
                  />
                </v-menu>
                <v-menu
                  v-model="end_time_menu"
                  :close-on-click="false"
                  max-width="300"
                  :close-on-content-click="false"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      :value="formattedEndTime"
                      label="End Time"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-time-picker
                    v-model="end_time"
                    @click:minute="end_time_menu = false"
                    @update:period="end_time_menu = false"
                  />
                </v-menu>
              </v-col>
            </v-row>
            <v-divider class="my-2" />
            <v-row>
              <v-col cols="6"> </v-col>
              <v-col cols="6"> </v-col>
            </v-row>
            <v-divider class="my-2" />
            <div class="d-flex justify-space-between my-2">
              <span class="text-h6">Quiz Sections</span>
            </div>
            <SectionForm
              v-for="(section, index) in sections"
              :key="section.number"
              v-model="sections[index]"
            />
            <v-btn text outlined @click="addSection"
              >Add Section <v-icon>mdi-plus</v-icon></v-btn
            >
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="blue darken-1"
          text
          :disabled="loading"
          :loading="loading"
          @click="addQuiz"
        >
          Save
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          :disabled="loading"
          @click="$router.back()"
          >Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
  import moment from 'moment'
  import { CREATE_QUIZ, OWNED_COURSES } from '~/utils/queries'
  import { required, numbers } from '~/utils/validators'
  import SectionForm from '~/components/SectionForm.vue'

  export default {
    components: { SectionForm },
    fetchOnServer: false,
    data() {
      return {
        valid: false,
        loading: false,
        ownedCoures: [],
        duration: 0,
        start_date_menu: false,
        start_date: '',
        start_time_menu: false,
        start_time: null,
        end_date_menu: false,
        end_date: '',
        end_time_menu: false,
        end_time: null,
        rules: {
          required,
          numbers,
        },
        title: '',
        description: '',
        maxScore: 0,
        sections: [{ number: 1 }],
      }
    },
    async fetch() {
      const userId = this.$store.getters['auth/id']
      const courses = await this.$axios.post('/graphql', {
        query: OWNED_COURSES,
        variables: {
          userId,
        },
      })
      this.ownedCoures = courses
    },
    computed: {
      formattedStartDate() {
        return this.start_date
          ? moment(this.start_date).format('dddd, MMMM Do YYYY')
          : ''
      },
      formattedStartTime() {
        return this.start_time
          ? moment(this.start_time, ['HH.mm']).format('h:mm A')
          : ''
      },
      formattedEndDate() {
        return this.end_date
          ? moment(this.end_date).format('dddd, MMMM Do YYYY')
          : ''
      },
      formattedEndTime() {
        return this.end_time
          ? moment(this.end_time, ['HH.mm']).format('h:mm A')
          : ''
      },
    },
    methods: {
      async addQuiz() {
        try {
          this.loading = true
          await this.$axios
            .post('/graphql', {
              query: CREATE_QUIZ,
              variables: {
                title: this.title,
                start: moment(
                  `${this.start_date} ${this.start_time}`
                ).toISOString(),
                end: moment(`${this.end_date} ${this.end_time}`).toISOString(),
                duration: this.duration * 60000,
                sections: this.sections,
                maxScore: parseInt(this.maxScore),
                courseId: this.$route.params.courseId,
              },
            })
            .then(({ data }) => {
              if (data.errors) {
                throw data.errors[0]
              }
              this.$toast.success('Quiz Created Successfully')
              this.$router.back()
            })
          // add quiz logic
        } catch (error) {
          if (error.isAxiosError && error.response) {
            this.$toast.error(error.response.data.errors[0].message)
          } else {
            this.$toast.error(error.message)
          }
        } finally {
          this.loading = false
        }
      },
      addSection() {
        this.sections.push({
          number: this.sections.at(-1).number + 1,
        })
      },
    },
  }
</script>