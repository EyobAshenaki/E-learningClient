<template>
   <v-dialog v-model="dialog" max-width="500px">
    <template #activator="{ on, attrs }">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
        Add New User Account
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="text-h5">Add New Account</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <account-form ref="accountForm"/>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="blue darken-1" text @click="addAccount"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import AccountForm from './AccountForm.vue'
export default {
  components: { AccountForm },
  methods: {
    addAccount(){
      const account = this.$refs.accountForm.submit()
      if (account!==undefined) {
        // submit data
        console.log(account)
      }
      
    }
  }

}
</script>