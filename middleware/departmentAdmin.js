export default function ({ store, error }) {
  if (!store.getters['auth/isDepartmentAdmin']) {
    return error({
      statusCode: 403,
      message: 'Not a Department Administrator account',
    })
  }
}
