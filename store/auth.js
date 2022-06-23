import { intersection } from 'lodash'
export const state = () => ({
  user: null,
})

export const getters = {
  id(state) {
    return state.user?.id
  },
  name({ user }) {
    return user ? user.firstName : null
  },
  fullName({ user }) {
    return user ? `${user.firstName} ${user.lastName}` : null
  },
  isLoggedIn(state) {
    return !!state?.user?.id
  },
  isAdmin(state) {
    return !!state?.user?.roles.includes('ADMINISTRATOR')
  },
  isCourseManager(state) {
    return !!state?.user?.roles.includes('COURSE_MANAGER')
  },
  isDepartmentAdmin(state) {
    return !!state?.user?.roles.includes('DEPARTMENT_ADMINISTRATOR')
  },
  isCourseOwner(state) {
    return !!state?.user?.roles.includes('COURSE_OWNER')
  },
  isTeacher(state) {
    return !!intersection(
      ['COURSE_TEACHER', 'COURSE_OWNER', 'TEACHER'],
      state?.user?.roles || []
    ).length
  },
  isStudent(state) {
    return !!state?.user?.roles.includes('STUDENT')
  },
  user(state) {
    return state?.user
  },
  roles(state) {
    return state.user ? state.user.roles : []
  },
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  removeUser(state) {
    state.user = null
  },
}

export const actions = {
  login({ commit }, user) {
    commit('setUser', user)
  },
  logout({ commit }) {
    commit('removeUser')
  },
}
