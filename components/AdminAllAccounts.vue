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
      <template v-slot:[`item.roles`]="{ item }">
        <v-chip dark class="mr-1" v-for="(role, id) in item.roles" :key="id">
          {{ role.name }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <!-- <v-toolbar-title>All Users</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider> -->
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="mr-4"
          ></v-text-field>
          <v-spacer></v-spacer>
          <!-- edit password dialog -->
          <v-dialog v-model="dialogPassword" max-width="500px">
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.password"
                        label="Password"
                        type="text"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closePassword">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="savePassword">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add New User Account
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <!-- <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.id"
                        label="ID"
                        type="number"
                      ></v-text-field>
                    </v-col> -->
                    <!-- <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.institutionId"
                        label="Student ID"
                        type="text"
                      ></v-text-field>
                    </v-col> -->
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.firstName"
                        label="First Name"
                        type="text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.middleName"
                        label="Middle Name"
                        type="text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.lastName"
                        label="Last Name"
                        type="text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.email"
                        label="E-mail"
                        type="email"
                      ></v-text-field>
                    </v-col>
                    <v-col v-if="editedIndex <= -1" cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.password"
                        label="Password"
                        type="password"
                      ></v-text-field>
                    </v-col>
                    <v-col v-if="editedIndex > -1" cols="12" sm="6" md="4">
                      <v-switch
                        v-model="roleSwitch"
                        inset
                        :label="`Role: ${getRoleSwitchLabel(roleSwitch)}`"
                      ></v-switch>
                    </v-col>
                    <!-- <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.batch"
                      label="Batch"
                      type="number"
                    ></v-text-field>
                  </v-col> -->
                    <v-col v-if="roleSwitch" cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.roles"
                        :items="unassignedRoles"
                        label="Add Role"
                        chips
                      ></v-select>
                    </v-col>
                    <v-col v-else cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.roles"
                        :items="assignedRoles"
                        label="Remove Role"
                        chips
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <edit-account-dialog :account="item" />
        <delete-account-dialog :account="item" />
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              small
              @click="changePassword(item)"
            >
              mdi-lock-reset
            </v-icon>
          </template>
          <span>Change Password</span>
        </v-tooltip>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
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
      editPasswordIndex: -1,
      editedIndex: -1,
      editedItem: {
        dbId: null,
        // institutionId: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: '',
        // batch: 0,
        roles: [],
      },
      defaultItem: {
        dbId: null,
        // institutionId: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: '',
        // batch: 0,
        roles: [],
      },
      parsedUsers: this.users,
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    dialogPassword(val) {
      val || this.closePassword()
    },
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

    editItem(item) {
      this.editedIndex = this.parsedUsers.indexOf(item)
      Object.assign(this.editedItem, item)
      const itemRoleNames = item.roles.map((role) => role.name)
      this.unassignedRoles = this.roles.filter((role) => {
        return !itemRoleNames.includes(role)
      })
      this.assignedRoles = this.roles.filter((role) => {
        return itemRoleNames.includes(role)
      })
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.parsedUsers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
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

    closePassword() {
      this.dialogPassword = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editPasswordIndex = -1
      })
    },

    close() {
      this.dialog = false
      // this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      // })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
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
