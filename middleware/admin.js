export default function ({ store, error }) {
  if (!process.server) {
    const roles = store.getters['auth/roles']
    if (!roles.includes('ADMINISTRATOR')) {
      return error({ statusCode: 403, message: 'Forbidden' })
    }
  }
}
