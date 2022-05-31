<template>
  <v-container class="telegram-auth-container">
    <v-card width="500" height="380" class="form-container">
      <v-card-title class="form-title">Welcome {{ name }}</v-card-title>
      <v-card-subtitle class="form-subtitle">
        Please login to authorize our telegram bot.
      </v-card-subtitle>
      <v-card-title v-if="hasError" class="form-error-message">{{
        errorMsg
      }}</v-card-title>
      <v-card-text class="form-fields-container">
        <LoginForm
          ref="loginForm"
          @success="onAuthSuccess($event)"
          @error="onAuthError($event)"
        />
      </v-card-text>
      <v-card-actions class="form-button-container">
        <v-btn
          large
          rounded
          color="#D27D01"
          :loading="loading"
          :disabled="loading"
          class="form-button"
          @click="login"
        >
          Continue
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
  import { GraphqlError } from '../utils/errors'
  export default {
    middleware({ query, error }) {
      const { chatId, userId, name } = query
      if ((chatId && userId && name) === undefined) {
        return error({ statusCode: 400, message: 'Bad Request' })
      }
    },
    asyncData({ query, redirect }) {
      const { name, userId, chatId } = query
      return {
        name,
        userId,
        chatId,
      }
    },
    data() {
      return {
        loading: false,
        hasError: false,
        errorMsg: null,
      }
    },
    methods: {
      login() {
        this.loading = true
        this.$refs.loginForm.submit()
      },
      async onAuthSuccess(user) {
        const query = `#graphql
              mutation ($chatId: String!, $telegramId: String!, $userId: String!){
          authorizeTelegram(authorizeTelegramInput: {
              chatId: $chatId
              telegramId: $telegramId
              userId: $userId
          }) {
              id
              first_name
          }
      }`
        const variables = {
          chatId: this.chatId,
          telegramId: this.userId,
          userId: user.id,
        }
        try {
          const { data } = await this.$axios.post('/graphql/', {
            query,
            variables,
          })
          if (data.errors !== undefined) {
            throw new GraphqlError(data.errors)
          }
          window.location.href = `https://t.me/nestJsTelegrambot`
        } catch (error) {
          if (error.isAxiosError) {
            console.error(error.response.data)
          } else {
            console.error(error)
          }
          // console.error(error.errors[0].message)

          this.hasError = true
          this.errorMsg = error.errors[0].message
          setTimeout(() => {
            this.hasError = false
            this.errorMsg = null
          }, 4000)
        } finally {
          this.loading = false
        }
      },

      onAuthError(error) {
        this.loading = false

        this.errorMsg = error.message
        this.hasError = true
        setTimeout(() => {
          this.hasError = false
          this.errorMsg = null
        }, 4000)
      },
    },
  }
</script>

<style scoped>
  .telegram-auth-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-container {
    background-color: #f8f8ff;
    display: flex;
    flex-direction: column;
    align-content: center;
    box-shadow: none !important;
  }

  .form-title {
    margin-bottom: 0.3em;
    font-weight: 800;
    font-size: 2em;
    align-self: center;
  }

  .form-subtitle {
    margin-bottom: 0.6em;
    font-size: 1em;
    align-self: center;
  }

  .form-error-message {
    padding: 0;
    padding-bottom: 0.5em;
    font-weight: normal;
    font-size: 1em;
    color: red;
    align-self: center;
  }

  .form-fields-container {
    padding: 0 2.5em;
  }

  .form-button-container {
    padding-top: 0;
  }

  .form-button {
    margin: 0.5em auto;
    width: 60%;
    font-size: 1.2em;
    font-weight: 800;
    text-align: center;
  }
</style>
