<template>
  <v-card flat outlined min-width="1000px">
    <v-container>
      <v-row class="pa-0 ma-n3">
        <v-col
          :class="isOnEvaluation ? 'pl-2 pr-n3 pb-0' : 'pa-n2'"
          :cols="isOnEvaluation ? 2 : undefined"
        >
          <h5 :class="isOnEvaluation ? 'my-auto mt-3 text-wrap-word' : 'ma-n2'">
            {{ criterion.title }}
          </h5>
        </v-col>
        <v-col
          :class="isOnEvaluation ? 'pl-2 pb-0 pr-0 mr-0' : 'pa-n2'"
          :cols="isOnEvaluation ? 1.1 : undefined"
        >
          <h5 :class="isOnEvaluation ? 'my-auto mt-3' : 'ma-n2'">
            Weight:&nbsp; {{ criterion.weight }}
          </h5>
        </v-col>
        <v-col v-if="isOnEvaluation" class="mt-2 ml-2 pb-0" cols="8">
          <slot :criterion="criterion"></slot>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    props: {
      criterion: {
        type: Object,
        required: true,
      },
      isOnEvaluation: {
        type: Boolean,
        default: false,
      },
    },
    created() {
      if (this.isOnEvaluation)
        this.$store.commit('course-management/pushCriterion', this.criterion)
    },
  }
</script>

<style lang="scss" scoped>
  .text-wrap-word {
    word-break: break-word;
  }
</style>
