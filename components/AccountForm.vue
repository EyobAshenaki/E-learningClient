<template>
  <v-form v-model="valid">
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-text-field v-model="firstName" label="First Name" type="text"/>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field v-model="middleName" label="Middle Name" type="text" />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field v-model="lastName" label="Last Name" type="text" />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field v-model="email" label="E-mail" type="email" />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field v-model="password" label="Password" :type="passwordVisible? 'text': 'password'"  append-icon="mdi-eye" @click:append="passwordVisible != passwordVisible"/>
      </v-col>
      <v-select v-model="roles" multiple :items="roleItems"/>
      <v-col cols="12" sm="6" md="4"></v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: {
    edit: {
      type: Boolean,
      default: false
    },
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
      email: this.account.email,
      password: this.account.password,
      passwordVisible: false,
      roleItems: ['DEV', 'ADMINISTRATOR', 'STUDENT'],
      roles: this.account.roles.map(role => role.name)
    }
  },
  methods: {
    submit() {
      if(this.valid) {
        return {
          firstName: this.firstName,
          middleName: this.middleName,
          lastName: this.lastName,
          password: this.password,
          roles: this.roles
        }
      }else {
        return undefined
      }
    }
  }
}
</script>