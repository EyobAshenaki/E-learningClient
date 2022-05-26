<template>
  <v-row class="ma-auto mt-8">
    <v-card flat width="100%">
      <v-tabs
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        v-model="tabs"
        background-color="transparent"
        color="blue"
        grow
      >
        <v-tab
          show-arrows
          v-for="item in items"
          :key="item"
          @click="test(item)"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <AdminAllAccounts :users="users" />
        </v-tab-item>
        <v-tab-item>
          <AdminTeachersTeachers />
        </v-tab-item>
        <v-tab-item>
          <AdminCourseManagerCourseManager />
        </v-tab-item>
        <v-tab-item>
          <AdminAdminsAdmins />
        </v-tab-item>
        <v-tab-item>
          <AdminDepartmentAdminsDepAdmins />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    roles: [],
    tabs: null,
    items: [
      'Student',
      'Teacher',
      'Course Manager',
      'Administrator',
      'Department Adminstrator',
    ],
    users: [],
  }),
  async mounted() {
    const query = `query users {
                        users {
                          dbId :id
                          firstName
                          middleName
                          lastName
                          email

                          roles{
                            name
                          }
                        }
                      }`
    const usersResponse = await this.$axios.post(
      'http://localhost:4000/graphql',
      { query }
    )
    if (usersResponse.data.errors?.length) {
      console.log(usersResponse.data.errors[0].message)
      throw new Error(usersResponse.data.errors[0].message)
    }
    this.users.push(...usersResponse.data.data.users)
  },
  methods: {
    initialize() {
      this.test('Student')
    },

    async test(userName) {
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
      this.roles = rolesResponse.data.data.roles

      const selectedRole = this.roles.filter((role) => {
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
      this.users = roleMembersResponse.data.data.role.members
      console.log(this.users)
    },
    getRoleName(role) {
      const tempRole = role.split(' ')
      return tempRole.length > 1
        ? `${tempRole[0].toUpperCase()}_${tempRole[1].toUpperCase()}`
        : `${tempRole[0].toUpperCase()}`
    },
  },
}
</script>
