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
        <v-btn color="primary" outlined @click="updateAccount">Save</v-btn>
        <v-spacer />
        <v-btn text @click.stop="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import AccountForm from "./AccountForm.vue"

export default 
{
  components: { AccountForm },
  props: {
    account: {
      type: Object,
      default: () => ({
        dbId: '',
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
      dialog: false
    }
  },
  methods: {
    updateAccount() {
      const account = this.$refs.accountForm.submit()
      if (account !== undefined) {
        try {
          // call api to update
        } catch (error) {
          
        } finally {
          this.dialog = false
        }
      }
    }
  }
}
</script>
