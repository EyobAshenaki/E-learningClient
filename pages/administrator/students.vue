<template>
  <v-card flat class="mt-4">
    <v-card-title>Students</v-card-title>
    <v-card-text>
      <v-skeleton-loader
        v-if="$fetchState.pending"
        type="table"
      ></v-skeleton-loader>
      <v-data-table v-else :headers="headers" :items="students" sort-by="id">
        <template #top><AddStudentDialog @complete="$fetch" /></template>
        <template #item.actions="{ item }">
          <EditAccountDialog :account="item" @update:account="$fetch"/>
          <DeleteAccountDialog :account="item" @update:account="$fetch" />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
  import { ALL_STUDENTS } from '~/utils/queries'
  export default {
    layout: 'admin',
    fetchOnServer: false,
    data() {
      return {
        loading: false,
        headers: [
          { text: 'First Name', value: 'firstName' },
          { text: 'Middle Name', value: 'middleName' },
          { text: 'Last Name', value: 'lastName' },
          { text: 'E-mail', value: 'email' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        students: [],
      }
    },
    async fetch() {
      try {
        const {
          data: {
            data: { users },
          },
        } = await this.$axios.post('/graphql', { query: ALL_STUDENTS })
        this.students.splice(0, this.students.length, ...users)
      } catch (error) {
        if (error.isAxiosError && error.response) {
          this.$toast.error(error.response.data.errors[0])
        } else {
          this.$toast.error(error.message)
        }
      }
    },
    mounted() {
      this.$nuxt.$on('save', () => {
        this.$nuxt.refresh()
      })
    },
  }
</script>