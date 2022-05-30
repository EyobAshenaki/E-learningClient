export default function ({ store, error }) {
  const roles = store.getters['auth/roles']
  if (!roles.includes('ADMINISTRATOR')) {
    return error({ statusCode: 403, message: 'Forbidden' })
  }
}
