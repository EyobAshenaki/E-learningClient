<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" icon v-on="on">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card v-if="dialog">
      <v-card-title>Delete Account</v-card-title>
      <v-card-text>
        <p>Are you sure you want to delete this account?</p>
        <p>
          Account name: {{fullName}}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" :disabled="loading" :loading="loading" outlined @click="deleteAccount">Delete</v-btn>
        <v-spacer />
        <v-btn text :loading="loading" @click.stop="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { REMOVE_USER } from '~/utils/queries'
  export default {
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
    computed: {
      fullName() {
        return [
          this.account.firstName,
          this.account.middleName,
          this.account.lastName,
        ].join(' ')
      },
    },
    methods: {
      async deleteAccount() {
        this.loading = true
        try {
          await this.$axios
            .post('/graphql', {
              query: REMOVE_USER,
              variables: {
                userId: this.account.id,
              },
            })
            .then(({ data }) => {
              if (data.errors) {
                throw data.errors
              } else if (data.data) {
                return data.data
              }
            })
          this.$toast.success('Account deleted successfully')
          this.$emit('update:account')
        } catch (error) {
          if (error?.isAxiosError && error.response) {
            this.$toast.error(error.response.errors)
          } else {
            this.$toast.error(error.message)
          }
        } finally {
          this.loading = false
          this.dialog = false
        }
      },
    },
  }
</script>
