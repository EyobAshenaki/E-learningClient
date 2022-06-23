export default function ({ store, error }) {
  if (!store.getters['auth/isCourseManager']) {
    return error({ statusCode: 403, message: 'Not a Course Manager Account' })
  }
}
