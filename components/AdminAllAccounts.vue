<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="parsedUsers"
      :search="search"
      sort-by="id"
      class="mt-5"
      style="height: 75vh"
    >
      <template #[`item.roles`]="{ item }">
        <v-chip v-for="(role, id) in item.roles" :key="id" dark class="mr-1">
          {{ role.name }}
        </v-chip>
      </template>
      <template #top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="mr-4"
          ></v-text-field>
          <v-spacer></v-spacer>
          <add-account-dialog />
        </v-toolbar>
      </template>

      <!-- eslint-disable-next-line -->
      <template #item.actions="{item}">
        <edit-account-dialog :account="item" />
        <delete-account-dialog :account="item" />
      </template>
      <template #no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import AddAccountDialog from './AddAccountDialog.vue'
import DeleteAccountDialog from './DeleteAccountDialog.vue'
import EditAccountDialog from './EditAccountDialog.vue'
export default {
  components: { AddAccountDialog ,EditAccountDialog, DeleteAccountDialog },
  props: {
    users: {
       type: Array,
    },
  },
  data() {
    return {
      roles: [],
      assignedRoles: [],
      unassignedRoles: [],
      roleSwitch: true,
      switchLable: 'Assign',
      search: '',
      dialog: false,
      dialogDelete: false,
      dialogPassword: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        // { text: 'Institutional ID', value: 'institutionId' },
        { text: 'First Name', value: 'firstName' },
        { text: 'Middle Name', value: 'middleName' },
        { text: 'Last Name', value: 'lastName' },
        { text: 'E-mail', value: 'email' },
        // { text: 'Password', value: 'password' },
        // { text: 'Batch', value: 'batch' },
        { text: 'Roles', value: 'roles' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      parsedUsers: this.users,
    }
  },

  created() {
    // this.initialize()
  },

  methods: {
    async initialize() {
      // quering for roles option

      console.log('users', this.parsedUsers)

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

      // this.roles = rolesResponse.data.data.roles.map((role) =>
      //   this.getRoleName(role)
      // )
      this.roles = rolesResponse.data.data.roles.map((role) => role.name)

      this.parsedUsers = this.parsedUsers.map((usr, idx) => {
        return {
          ...usr,
          id: idx + 1,
        }
      })
    },

    getRoleSwitchLabel(switcher) {
      return switcher === true
        ? (this.switchLable = 'Assign')
        : (this.switchLable = 'Remove')
    },
    // getRoleName(role) {
    //   const tempRole = role.name.split('_')

    //   return tempRole.length > 1
    //     ? `${tempRole[0].slice(0, 1)}${tempRole[0]
    //         .slice(1)
    //         .toLowerCase()} ${tempRole[1].slice(0, 1)}${tempRole[1]
    //         .slice(1)
    //         .toLowerCase()}`
    //     : `${tempRole[0].slice(0, 1)}${tempRole[0].slice(1).toLowerCase()}`
    // },
    changePassword(item) {
      this.editPasswordIndex = this.parsedUsers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogPassword = true
    },
    async deleteItemConfirm() {
      const query = `mutation deleteUser($id: ID!) {
                        removeUser(id: $id) {
                          firstName
                        }
                      }`
      const variables = { id: this.editedItem.dbId }
      const deletedUser = await this.$axios.post(
        'http://localhost:4000/graphql',
        { query, variables }
      )
      if (deletedUser.data.errors?.length) {
        console.log(deletedUser.data.errors[0].message)
        throw new Error(deletedUser.data.errors[0].message)
      }
      this.parsedUsers.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    // fix password pls

    async savePassword() {
      const query = `mutation changePassword($id: ID! $password: String) {
                        updateUser (updateUserInput: {id: $id password: $password}) {
                          dbId: id
                        }
                      }`
      const variables = {
        id: this.editedItem.dbId,
        password: this.editedItem.password,
      }
      const newPassword = await this.$axios.post(
        'http://localhost:4000/graphql',
        {
          query,
          variables,
        }
      )
      if (newPassword.data.errors?.length) {
        console.log(newPassword.data.errors[0].message)
        throw new Error(newPassword.data.errors[0].message)
      }
      this.closePassword()
    },

    async save() {
      if (this.editedIndex > -1) {
        const query = `mutation editUser(
                          $id: ID!
                          $firstName: String
                          $middleName: String
                          $lastName: String
                          $roleName: RoleName
                          $email: String
                        ) {
                          updateUser(
                            updateUserInput: {
                              id: $id
                              firstName: $firstName
                              middleName: $middleName
                              lastName: $lastName
                              roleName: $roleName
                              email: $email
                            }
                          ) {
                            dbId: id
                            firstName
                            middleName
                            lastName
                            email
                            roles {
                              name
                            }
                          }
                        }`
        const variables = {
          id: this.editedItem.dbId,
          firstName: this.editedItem.firstName || null,
          middleName: this.editedItem.middleName || null,
          lastName: this.editedItem.lastName || null,
          email: this.editedItem.email || null,
          roleName: this.editedItem.roles || null,
        }
        let editedUser = await this.$axios.post(
          'http://localhost:4000/graphql',
          { query, variables }
        )
        if (!this.roleSwitch) {
          const revokeQuery = `mutation revoke ($userId: ID! $roleName: RoleName!) {
                            revokeUserRole (userId: $userId roleName: $roleName) {
                              dbId: id
                              firstName
                            }
                          }`
          const revokeVariables = {
            userId: this.editedItem.dbId,
            roleName: this.editedItem.roles || null,
          }
          editedUser = await this.$axios.post('http://localhost:4000/graphql', {
            query: revokeQuery,
            variables: revokeVariables,
          })
        }
        if (editedUser.data.errors?.length) {
          console.log(editedUser.data.errors[0].message)
          throw new Error(editedUser.data.errors[0].message)
        }
        this.initialize()
      } else {
        const query = `mutation createUser(
                          $firstName: String!
                          $middleName: String!
                          $lastName: String!
                          $roleName: RoleName!
                          $email: String!
                          $password: String!
                        ) {
                          createUser(
                            createUserInput: {
                              firstName: $firstName
                              middleName: $middleName
                              lastName: $lastName
                              roleName: $roleName
                              email: $email
                              password: $password
                            }
                          ) {
                            dbId: id
                            firstName
                            middleName
                            lastName
                            email
                            password
                            roles {
                              name
                            }
                          }
                        }`
        const variables = {
          firstName: this.editedItem.firstName,
          middleName: this.editedItem.middleName,
          lastName: this.editedItem.lastName,
          email: this.editedItem.email,
          password: this.editedItem.password,
          roleName: this.editedItem.roles,
        }
        const newUser = await this.$axios.post(
          'http://localhost:4000/graphql',
          { query, variables }
        )
        if (newUser.data.errors?.length) {
          console.log(newUser.data.errors[0].message)
          throw new Error(newUser.data.errors[0].message)
        }
        this.parsedUsers.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
