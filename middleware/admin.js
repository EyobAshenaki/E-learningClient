export default function ({ store, error }) {
  if (!process.server) {
    if (!store.getters['auth/isAdmin']) {
      return error({ statusCode: 403, message: 'Forbidden' })
    }
  }
}
