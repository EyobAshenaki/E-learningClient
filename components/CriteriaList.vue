<template>
  <v-card outlined>
    <v-container>
      <v-row>
        <v-col>
          <h1>Criteria List</h1>
        </v-col>
        <v-col v-if="isOnEvaluation" class="d-flex justify-end"
          ><v-btn
            outlined
            color="success"
            text
            :disabled="finishBtn"
            @click="finishEvaluation"
          >
            Finish</v-btn
          ></v-col
        >
      </v-row>
    </v-container>
    <criterion-card
      v-for="criterion in criteria"
      :key="criterion.id"
      v-slot="slotProps"
      class="ma-1"
      :criterion="criterion"
      :is-on-evaluation="isOnEvaluation"
    >
      <slot
        :is-on-evaluation="slotProps.isOnEvaluation"
        :criterion="criterion"
      ></slot>
    </criterion-card>
  </v-card>
</template>

<script>
  import { uniqBy } from 'lodash'
  export default {
    props: {
      criteria: {
        type: Array,
        required: true,
      },
      isOnEvaluation: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        finishBtn: false,
      }
    },
    methods: {
      finishEvaluation() {
        const finalValues = []
        const values =
          this.$store.getters['course-management/getCriteriaValues']
        const criteria = this.$store.getters['course-management/getCriteria']
        if (!values?.length && !criteria?.length) this.finishBtn = true
        else if (values?.length && criteria?.length) {
          values?.forEach((v) => {
            criteria?.forEach((c) => {
              if (c.id === v.criterionId) finalValues.push(v)
            })
          })
          this.$store.dispatch(
            'course-management/evaluateCriteriaBasedAssignment',
            { values: uniqBy(finalValues) }
          )
        }
        this.finishBtn = true
        this.$router.push({
          name: 'courseOwner-courseId-assignments-definitionId-submissions',
        })
      },
    },
  }
</script>

<style lang="scss" scoped></style>
