<template>
  <v-card flat outlined class="mb-2">
    <v-card-title class="text-body-1">Question {{ number }}</v-card-title>
    <v-card-text>
      <v-form v-model="valid">
        <v-select
          v-model="type"
          :items="questionTypes"
          item-value="value"
          item-text="text"
          label="Question Type"
          @change="updateQuestion"
        />
        <v-text-field
          v-model="text"
          label="Question Prompt"
          :rules="[rules.required]"
          @change="updateQuestion"
        />
        <template v-if="type === 'MULTIPLE_CHOICE'">
          <p class="text-body-2">Choices</p>
          <v-row>
            <v-col cols="3">
              <v-text-field
                v-model="key"
                :rules="[rules.required, rules.singleCharacter]"
                label="Key"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="choiceText"
                :rules="[rules.required]"
                label="Text"
              />
            </v-col>
            <v-col cols="3">
              <v-btn text="" outlined="" @click="addChoice"
                >Add Choice <v-icon>mdi-plus</v-icon></v-btn
              >
            </v-col>
            <v-col cols="12">
              <div
                v-for="choice in choices"
                :key="choice.key"
                class="px-2 py-1"
              >
                {{ choice.key }}: {{ choice.text }}
              </div>
            </v-col>
          </v-row>
        </template>
        <v-select
          v-if="
            type === 'TRUE_FALSE' ||
            (type === 'MULTIPLE_CHOICE' && choices.length)
          "
          v-model="answer"
          :items="answerOptions"
          item-text="text"
          item-value="value"
          label="Answer"
          @change="updateQuestion"
        />
        <v-text-field
          v-if="type === 'ESSAY'"
          v-model="answer"
          label="Answer"
          :rules="[rules.required]"
          @change="updateQuestion"
        />
        <v-row v-if="type === 'CLOZE'">
          <v-col cols="9">
            <v-text-field
              v-model="subQuestionAnswer"
              :label="`Sub-Question ${currentSubQuestionNumber}, Answer`"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="3">
            <v-btn text="" outlined="" @click="addSubQuestion"
              >Add Sub-Question<v-icon>mdi-plus</v-icon></v-btn
            >
          </v-col>
          <v-col
            v-for="subQuestion in subQuestions"
            :key="subQuestion.number"
            cols="8"
          >
            <p>
              {{ subQuestion.number }} :
              <span style="background-color: #f4f4f4">{{
                subQuestion.answer
              }}</span>
            </p>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  import { required, singleCharacter } from '~/utils/validators'
  export default {
    model: {
      prop: 'questionInput',
      event: 'update:question',
    },
    props: {
      questionInput: {
        type: Object,
        default: () => ({
          number: 1,
        }),
      },
      sectionType: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        number: this.questionInput.number,
        text: '',
        answer: '',
        type: '',
        valid: false,
        key: '',
        choiceText: '',
        subQuestionAnswer: '',
        rules: {
          required,
          singleCharacter,
        },
        choices: [],
        subQuestions: [],
      }
    },
    computed: {
      questionTypes() {
        if (this.sectionType === 'OBJECTIVE') {
          return [
            {
              text: 'True False Question',
              value: 'TRUE_FALSE',
            },
            { text: 'Multiple Choice Question', value: 'MULTIPLE_CHOICE' },
          ]
        } else {
          return [
            { text: 'Fill in the Blanks Question', value: 'CLOZE' },
            { text: 'Short Essay Question', value: 'ESSAY' },
          ]
        }
      },
      answerOptions() {
        if (this.type === 'TRUE_FALSE') {
          return [
            { text: 'True', value: 'TRUE' },
            { text: 'False', value: 'FALSE' },
          ]
        } else if (this.type === 'MULTIPLE_CHOICE') {
          return this.choices.map((choice) => ({
            text: choice.text,
            value: choice.key,
          }))
        } else {
          return []
        }
      },
      currentSubQuestionNumber() {
        return this.subQuestions.length ? this.subQuestions.at(-1).number + 1 : 1
      },
    },
    watch: {
      type(value, oldValue) {
        if (value !== oldValue) {
          if (value === 'CLOZE') {
            this.subQuestions.splice(0, this.subQuestions.length)
          } else if (value === 'MULTIPLE_CHOICE') {
            this.choices.splice(0, this.choices.length)
          }
        }
      },
    },
    methods: {
      updateQuestion() {
        this.$emit('update:question', {
          text: this.text,
          number: this.number,
          type: this.type,
          choices: this.choices,
          subQuestions: this.subQuestions,
          answer: this.answer,
        })
      },
      addSubQuestion() {
        this.subQuestions.push({
          number: this.currentSubQuestionNumber,
          answer: this.subQuestionAnswer,
        })
        this.subQuestionAnswer = ''
        this.updateQuestion()
      },
      addChoice() {
        this.choices.push({ key: this.key, text: this.choiceText })
        this.key = this.choiceText = ''
        this.updateQuestion()
      },
    },
  }
</script>

