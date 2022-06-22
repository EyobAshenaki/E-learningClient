<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <h1>Assignments</h1>
        <v-spacer />
        <v-btn class="primary" nuxt :to="`${$route.path}/create`"
          ><v-icon>mdi-plus</v-icon>Create</v-btn
        >
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-subheader v-if="!assignments.length"
          >This Course has no assignments created yet. Click on (
          <pre color="primary" class="white--text primary" @click="gotoCreateAssignment()">
Create Assignment</pre
          >
          ) to create a new assignment for this course.</v-subheader
        >
        <assignment-definition-card
          v-for="assignment in assignments"
          :key="assignment.id"
          :assignment="assignment"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    props: {
      courseId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        assignments: [],
      }
    },
    fetchOnServer: false,
    async fetch() {
      await this.$store.dispatch(
        'course-management/fetchAssignments',
        this.courseId
      )
      const assignments =
        this.$store.getters['course-management/getAssignmentDefinitions']
      this.assignments = assignments
    },
    methods: {
      gotoCreateAssignment() {
        this.$router.push(`${this.$route.path}/create`)
      },
    },
  }
</script>

<style lang="scss" scoped></style>
