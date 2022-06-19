<template>
  <v-card>
    <v-card-title>Teachers</v-card-title>
    <v-card-text>
      <v-skeleton-loader
        v-if="$fetchState.pending"
        type="table"
      ></v-skeleton-loader>
      <v-data-table v-else :headers="headers" :items="teachers" sort-by="id">
        <template #top><AddTeacherDialog @complete="$fetch" /></template>
        <template #item.actions="{ item }">
          <EditAccountDialog :account="item" @update:account="$fetch"/>
          <DeleteAccountDialog :account="item" @update:account="$fetch"/>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
  import { ALL_TEACHERS } from '~/utils/queries'
  import AddTeacherDialog from '~/components/AddTeacherDialog.vue'
  export default {
    components: { AddTeacherDialog },
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
        teachers: [],
      }
    },
    async fetch() {
      try {
        const {
          data: {
            data: { users },
          },
        } = await this.$axios.post('/graphql', { query: ALL_TEACHERS })
        this.teachers.splice(0, this.teachers.length, ...users)
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
