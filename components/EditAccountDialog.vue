<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" icon>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Edit Account</v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field v-model="firstName" />
          <v-text-field v-model="middleName" />
          <v-text-field v-model="lastName" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" outlined>Save</v-btn>
        <v-spacer />
        <v-btn text @click.stop="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
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
      dialog: false,
      valid: false,
      firstName: this.account.firstName,
      middleName: this.account.middleName,
      lastName: this.account.lastName,
    }
  },
}
</script>
