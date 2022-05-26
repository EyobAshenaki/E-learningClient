export const state = () => ({
  // roles: [],
  items: [
    'Student',
    'Teacher',
    'Course Manager',
    'Administrator',
    'Department Adminstrator',
  ],
  users: [],
  splitRole: [],
})

export const getters = {}

export const actions = {
  getRoleName({ commit }, role) {
    const tempUnsplitRole = role.split(' ')
    const splitRole =
      tempUnsplitRole.length > 1
        ? `${tempUnsplitRole[0].toUpperCase()}_${tempUnsplitRole[1].toUpperCase()}`
        : `${tempUnsplitRole[0].toUpperCase()}`
    commit('getRoleName', splitRole)
    return splitRole
  },

  async getRoleMembers({ commit }, userName) {
    const queryRole = `query roles{
                          roles{
                            id
                            name
                          }
                        }`
    const rolesResponse = await this.$axios.post(
      'http://localhost:4000/graphql',
      { query: queryRole }
    )
    if (rolesResponse.data.errors?.length) {
      console.log(rolesResponse.data.errors[0].message)
      throw new Error(rolesResponse.data.errors[0].message)
    }

    const roles = rolesResponse.data.data.roles
    const selectedRole = roles.filter((role) => {
      return this.getRoleName(userName) === role.name
    })
    const roleId = selectedRole[0].id
    console.log(roleId)

    const queryRoleMembers = `query role($id: ID!) {
                                      role(id: $id) {
                                        name
                                        members {
                                          id
                                          firstName
                                          middleName
                                          lastName
                                          email
                                          password
                                          department{
                                            name
                                          }
                                        }
                                      }
                                    }`
    const roleMembersvariables = { id: roleId }
    const roleMembersResponse = await this.$axios.post(
      'http://localhost:4000/graphql',
      { query: queryRoleMembers, variables: roleMembersvariables }
    )
    if (roleMembersResponse.data.errors?.length) {
      console.log(roleMembersResponse.data.errors[0].message)
      throw new Error(roleMembersResponse.data.errors[0].message)
    }
    console.log(roleMembersResponse.data.data.role)
    const users = roleMembersResponse.data.data.role.members
    commit('getRoleMembers', users)
    return users
  },
}

export const mutations = {
  viewStudents(state, studentToggle) {
    state.studentToggle = studentToggle
  },
}
