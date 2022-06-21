<template>
      <v-row justify="center" align="center">
        <v-col cols="10" md="4">
          <v-card class="text-center pa-4">
            <h1 class="text-h1 font-weight-black text-lighten-4">{{error.statusCode}}</h1>
            <h2 class="text-h2 font-weight bold text-ligthen-2">{{text}}</h2>
            <v-card-text v-if="error.message">
              <p class="text-h6">{{error.message}}</p>
            </v-card-text>
            <v-card-actions>
              <NuxtLink  class="link" :to="targetPath.route"> <h3 class="text-h5 text-ligthen-2">{{targetPath.text}}<v-icon class="right-icon">mdi-chevron-right</v-icon></h3></NuxtLink>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
  export default {
    name: 'EmptyLayout',
    layout: 'default',
    props: {
      error: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        pageNotFound: '404 Not Found',
        otherError: 'An error occurred',
      }
    },
    head() {
      return {
        title: this.text,
      }
    },
    computed: {
      text() {
        switch (this.error.statusCode) {
          case 404:
            return '404 Not Found'
          case 403:
            return 'Forbidden'
          case 500:
            return 'Internal Server Error'
          default:
            return 'Unknown Error'
        }
      },
      targetPath() {
        return this.$store.getters['auth/isLoggedIn']
          ? { route: '/home', text: 'Return Home' }
          : { route: '/', text: 'Back to Main Page' }
      },
    },
  }
</script>

<style  lang="scss" scoped>
  .link {
    display: block;
    text-decoration: none;
    .right-icon {
      color: inherit;
      vertical-align: center;
    }
  }
</style>
