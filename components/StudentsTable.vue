<template>
  <v-data-table :headers="headers" :items="students" class="elevation-0 pa-3">
    <template #item.fullName="{ item }">
      {{ fullName(item) }}
    </template>
    <template #item.actions="{ item }">
      <!-- Assign Course to Student Dialog -->
      <assign-course-to-student-dialog
        :student="item"
        :courses="courses"
        @updateComponent="updateComponent"
      />

      <!-- Remove Course from Student Dialog -->
      <remove-course-from-student-dialog
        :student="item"
        @updateComponent="updateComponent"
      />
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    students: {
      type: Array,
      required: true,
    },
    courses: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      headers: [
        {
          text: 'Full Name',
          align: 'start',
          value: 'fullName',
        },
        { text: 'Email', value: 'email' },
        { text: 'Section', value: 'attendingClass.section' },
        { text: 'Year', value: 'attendingClass.year' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },

  methods: {
    updateComponent() {
      this.$emit('updateComponent')
    },

    fullName(item) {
      return (
        `${item.firstName.substr(0, 1).toUpperCase()}${item.firstName
          .substr(1)
          .toLowerCase()}` +
        ` ${item.middleName.substr(0, 1).toUpperCase()}${item.middleName
          .substr(1)
          .toLowerCase()}` +
        ` ${item.lastName.substr(0, 1).toUpperCase()}${item.lastName
          .substr(1)
          .toLowerCase()}`
      )
    },
  },
}
</script>
