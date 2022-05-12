<template>
  <v-row class="login-container">
    <v-col cols="12" sm="5" lg="4" class="section-form">
      <h1 class="form-title">Sign in</h1>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          class="form-textfield"
          lable="Email"
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
          lable="Password"
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
        <v-btn
          large
          rounded
          color="#D27D01"
          class="form-button"
          @click="submit"
        >
          login
        </v-btn>
        <a class="form-link" href="#">Forgot your password?</a>
      </v-form>
    </v-col>
    <v-col cols="12" sm="7" class="section-svg">
      <img class="svg" src="../assets/img/example-25.svg" alt="" />
    </v-col>
  </v-row>
</template>

<script>

export default {
  data: () => ({
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
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        this.$axios.post('/api/auth/signin', {
          name: this.name,
          email: this.email,
        })
      }
    },
    clear() {
      this.$refs.form.reset()
    },
  },
}
</script>

<style scoped>
/* * {
  border: 1px black dashed;
} */

.login-container {
  box-sizing: border-box;
  margin-left: 20em;
  padding: 0;
  height: 100vh;
  align-self: center;
}

.section-svg {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f8f8ff;
}

.section-svg .svg {
  height: 50vh;
}

.section-form {
  /* background-color: #fff; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-self: center;
  border-radius: 0.3em;
  box-sizing: border-box;
  box-shadow: rgba(0 0 0 7%) 0 1 2, rgba(0 0 0 7%) 0 2 4, rgba(0 0 0 7%) 0 4 8,
    rgba(0 0 0 7%) 0 8 16, rgba(0 0 0 7%) 0 16 32, rgba(0 0 0 7%) 0 32 64;
}

.form-title {
  font-size: 3em;
  color: #086cfe;
  text-align: left;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 0.3em;
}

.form-textfield {
  width: 90%;
  margin: 0 auto;
  margin-top: 1em;
}

.form-textfield-icon {
  padding: 0 0.35em;
}

.form-textfield-divider {
  background-color: gray;
  margin: 0.1em 0;
  margin-right: 1em;
}

.form-link {
  display: block;
  width: 90%;
  font-size: 0.96em;
  text-decoration: none;
  color: gray;
  margin: 0 auto;
  margin-top: 1.4em;
}

.form-button {
  display: block;
  width: 90%;
  font-size: 1.2em;
  font-weight: 800;
  color: white;
  text-align: center;
  margin: 0 auto;
  margin-top: 0.7em;
}
</style>
