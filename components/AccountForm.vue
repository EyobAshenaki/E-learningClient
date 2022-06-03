<template>
  <v-form v-model="valid">
    <v-row>
      <v-col cols="12" md="6" sm="4">
        <v-text-field v-model="firstName" label="First Name" type="text" />
      </v-col>
      <v-col cols="12" md="6" sm="4">
        <v-text-field
          v-model="middleName"
          :rules="[rules.singleCharacter]"
          label="Middle Name"
          type="text"
          counter
        />
      </v-col>
      <v-col cols="12" md="6" sm="4">
        <v-text-field v-model="lastName" label="Last Name" type="text" />
      </v-col>
      <v-col cols="12" md="6" sm="4">
        <v-text-field v-model="email" label="E-mail" type="email" />
      </v-col>
      <v-col cols="12" md="8" sm="12">
        <v-text-field
          v-model="password"
          label="Password"
          :type="passwordVisible ? 'text' : 'password'"
          append-icon="mdi-eye"
          prepend-icon="mdi-autorenew"
          @click:prepend="generatePassword"
          @click:append="passwordVisible = !passwordVisible"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
  import randomString from 'randomstring'
  import { singleCharacter } from '~/utils/validators'
  export default {
    props: {
      edit: {
        type: Boolean,
        default: false,
      },
      account: {
        type: Object,
        default: () => ({
          dbId: '',
          email: '',
          firstName: '',
          lastName: '',
          middleName: '',
        }),
      },
    },
    data() {
      return {
        rules: { singleCharacter },
        dialog: false,
        valid: false,
        firstName: this.account.firstName,
        middleName: this.account.middleName,
        lastName: this.account.lastName,
        email: this.account.email,
        password: this.account.password,
        passwordVisible: false,
      }
    },
    methods: {
      submit() {
        if (this.valid) {
          return {
            firstName: this.firstName,
            middleName: this.middleName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
          }
        } else {
          return undefined
        }
      },
      generatePassword() {
        this.password = randomString.generate({
          length: 10,
          capitalization: 'uppercase',
        })
      },
    },
  }
</script>