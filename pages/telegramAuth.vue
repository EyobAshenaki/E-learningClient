<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="4" class="mx-auto">
        <v-card max-width="500">
          <v-card-title
            >Authorize Telegram Bot (<code>@e-learning-bot</code>)</v-card-title
          >
          <v-card-subtitle
            >Welcome <span>{{ name }}</span
            >. Please login to authorize our telegram bot.
          </v-card-subtitle>
          <v-card-text>
            <LoginForm ref="loginForm" @success="onAuthSuccess($event)" />
          </v-card-text>
          <v-card-actions>
            <v-btn :loading="loading" :disabled="loading" @click="login"> Authorize </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {GraphqlError} from  '../utils/errors'
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
      chatId
    }
  },
  data() {
    return {
      loading: false,
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
        userId: user.id
      }
      try {
        const {data} = await this.$axios.post('/graphql/', {
          query,
          variables,
        })
        if (data.errors !== undefined) {
          throw new GraphqlError(data.errors)
        }
        window.location.href = `https://t.me/nestJsTelegrambot?start`
      } catch (error) {
        if (error.isAxiosError) {
          console.error(error.response.data)
        }
        console.error(error)
      }finally {
        this.loading = false;
      }
    },
  },
}
</script>
