<template>
  <v-row>
    <v-col cols="7" class="mr-15">
      <v-row>
        <v-col cols="12" class="pb-0">
          <v-breadcrumbs :items="breadcrumbs" large>
            <template #divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-col>

        <v-col cols="12" class="py-0">
          <v-banner single-line>
            <v-btn
              class="ml-0 py-3"
              depressed
              :ripple="false"
              @click="trySth"
              >{{ currentQuestionIdx }}</v-btn
            >
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

        <v-col cols="12" class="pt-0">
          <v-card max-height="650">
            <v-card-title class="font-weight-bold px-6 pt-7">{{
              question.question
            }}</v-card-title>

            <v-list class="px-5 choice-list" rounded>
              <v-list-item-group
                v-model="selectedChoice"
                color="success"
                class="overflow-y-scroll"
              >
                <v-list-item
                  :ripple="false"
                  active-class="question-choice-active"
                  class="question-choice my-4"
                >
                  <v-list-item-icon class="d-flex justify-end mr-4">
                    <v-icon class="text-h6">{{ intToChar(0) }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="question.correct_answer"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item
                  v-for="(choice, i) in question.incorrect_answers"
                  :key="i"
                  :ripple="false"
                  active-class="question-choice-active"
                  class="question-choice my-4"
                >
                  <v-list-item-icon class="d-flex justify-end mr-4">
                    <v-icon class="text-h6">{{ intToChar(i + 1) }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="choice"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>

            <v-spacer></v-spacer>

            <v-card-actions class="pa-5 pb-8 d-flex justify-space-between">
              <v-btn class="pa-6 pr-13 pl-11 ml-5" rounded outlined>
                <v-icon left>mdi-arrow-left</v-icon>
                Previous
              </v-btn>
              <v-btn class="pa-6 pr-11 pl-13 mr-5" rounded outlined>
                Next
                <v-icon right @click="nextQuestion">mdi-arrow-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <!-- The Left card   -->
    <v-col cols="4" class="mt-3">
      <v-card>
        <v-card-title>Quiz-1</v-card-title>
        <v-card-subtitle class="pb-0">Database Design</v-card-subtitle>
        <v-card-text class="px-0">
          <v-row class="pa-4">
            <v-col cols="5">
              <div class="text-h6">01:12:00</div>
              <div>Time remaining</div>
            </v-col>
            <v-divider class="ma-3" vertical></v-divider>
            <v-col cols="5">
              <div class="text-h6">15%</div>
              <div>Completed</div>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-list rounded class="px-4">
            <span class="text-body-1">Test summary</span>
            <v-list-item-group color="success">
              <v-list-item v-for="(item, i) in summary" :key="i" class="ma-0">
                <v-list-item-icon>
                  <v-icon size="20">{{ `mdi-${item.icon}` }}</v-icon>
                </v-list-item-icon>
                <v-list-item-subtitle class="text-body-1 ml-n5">{{
                  item.text
                }}</v-list-item-subtitle>
                <v-list-item-title class="text-right">{{
                  item.value
                }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>

          <v-divider class="mx-4"></v-divider>

          <v-row class="pa-4">
            <v-col cols="9">
              <span class="text-body-1 font-weight-regular">Question list</span>
            </v-col>
            <v-col cols="3">
              <v-icon>mdi-menu</v-icon>
              <v-icon>mdi-filter</v-icon>
            </v-col>
          </v-row>

          <v-item-group mandatory class="question-list">
            <v-subheader class="font-wight-light">Multiple choice</v-subheader>
            <v-row class="px-7">
              <v-col v-for="n in 20" :key="n" cols="2" class="pa-1">
                <v-item v-slot="{ active, toggle }">
                  <v-card
                    :color="active ? 'secondary' : ''"
                    class="mr-0 text-h6 d-flex justify-center align-center"
                    outlined
                    height="45"
                    width="45"
                    style="border-radius: 10px"
                    @click="toggle"
                  >
                    {{ n }}
                  </v-card>
                </v-item>
              </v-col>
            </v-row>

            <v-subheader class="font-wight-light mt-3"
              >Short Answer</v-subheader
            >
            <v-row class="px-7">
              <v-col v-for="n in 20" :key="n" cols="2" class="pa-1">
                <v-item v-slot="{ active, toggle }">
                  <v-card
                    :color="active ? 'secondary' : ''"
                    class="mr-0 text-h6 d-flex justify-center align-center"
                    outlined
                    height="45"
                    width="45"
                    style="border-radius: 10px"
                    @click="toggle"
                  >
                    {{ n }}
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-item-group>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'student',

  data() {
    return {
      breadcrumbs: [
        {
          text: 'Quiz',
          disabled: false,
          href: 'quiz',
        },
        {
          text: 'Quiz Page',
          disabled: false,
          href: 'quiz_page',
        },
      ],
      reverseLater: false,
      currentQuestionIdx: 1,
      selectedChoice: null,
      question: {
        question: 'What is the capital city of Ethiopia?',
        incorrect_answers: ['Adwa', 'Dredawa', 'Hawasa'],
        correct_answer: 'Addis Ababa',
      },
      summary: [
        {
          icon: 'circle',
          text: 'Attempted',
          value: '23',
        },
        {
          icon: 'star',
          text: 'Revise later',
          value: '20',
        },
        {
          icon: 'diamond',
          text: 'Skipped',
          value: '0',
        },
        {
          icon: 'triangle',
          text: 'Not attempted',
          value: '27',
        },
      ],
    }
  },
  computed: {
    bookmarkIcon() {
      return this.reverseLater ? 'mdi-bookmark' : 'mdi-bookmark-outline'
    },
  },
  watch: {
    reverseLater(val) {
      console.log(this.question)
    },
  },
  methods: {
    trySth() {
      this.$axios
        .get('https://opentdb.com/api.php?amount=10', {
          params: {
            category: '27',
            difficulty: 'medium',
            type: 'multiple',
          },
        })
        .then((result) => {
          //   console.log(result.data.results)
          this.questions = [...result.data.results]
        })
        .catch((err) => {
          console.warn(err)
        })
    },

    intToChar(val) {
      return String.fromCharCode(65 + val)
    },

    nextQuestion() {
      this.currentQuestionIdx++
      this.question = {
        question: 'What is the capital city of Egypt?',
        incorrect_answers: ['Abu Dabi', 'Addis Abeba', 'Cape town'],
        correct_answer: 'Cairo',
      }
      console.log(this.question)
    },
  },
}
</script>

<style scoped>
/* * {
  border: 1px dashed rgb(73 73 73);
} */
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
