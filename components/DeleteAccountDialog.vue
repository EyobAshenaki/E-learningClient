<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" icon v-on="on">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Delete Account</v-card-title>
      <v-card-text>
        <p>Are you sure you want to delete this account?</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" outlined @click="deleteAccount">Delete</v-btn>
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
      }
    },
    methods: {
      deleteAccount() {
        try {
          // call api delete route
        } catch (error) {
        } finally {
          this.dialog = false
        }
      },
    },
  }
</script>
