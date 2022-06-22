<template>
  <v-card outlined>
    <v-container>
      <v-row>
        <v-col>
          <h1>Criteria List</h1>
        </v-col>
      </v-row>
    </v-container>
    <criterion-card
      v-for="criterion in criteria"
      :key="criterion.id"
      class="ma-1"
      :criterion="criterion"
    />
  </v-card>
</template>

<script>
  export default {
    props: {
      criteria: {
        type: Array,
        required: true,
      },
    },
  }
</script>

<style lang="scss" scoped></style>
