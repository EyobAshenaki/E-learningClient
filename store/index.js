export const actions = {
  async nuxtServerInit({ dispatch, getters }, { req, $axios }) {
    if (
      !getters['auth/isLoggedIn'] &&
      req.headers.cookie?.includes('sessionId')
    ) {
      const user = await $axios.get('/api/auth/me').then((resp) => resp.data)
      dispatch('auth/login', {
        ...user,
        roles: user.roles.map((role) => role.name),
      })
    }
  },
}
