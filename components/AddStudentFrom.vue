<template>
  <v-card>
    <v-card-title>
      <span class="text-body-1">Add Student</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <account-form ref="accountForm" />
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="blue darken-1"
        text
        :disabled="loading"
        :loading="loading"
        @click="addAccount"
      >
        Save
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        :disabled="loading"
        @click="$emit('close')"
        >Cancel
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  import { CREATE_USER } from '~/utils/queries'
  export default {
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      async addAccount() {
        const account = this.$refs.accountForm.submit()
        if (account !== undefined) {
          this.loading = true
          try {
            const { data } = await this.$axios.post('/graphql', {
              query: CREATE_USER,
              variables: {
                ...account,
                roleName: 'STUDENT',
              },
            })
            if (data.errors) {
              this.$toast.error(data.errors[0].message)
            } else {
              this.$emit('save')
            }
          } catch (error) {
            if (error.isAxiosError && error.response) {
              this.$toast.error(error.response.data.errors[0].message)
            } else {
              this.$toast.error(error.message)
            }
          } finally {
            this.loading = false
          }
        } else {
          this.$toast.warn('Please fill all required fields')
        }
      },
    },
  }
</script>