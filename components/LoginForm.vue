<template>
  <div>
    <h1 class="form-title">Sign in</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="email"
        class="form-textfield"
        label="Email"
        type="email"
        required
        solo
        :rules="emailRules"
      >
        <template #prepend-inner>
          <v-icon class="form-textfield-icon"> mdi-email-outline </v-icon>
          <v-divider vertical class="form-textfield-divider"></v-divider>
        </template>
      </v-text-field>
      <v-text-field
        v-model="password"
        class="form-textfield"
        label="Password"
        required
        solo
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        :rules="passwordRules"
        :counter="8"
        @click:append="showPassword = !showPassword"
      >
        <template #prepend-inner>
          <v-icon class="form-textfield-icon"> mdi-lock-outline </v-icon>
          <v-divider vertical class="form-textfield-divider"></v-divider>
        </template>
      </v-text-field>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      password: '',
      showPassword: false,
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => (v && v.length >= 8) || 'Name must be greater than 8 characters',
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) =>
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
            v
          ) || 'E-mail must be valid',
      ],
    }
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        const {data} = await this.$axios.post('/api/auth/signin', {
          email: this.email,
          password: this.password,
        })
        this.$emit('success', data)
      }
    },
    clear() {
      this.$refs.form.reset()
    },
  },
}
</script>
