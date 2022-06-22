<template>
  <v-card flat outlined>
      <v-container>
        <v-row class="pa-0 ma-n3">
          <v-col class="pa-n2">
            <h5 class="ma-n2">{{ criterion.title }}</h5>
          </v-col>
          <v-col class="pa-n2">
            <h5 class="ma-n2">Weight:&nbsp; {{ criterion.weight }}</h5>
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
    },
  }
</script>

<style lang="scss" scoped></style>
