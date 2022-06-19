<template>
  <v-card>
    <v-card-title>
      <span class="text-body-1">Add User</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <account-form ref="accountForm" />
        <RoleSelectSingle v-model="role" required/>
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
  import RoleSelectSingle from './RoleSelectSingle.vue'
  import { CREATE_USER } from '~/utils/queries'
  export default {
    components: { RoleSelectSingle },
    data() {
      return {
        loading: false,
        role: '',
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
                roleName: this.role,
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