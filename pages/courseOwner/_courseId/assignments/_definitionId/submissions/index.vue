<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ definition.name }}</h3>
          <div>Maximum Score:&nbsp;{{ definition.maximumScore }}</div>
        </div>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-subheader v-if="!submissions.length" class=""
          >This assignment has no submissions made yet. Check again
          later.</v-subheader
        >
        <assignment-submission-card
          v-for="submission in submissions"
          :key="submission.id"
          :submission="submission"
          :definition="definition"
          class="mt-3"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        definition: null,
        submissions: null,
      }
    },
    fetchOnServer: false,
    fetch() {
      const definitions =
        this.$store.getters['course-management/getAssignmentDefinitions']
      let detachedDefinitionsCopy = JSON.parse(JSON.stringify(definitions))
      detachedDefinitionsCopy = new Array(...detachedDefinitionsCopy)
      const definitionArray = detachedDefinitionsCopy.filter(
        (v) => v.id === this.$route.params.definitionId
      )
      this.definition = definitionArray[0]
      this.submissions = this?.definition?.submissions
    },
  }
</script>

<style lang="scss" scoped></style>
