<template>
  <v-row class="login-container">
    <v-col cols="12" sm="5" lg="4" class="section-form">
      <h1 class="form-title">Sign in</h1>
      <login-form
        ref="login_form"
        @success="onLoginSucess($event)"
        @error="onLoginError($event)"
      />
      <v-btn
        large
        rounded
        color="#D27D01"
        class="form-button"
        :loading="loading"
        :disabled="loading"
        @click="login"
      >
        Login
      </v-btn>
      <a class="form-link" href="#">Forgot your password?</a>
    </v-col>
    <v-col cols="12" sm="7" class="section-svg">
      <img class="svg" src="../assets/img/example-25.svg" alt="" />
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
      }
    },
    middleware: ['guest'],
    methods: {
      login() {
        this.$refs.login_form.submit()
        this.loading = true
      },
      onLoginSucess(user) {
        this.$store.dispatch('auth/login', user)
        this.$router.push('/home')
      },
      onLoginError(error) {
        this.$toast.error(error.message)
        this.loading = false
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
    /* background-color: #000; */
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
    margin-bottom: 0.5em;
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
