<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      sort-by="firstName"
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
                        label="Roles"
                        chips
                      ></v-select>
                    </v-col>
                    <v-col v-else cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.roles"
                        :items="assignedRoles"
                        label="Roles"
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
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>Edit</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              small
              class="mr-2"
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>Delete</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" small @click="deleteItem(item)">
              mdi-account
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
  data: () => ({
    roles: [],
    assignedRoles: [],
    unassignedRoles: [],
    roleSwitch: true,
    switchLable: 'Assign',
    search: '',
    dialog: false,
    dialogDelete: false,
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
    users: [],
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
  }),

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
  },

  created() {
    this.initialize()
  },

  methods: {
    async initialize() {
      const query = `query users {
                        users {
                          dbId :id
                          firstName
                          middleName
                          lastName
                          email
                          password
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
      this.users = usersResponse.data.data.users

      // quering for roles option

      const queryRole = `query roles{
                        roles{
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

      // this.users = [
      //   {
      //     id: 1,
      //     // institutionId: 'ETS0000/11',
      //     firstName: 'John',
      //     middleName: 'Doe',
      //     lastName: 'Smith',
      //     email: 'johndoe@gmail.com',
      //     // department: 'Software Engineering',
      //     // batch: 3,
      //     roles: ['Student'],
      //   },
      //   {
      //     id: 2,
      //     // institutionId: 'ETS0000/11',
      //     firstName: 'John',
      //     middleName: 'Doe',
      //     lastName: 'Smith',
      //     email: 'johndoe@gmail.com',
      //     // department: 'Software Engineering',
      //     // batch: 3,
      //     roles: ['Student', 'Teacher'],
      //   },
      //   {
      //     id: 3,
      //     // institutionId: 'ETS0000/11',
      //     firstName: 'John',
      //     middleName: 'Doe',
      //     lastName: 'Smith',
      //     email: 'johndoe@gmail.com',
      //     // department: 'Software Engineering',
      //     // batch: 3,
      //     roles: ['Admin'],
      //   },
      //   {
      //     id: 4,
      //     // institutionId: 'ETS0000/11',
      //     firstName: 'John',
      //     middleName: 'Doe',
      //     lastName: 'Smith',
      //     email: 'johndoe@gmail.com',
      //     // department: 'Software Engineering',
      //     // batch: 3,
      //     roles: ['Dep Admin'],
      //   },
      //   {
      //     id: 5,
      //     // firstName: 'ETS0000/11',
      //     firstName: 'John',
      //     middleName: 'Doe',
      //     lastName: 'Smith',
      //     email: 'johndoe@gmail.com',
      //     // department: 'Software Engineering',
      //     // batch: 3,
      //     roles: ['Course Manager', 'Dep Admin'],
      //   },
      // ]
      this.users = this.users.map((usr, idx) => {
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

    editItem(item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
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
      this.editedIndex = this.users.indexOf(item)
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
      this.users.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    // fix password pls
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
        const editedUser = await this.$axios.post(
          'http://localhost:4000/graphql',
          { query, variables }
        )
        if (editedUser.data.errors?.length) {
          console.log(editedUser.data.errors[0].message)
          throw new Error(editedUser.data.errors[0].message)
        }
        Object.assign(this.users[this.editedIndex], this.editedItem)
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
        this.users.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
