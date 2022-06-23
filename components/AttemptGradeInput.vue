<template>
  <v-row>
    <v-col cols="6">
      <p>{{ questionText }}</p>
      <span class="font-weight-bold text-body-1">Answer</span>
      <template v-if="data.question.questionType === 'CLOZE'">
        <p
          v-for="subQuestion in sortedSubQuestions(data.question)"
          :key="subQuestion.id"
        >
          <span class="mr-2">{{ subQuestion.number }} : </span>
          <span class="font-weight-medium">{{ subQuestion.answer }}</span>
        </p>
      </template>
      <template v-else
        ><p class="font-weight-medium">{{ data.question.answer }}</p></template
      >
    </v-col>
    <v-col cols="4" align-self="center">
      <p v-if="unattempted">
        <v-chip disabled label> Unattempted </v-chip>
      </p>
      <template v-else-if="data.question.questionType === 'CLOZE'">
        <p
          v-for="subQuestion in sortedSubQuestions(data.question)"
          :key="subQuestion.id"
        >
          <span class="mr-2">{{ subQuestion.number }} : </span>
          <span class="font-weight-medium">{{ subQuestion.answer }}</span>
        </p>
      </template>
      <p v-else>
        {{ data.answer.answer }}
      </p>
    </v-col>
    <v-col cols="2" align-self="center">
      <v-checkbox
        v-model="correctness"
        :disabled="unattempted"
        :indeterminate="unattempted"
        :label="correctness ? 'Correct' : 'Incorrect'"
        @change="$emit('update:grade', correctness)"
      ></v-checkbox>
    </v-col>
    <v-divider class="mx-4 my-2" />
  </v-row>
</template>

<script>
  export default {
    model: {
      prop: 'grade',
      event: 'update:grade',
    },
    props: {
      data: {
        type: Object,
        required: true,
      },
      grade: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        correctness: false,
      }
    },
    computed: {
      unattempted() {
        return !this.data.answer
      },
      questionText() {
        if (this.data.question.questionType === 'CLOZE') {
          return this.data.question.text.replace(/\*.\*/, '__________')
        }
        return this.data.question.text
      },
    },
    methods: {
      sortedSubQuestions(question) {
        return question.subQuestions.slice().sort((o, p) => o.number - p.number)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .span {
    display: inline-block;
    width: 50px;
    background: #333;
  }
</style>