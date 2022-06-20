<template>
  <v-card flat outlined class="mb-2">
    <v-card-title class="text-body-1">Section {{ number }}</v-card-title>
    <v-divider class="my-2 mx-4" />
    <v-card-text>
      <v-form v-model="valid">
        <v-text-field
          v-model="description"
          label="Section Description"
          :rules="[rules.required]"
          @change="updateSection"
          @keyup.enter="$event.target.nextElementSibling.focus()"
        />
        <v-select
          v-model="type"
          :items="sectionTypes"
          item-text="text"
          item-value="value"
          label="Section Type"
          :rules="[rules.required]"
          @change="updateSection"
        ></v-select>
      </v-form>
      <template v-if="type.length">
        <v-divider class="my-2" />
        <div class="d-flex justify-space-between my-2">
          <span class="text-body-1">Questions</span>
          <v-btn text outlined @click="addQuestion"
            >Add Question
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
        <QuestionForm
          v-for="(question, index) in questions"
          :key="question.number"
          v-model="questions[index]"
          :section-type="type"
          @update:question="updateSection"
        />
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
  import QuestionForm from './QuestionForm.vue'
  import { required } from '~/utils/validators'
  export default {
    components: { QuestionForm },
    model: {
      prop: 'sectionInput',
      event: 'update:section',
    },
    props: {
      sectionInput: {
        type: Object,
        default: () => ({
          number: 1,
        }),
      },
    },
    data() {
      return {
        number: this.sectionInput.number,
        description: '',
        type: '',
        sectionTypes: [
          { text: 'Objective Section', value: 'OBJECTIVE' },
          { text: 'Subjective Section', value: 'SUBJECTIVE' },
        ],
        questions: [],
        valid: false,
        rules: {
          required,
        },
      }
    },
    watch: {
      type(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.questions.splice(0, this.questions.length, { number: 1 })
        }
      },
    },
    methods: {
      updateSection() {
        this.$emit('update:section', {
          number: this.number,
          description: this.description,
          type: this.type,
          questions: this.questions,
        })
      },
      addQuestion() {
        this.questions.push({ number: this.questions.at(-1).number + 1 })
      },
    },
  }
</script>