<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" icon v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Edit Account</v-card-title>
      <v-card-text>
        <account-form ref="accountForm" :account="account" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" outlined :loading="loading" :disabled="loading" @click="updateAccount">Save</v-btn>
        <v-spacer />
        <v-btn text :disabled="loading" @click.stop="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import AccountForm from './AccountForm.vue'
  import { UPDATE_USER } from '~/utils/queries'

  export default {
    components: { AccountForm },
    props: {
      account: {
        type: Object,
        default: () => ({
          id: '',
          email: '',
          firstName: '',
          lastName: '',
          middleName: '',
          roles: [],
        }),
      },
    },
    data() {
      return {
        loading: false,
        dialog: false,
      }
    },
    methods: {
      async updateAccount() {
        const account = this.$refs.accountForm.submit()
        if (account !== undefined) {
          try {
            const { email, firstName, middleName, lastName } = account
            this.loading = true
            await this.$axios
              .post('/graphql', {
                query: UPDATE_USER,
                variables: {
                  id: this.account.id,
                  email,
                  firstName,
                  middleName,
                  lastName,
                },
              })
              .then(({ data }) => {
                if (data.errors) {
                  throw data.errors
                }
              })
            this.$emit('update:account')
            this.$toast.success('Account updated successfully')
          } catch (error) {
            if (error.isAxiosError && error.response) {
              this.$toast.error(error.response.data.errors[0].message)
            } else {
              this.$toast.error(error)
            }
          } finally {
            this.loading = false
            this.dialog = false
          }
        }
      },
    },
  }
</script>
