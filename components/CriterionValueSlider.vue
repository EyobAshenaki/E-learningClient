<template>
  <v-slider
    v-model="slider"
    min="0"
    max="6"
    dense
    ticks="always"
    tick-size="4"
    track-fill-color="green"
    :tick-labels="labels"
    @change="onChange"
  ></v-slider>
</template>

<script>
  export default {
    props: {
      criterion: {
        type: Object,
        default: () => {},
      },
      isOnEvaluation: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        slider: null,
        select: null,
        labels: [
          'Absent',
          'Very Poor',
          'Poor',
          'Fair',
          'Good',
          'Very Good',
          'Excellent',
        ],
        criterionValue: {
          criterionId: null,
        },
      }
    },
    methods: {
      onChange() {
        this.criterionValue = {
          criterionId: this.criterion.id,
          submissionId: this.$route.params.submissionId,
          score: this.slider,
        }
        this.$store.commit(
          'course-management/pushCriterionValue',
          this.criterionValue
        )
      },
    },
  }
</script>

<style lang="scss" scoped></style>
