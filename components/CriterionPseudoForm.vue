<template>
  <v-card flat outlined class="pa-3 mb-3">
    <v-row>
      <v-card-title class="text-body-1 my-n3"
        >Criterion (#{{ number }})</v-card-title
      >
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('remove-criterion')"><v-icon>mdi-close</v-icon></v-btn>
    </v-row>
    <v-row>
      <v-divider></v-divider>
    </v-row>
    <v-text-field
      id="title"
      v-model="title"
      class="mt-3"
      name="title"
      label="Title"
      :rules="[required]"
      @change="updateCriterion"
      @keyup.enter="$event.target.nextElementSibling.focus()"
    ></v-text-field>
    <v-text-field
      id="weight"
      v-model="weight"
      class="mt-n1"
      name="weight"
      label="Weight"
      :rules="[required, numbers, isInRange(weight, 1, 10)]"
      @change="updateCriterion"
      @keyup.enter="$event.target.nextElementSibling.focus()"
    ></v-text-field>
  </v-card>
</template>

<script>
  import { required, numbers, isInRange } from '~/utils/validators'
  export default {
    model: {
      prop: 'criterionInput',
      event: 'update:criterion',
    },
    props: {
      criterionInput: {
        type: Object,
        default: () => ({ number: 1 }),
      },
    },
    data() {
      return {
        number: this.criterionInput.number,
        title: null,
        weight: null,
      }
    },
    methods: {
      required,
      numbers,
      isInRange,
      updateCriterion() {
        this.$emit('update:criterion', {
          number: this.number,
          title: this.title,
          weight: this.weight,
        })
      },
    },
  }
</script>

<style lang="scss" scoped></style>
