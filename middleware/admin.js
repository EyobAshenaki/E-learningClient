export default function ({ store, error }) {
  if (!store.getters['auth/isAdmin']) {
    return error({ statusCode: 403, message: 'Not an Administrator Account' })
  }
}
