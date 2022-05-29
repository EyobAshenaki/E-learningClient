export default ({ app }, inject) => {
  inject('toast', {
    success(message) {
      window.$nuxt.$emit('toast-notification', {
        message,
        status: 'SUCCESS',
      })
    },
    warning(message) {
      window.$nuxt.$emit('toast-notification', {
        message,
        status: 'WARNING',
      })
    },
    error(message) {
      window.$nuxt.$emit('toast-notification', {
        message,
        status: 'ERROR',
      })
    },
  })
}
