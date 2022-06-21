<template>
  <v-row>
    <v-col cols="7" class="mr-15">
      <v-row v-if="question">
        <v-col cols="12" class="py-0">
          <v-banner single-line>
            <v-btn class="text-h5">
              {{ question.number }}
            </v-btn>
            <template #actions>
              <v-checkbox
                v-model="reverseLater"
                class="mb-0"
                :ripple="false"
                label="Revise later"
              ></v-checkbox>

              <v-icon size="32">{{ bookmarkIcon }}</v-icon>
            </template>
          </v-banner>
        </v-col>

        <!-- Question Body Section -->
        <v-col cols="12" class="pt-0">
          <v-card max-height="">
            <v-card-title class="font-weight-bold px-6 pt-7">{{
              question.text
            }}</v-card-title>

            <!-- CLOZE -->
            <template v-if="question.questionType === 'CLOZE'">
              <v-row align="center" class="pt-5 mb-5">
                <v-col cols="2" class="pa-0 ml-6 d-flex justify-center">
                  <span class="text-h6">Answer:</span>
                </v-col>
                <v-col cols="4" class="pa-0">
                  <v-text-field v-model="answer"></v-text-field>
                </v-col>
              </v-row>
            </template>

            <!-- TRUE_FALSE -->
            <template v-else-if="question.questionType === 'TRUE_FALSE'">
              <v-list class="px-5 choice-list" rounded>
                <v-list-item-group
                  v-model="selectedChoice"
                  color="success"
                  class="overflow-y-scroll"
                >
                  <v-list-item
                    v-for="(choice, i) in trueFalseChocie"
                    :key="i"
                    :ripple="false"
                    active-class="question-choice-active"
                    class="question-choice my-4"
                  >
                    <v-list-item-content>
                      <v-list-item-title v-text="choice"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </template>

            <!-- MULTIPLE_CHOICE -->
            <template v-else-if="question.questionType === 'MULTIPLE_CHOICE'">
              <v-list class="px-5 choice-list" rounded>
                <v-list-item-group
                  v-model="selectedChoice"
                  color="success"
                  class="overflow-y-scroll"
                >
                  <v-list-item
                    v-for="choice in sortedChoices(question.choices)"
                    :key="choice.key"
                    :ripple="false"
                    active-class="question-choice-active"
                    class="question-choice my-4"
                  >
                    <v-list-item-icon class="d-flex justify-end mr-4">
                      <v-icon class="text-h6">{{ choice.key }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="choice.text"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </template>

            <!-- ESSAY -->
            <template v-else-if="question.questionType === 'ESSAY'">
              <v-row class="pa-0 mx-4">
                <v-col class="text-h6 pb-0" cols="12">
                  <span class="text-h6">Answer:</span>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="answer"
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                  ></v-textarea>
                </v-col>
              </v-row>
            </template>

            <v-spacer></v-spacer>

            <!-- Question Footer Section -->
            <v-card-actions class="d-flex justify-space-between pb-5">
              <v-btn
                class="pa-6 pr-11 pl-13 ml-5"
                color="primary"
                rounded
                outlined
                @click="questionDone"
              >
                Submit
              </v-btn>

              <v-btn
                class="pa-6 pr-5 pl-13 mr-5"
                color="error"
                active-class="error"
                rounded
                outlined
                @click="skipQuestion"
              >
                {{ isQuizFinised ? 'Finish' : 'Skip' }}
                <v-icon class="mr-6" right> mdi-arrow-right </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <v-dialog v-model="finishQuizDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >Are you sure you are finised with the Quiz</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeFinishQuiz">No</v-btn>
          <v-btn color="blue darken-1" text @click="confirmFinishQuiz"
            >Yes</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- The Left card   -->
    <v-col v-if="quiz" cols="4" class="mt-3">
      <v-card>
        <v-card-title>
          {{ quiz.title }}
        </v-card-title>
        <v-card-subtitle class="pb-0">
          {{ quiz.description }}
        </v-card-subtitle>
        <v-card-text class="px-0">
          <!-- Card Head Section -->
          <v-row class="pa-4">
            <v-col cols="5">
              <div class="text-h5 font-weight-medium">
                {{ `${examHours} : ${examMinutes} : ${examSeconds}` }}
              </div>
              <div>Time remaining</div>
            </v-col>
            <v-divider class="ma-3" vertical></v-divider>
            <v-col cols="5">
              <div class="text-h5 font-weight-medium">
                {{ completedPercentage }}%
              </div>
              <div>Completed</div>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <!-- Test Summary Section -->
          <v-list rounded class="px-4">
            <span class="text-body-1">Test summary</span>
            <v-list-item-group>
              <v-list-item
                v-for="(item, i) in summary"
                :key="i"
                :ripple="false"
                :inactive="true"
                class="ma-0 pl-0"
              >
                <v-list-item-icon>
                  <v-icon size="20" :color="`${item.color} lighten-2`">{{
                    `mdi-${item.icon}`
                  }}</v-icon>
                </v-list-item-icon>
                <v-list-item-subtitle class="text-body-1 ml-n5">{{
                  item.text
                }}</v-list-item-subtitle>
                <v-list-item-title class="text-right">{{
                  item.values.length
                }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>

          <v-divider class="mx-4"></v-divider>

          <!-- Question List Section -->
          <v-row class="pa-4">
            <v-col cols="10">
              <span class="text-body-1 font-weight-regular">Question list</span>
            </v-col>
            <v-col cols="2">
              <v-icon>mdi-filter</v-icon>
            </v-col>
          </v-row>

          <v-item-group mandatory class="question-list">
            <div v-for="(section, idx) in sections" :key="idx">
              <v-subheader class="font-wight-light mb-1">
                {{ section[0].questionType }}
              </v-subheader>
              <v-row class="px-7 mb-3">
                <v-col
                  v-for="(qtn, indx) in sortedSection(section)"
                  :key="indx"
                  cols="2"
                  class="pa-1"
                >
                  <v-item v-slot="{ active, toggle }">
                    <v-card
                      :color="active ? 'secondary' : `${qtn.color} lighten-4`"
                      class="mr-0 text-h6 d-flex justify-center align-center"
                      outlined
                      height="45"
                      width="45"
                      :style="`border-radius: 10px; border-width: 0.1em; border-color: ${questionBorderColor}${qtn.bgColor} !important`"
                      @click="getQuestion(qtn, toggle)"
                    >
                      {{ qtn.number }}
                    </v-card>
                  </v-item>
                </v-col>
              </v-row>
            </div>
          </v-item-group>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import _ from 'lodash'
  export default {
    layout: 'student',

    data() {
      return {
        quiz: null,
        sections: null,
        reverseLater: false,
        selectedChoice: null,
        question: null,
        answer: null,
        trueFalseChocie: ['TRUE', 'FALSE'],
        quizAttempt: null,
        examHours: 0,
        examMinutes: 0,
        examSeconds: 0,
        isQuizFinised: false,
        finishQuizDialog: false,
        summary: [
          {
            icon: 'circle',
            text: 'Attempted',
            color: 'success',
            bgColor: '#56D201',
            values: [],
          },
          {
            icon: 'pentagon',
            text: 'Revise later',
            color: 'secondary',
            bgColor: '#D27D01',
            values: [],
          },
          {
            icon: 'diamond',
            text: 'Skipped',
            color: 'error',
            bgColor: '#D20156',
            values: [],
          },
          {
            icon: 'triangle',
            text: 'Not attempted',
            color: 'primary',
            bgColor: '#0156D2',
            values: [],
          },
        ],
      }
    },

    computed: {
      bookmarkIcon() {
        return this.reverseLater ? 'mdi-bookmark' : 'mdi-bookmark-outline'
      },
      completedPercentage() {
        return Math.round(
          (this.summary[0].values?.length /
            (this.summary[3].values?.length + this.summary[0].values?.length)) *
            100
        )
      },
      questionBorderColor() {
        for (const key in this.sections) {
          if (Object.hasOwnProperty.call(this.sections, key)) {
            const questions = this.sections[key]
            for (const question of questions) {
              if (this.summary[3].values.includes(question.id)) {
                question.color = this.summary[3].color
                question.bgColor = this.summary[3].bgColor
              }
              if (this.summary[1].values.includes(question.id)) {
                question.color = this.summary[1].color
                question.bgColor = this.summary[1].bgColor
              }
              if (this.summary[2].values.includes(question.id)) {
                question.color = this.summary[2].color
                question.bgColor = this.summary[2].bgColor
              }
              if (this.summary[0].values.includes(question.id)) {
                question.color = this.summary[0].color
                question.bgColor = this.summary[0].bgColor
              }
            }
          }
        }

        return ''
      },
    },

    watch: {
      reverseLater(val) {
        if (val) {
          if (!this.summary[1].values.includes(this.question.id))
            if (val) this.summary[1].values.push(this.question.id)
        }

        if (!val) {
          if (this.summary[1].values.includes(this.question.id))
            this.summary[1].values = this.summary[1].values.filter(
              (value) => value !== this.question.id
            )
        }
      },
    },

    created() {
      this.initialize()
      this.initializeQuizAttempt()
    },

    mounted() {
      this.timer()
    },

    methods: {
      async initialize() {
        const query = `query quiz($id: ID!) {
                          quiz(id: $id) {
                            id
                            title
                            description
                            start
                            end
                            duration
                            maxScore
                            sections {
                              id
                              description
                              sectionType
                              number
                              questions {
                                id
                                text
                                number
                                questionType
                                choices {
                                  key
                                  text
                                }
                              }
                            }
                          }
                        }`

        const variables = {
          id: this.$nuxt.context.params.quizId,
        }

        const quizResponse = await this.$axios.post('/graphql', {
          query,
          variables,
        })

        this.quiz = quizResponse.data.data.quiz
        this.organizeQuestions()
      },

      async initializeQuizAttempt() {
        const query = `mutation createQuizAttempt($userId: ID!, $quizId: ID!) {
                          createQuizAttempt(input: { userId: $userId, quizId: $quizId }) {
                            id
                            user {
                              id
                              firstName
                              email
                            }
                            quiz {
                              id
                              title
                            }
                            questions {
                              id
                              question {
                                number
                                text
                                questionType
                              }
                              answer
                              subQuestions {
                                number
                                answer
                              }
                            }
                            completed
                          }
                        }`

        const variables = {
          userId: this.$nuxt.context.params.id,
          quizId: this.$nuxt.context.params.quizId,
        }

        const createQuizAttemptResponse = await this.$axios.post('/graphql', {
          query,
          variables,
        })

        if (createQuizAttemptResponse.data.errors) {
          createQuizAttemptResponse.data.errors.map((error) => {
            console.warn('Error', error.message)
            return ''
          })
        } else {
          this.quizAttempt =
            createQuizAttemptResponse.data.data.createQuizAttempt
          console.info('Success', this.quizAttempt)
        }
      },

      organizeQuestions() {
        this.sections = this.quiz.sections.reduce((questions, section) => {
          section.questions.map((question) => {
            if (!questions[question.questionType])
              questions[question.questionType] = []
            this.summary[3].values.push(question.id)
            return questions[question.questionType].push(question)
          })

          return questions
        }, {})
      },

      getQuestion(question, toggle) {
        this.answer = null
        this.selectedChoice = null
        toggle()

        this.question = question
        this.question.text = this.question.text.replace('*', '_______________')

        if (!this.question?.visited) {
          this.reverseLater = false
          this.question.visited = true
          return null
        }

        if (!this.summary[1].values.includes(this.question.id))
          this.reverseLater = false
        else this.reverseLater = true
      },

      skipQuestion() {
        if (!this.summary[2].values.includes(this.question.id))
          this.summary[2].values.push(this.question.id)

        if (this.isQuizFinised) this.finishQuizDialog = true
      },

      sortedChoices(choices) {
        return _.orderBy(choices, 'key')
      },

      sortedSection(section) {
        return _.orderBy(section, 'number')
      },

      timer() {
        const setTimer = setInterval(() => {
          this.examHours = Math.floor(
            (this.quiz?.duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          )
          this.examMinutes = Math.floor(
            (this.quiz?.duration % (1000 * 60 * 60)) / (1000 * 60)
          )
          this.examSeconds = Math.floor(
            (this.quiz?.duration % (1000 * 60)) / 1000
          )

          this.quiz.duration -= 1000

          if (this.quiz?.duration < 0) {
            clearInterval(setTimer)
            console.log('Times Up!')

            const completed = this.completeQuizAttempt(this.quizAttempt.id)
            if (completed) {
              console.log('Quiz Done!')
              this.$router.push({
                name: 'student-id-quizzes',
                params: { id: this.$nuxt.context.params.id },
              })
            }
          }
        }, 1000)
      },

      async questionDone() {
        let answer = null
        if (this.question.questionType === 'TRUE_FALSE')
          answer = !this.selectedChoice ? 'TRUE' : 'FALSE'
        else if (this.question.questionType === 'MULTIPLE_CHOICE') {
          if (this.selectedChoice === 0) answer = 'A'
          else if (this.selectedChoice === 1) answer = 'B'
          else if (this.selectedChoice === 2) answer = 'C'
          else if (this.selectedChoice === 3) answer = 'D'
        } else if (this.question.questionType === 'ESSAY') answer = this.answer

        const query = `mutation attemptQuestion(
                        $attemptId: ID!
                        $questionId: ID!
                        $questionType: QuestionType!
                        $answer: String
                        $subQuestions: [SubQuestionAttemptInput]
                      ) {
                        attemptQuestion(
                          input: {
                            attemptID: $attemptId
                            questionID: $questionId
                            questionType: $questionType
                            answer: $answer
                            subQuestions: $subQuestions
                          }
                        ) {
                          id
                        }
                      }`

        const variables = {
          attemptId: this.quizAttempt.id,
          questionId: this.question.id,
          questionType: this.question.questionType,
          answer: this.isQuestionCLOZEType(this.question) ? null : answer,
          subQuestions: this.isQuestionCLOZEType(this.question)
            ? [
                {
                  number: 1,
                  answer: this.answer,
                },
              ]
            : null,
        }

        const attemptQuestionResponse = await this.$axios.post('/graphql', {
          query,
          variables,
        })

        if (attemptQuestionResponse.data.data.attemptQuestion) {
          if (this.summary[2].values.includes(this.question.id)) {
            this.summary[2].values = this.summary[2].values.filter(
              (value) => value !== this.question.id
            )
          }

          this.summary[3].values = this.summary[3].values.filter(
            (value) => value !== this.question.id
          )

          if (!this.summary[0].values.includes(this.question.id)) {
            this.summary[0].values.push(this.question.id)
          }

          console.log('Question Attempted')

          console.log(this.summary[3].values.length)

          if (this.summary[3].values.length === 0) this.isQuizFinised = true
        }
      },

      isQuestionCLOZEType(question) {
        return question.questionType === 'CLOZE'
      },

      async completeQuizAttempt(attemptId) {
        const query = `mutation completeAttempt($attemptId: ID!) {
                        completeAttempt(attemptId: $attemptId) {
                          id
                          completed
                        }
                      }`

        const variables = {
          attemptId,
        }

        const completeAttemptResponse = await this.$axios.post('/graphql', {
          query,
          variables,
        })

        return completeAttemptResponse.data.data.completeAttempt.completed
      },

      closeFinishQuiz() {
        this.finishQuizDialog = false
      },

      confirmFinishQuiz() {
        this.finishQuizDialog = false

        const completed = this.completeQuizAttempt(this.quizAttempt.id)
        if (completed) {
          console.log('Quiz Done!')
          this.$router.push({
            name: 'student-id-quizzes',
            params: { id: this.$nuxt.context.params.id },
          })
        }
      },
    },
  }
</script>

<style scoped>
  .choice-list {
    height: 50vh;
  }

  .question-choice {
    border: 1px solid gray;
  }

  .question-choice-active {
    border: 1px solid #56d201;
  }

  .question-list {
    height: 30vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>
