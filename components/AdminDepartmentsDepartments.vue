<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="departments"
      :search="search"
      sort-by="id"
      class="mt-5"
      style="height: 75vh"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <!-- <v-toolbar-title>Departments</v-toolbar-title>
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
                Add New Department
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
                    <!-- <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.studentId"
                      label="Student ID"
                      type="text"
                    ></v-text-field>
                  </v-col> -->
                    <v-col cols="12" sm="5">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Department Name"
                        type="text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="7">
                      <v-select
                        v-model="editedItem.departmentAdministrator"
                        :items="unassignedDepAdmins"
                        item-text="departmentAdminName"
                        item-value="unassignedDepAdmin"
                        :menu-props="{ bottom: true, offsetY: true }"
                        class="ma-0 pt-1"
                        label="Department Administrator"
                        chips
                      ></v-select>
                    </v-col>
                    <!-- <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.numOfStudents"
                        label="Number of Students"
                        type="number"
                      ></v-text-field>
                    </v-col> -->
                    <!-- <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.role"
                      label="Role"
                      type="text"
                    ></v-text-field>
                  </v-col> -->
                    <!-- <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.courses"
                      label="Courses"
                      type="text"
                    ></v-text-field>
                  </v-col> -->
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
      <template v-slot:[`item.departmentAdministrator`]="{ item }">
        {{
          `${item.departmentAdministrator.firstName} ${item.departmentAdministrator.middleName} ${item.departmentAdministrator.lastName}`
        }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
      // { text: 'Student ID', value: 'studentId' },
      { text: 'Department Name', value: 'name', sortable: false },
      {
        text: 'Department Administrator',
        value: 'departmentAdministrator',
        sortable: false,
      },
      // { text: 'Number of Students', value: 'numOfStudents', sortable: false },
      // { text: 'Role', value: 'role' },
      // { text: 'Courses', value: 'courses' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    unassignedDepAdmins: [],
    departments: [],
    editedIndex: -1,
    editedItem: {
      dbId: null,
      // studentId: '',
      name: '',
      departmentAdministrator: [],
      // numOfStudents: '',
      // role: '',
      // courses: '',
    },
    defaultItem: {
      dbId: null,
      // studentId: '',
      name: '',
      departmentAdministrator: [],
      // numOfStudents: '',
      // role: '',
      // courses: '',
    },
    currentDepAdminId: null,
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
      const query = `query deps {
                        departments {
                          dbId: id
                          name
                          departmentAdministrator {
                            id
                            firstName
                            middleName
                            lastName
                          }
                        }
                      }`
      const depResponse = await this.$axios.post(
        'http://localhost:4000/graphql',
        { query }
      )
      if (depResponse.data.errors?.length) {
        console.log(depResponse.data.errors[0].message)
        throw new Error(depResponse.data.errors[0].message)
      }
      this.departments = depResponse.data.data.departments

      const queryUnass = `query getdepadmins{
                              getAllNewDepartmentAdministrators{
                                id
                                firstName
                                middleName
                                lastName
                              }
                            }`
      const unassResponse = await this.$axios.post(
        'http://localhost:4000/graphql',
        { query: queryUnass }
      )
      if (unassResponse.data.errors?.length) {
        console.log(unassResponse.data.errors[0].message)
        throw new Error(unassResponse.data.errors[0].message)
      }

      // this.roles = unassResponse.data.data.roles.map((role) =>
      //   this.getRoleName(role)
      // )
      this.unassignedDepAdmins = [
        ...unassResponse.data.data.getAllNewDepartmentAdministrators,
      ]

      this.unassignedDepAdmins = this.unassignedDepAdmins.map(
        (unAssDepAdmin) => {
          const depAdminName = `${unAssDepAdmin.firstName} ${unAssDepAdmin.middleName} ${unAssDepAdmin.lastName}`
          return {
            departmentAdminName: depAdminName,
            unassignedDepAdmin: unAssDepAdmin,
          }
        }
      )

      this.departments = this.departments.map((dep, idx) => {
        return {
          ...dep,
          id: idx + 1,
        }
      })
    },

    editItem(item) {
      this.editedIndex = this.departments.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.currentDepAdminId = this.editedItem.departmentAdministrator.id
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.departments.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const query = `mutation dd($id: ID!) {
                        removeDepartment(id: $id) 
                      }`
      const variables = { id: this.editedItem.dbId }
      const deletedDepartment = await this.$axios.post(
        'http://localhost:4000/graphql',
        { query, variables }
      )
      if (deletedDepartment.data.errors?.length) {
        console.log(deletedDepartment.data.errors[0].message)
        throw new Error(deletedDepartment.data.errors[0].message)
      }

      this.initialize()
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

    async save() {
      if (this.editedIndex > -1) {
        const queryDismiss = `mutation dismissdepadmin ($departmentId: ID!, $userId: ID!){
                                dismissDepartmentAdministrator(departmentId: $departmentId, userId: $userId)
                              }`
        const variablesDismiss = {
          departmentId: this.editedItem.dbId,
          userId: this.currentDepAdminId,
        }
        const dismissedAdmin = await this.$axios.post(
          'http://localhost:4000/graphql',
          { query: queryDismiss, variables: variablesDismiss }
        )
        if (dismissedAdmin.data.errors?.length) {
          console.log(dismissedAdmin.data.errors[0].message)
          throw new Error(dismissedAdmin.data.errors[0].message)
        }

        const query = `mutation ud($id: ID!  $name: String) {
                          updateDepartment(id: $id name: $name) {
                            dbId: id
                            name
                          }
                        }`
        const variables = {
          name: this.editedItem.name,
          id: this.editedItem.dbId,
        }
        const editedDepartmentResponse = await this.$axios.post(
          'http://localhost:4000/graphql',
          { query, variables }
        )
        if (editedDepartmentResponse.data.errors?.length) {
          console.log(editedDepartmentResponse.data.errors[0].message)
          throw new Error(editedDepartmentResponse.data.errors[0].message)
        }

        const editedDepartment =
          editedDepartmentResponse.data.data.updateDepartment

        const queryAssign = `mutation appointDep($departmentId: ID!, $userId: ID!) {
                                appointDepartmentAdministrator(departmentId: $departmentId, userId: $userId)
                              }`
        const variablesAssign = {
          departmentId: editedDepartment.dbId,
          userId: this.editedItem.departmentAdministrator.id,
        }
        const assignedAdmin = await this.$axios.post(
          'http://localhost:4000/graphql',
          { query: queryAssign, variables: variablesAssign }
        )
        if (assignedAdmin.data.errors?.length) {
          console.log(assignedAdmin.data.errors[0].message)
          throw new Error(assignedAdmin.data.errors[0].message)
        }
      } else {
        const query = `mutation CreateDepartment($name: String!){
                          createDepartment(name: $name){
                            dbId: id
                            name
                          }
                        }`
        const variables = { name: this.editedItem.name }
        const newDepartmentResponse = await this.$axios.post(
          'http://localhost:4000/graphql',
          { query, variables }
        )
        if (newDepartmentResponse.data.errors?.length) {
          console.log(newDepartmentResponse.data.errors[0].message)
          throw new Error(newDepartmentResponse.data.errors[0].message)
        }

        const newDepartment = newDepartmentResponse.data.data.createDepartment

        const queryAssign = `mutation appointDep($departmentId: ID!, $userId: ID!) {
                                appointDepartmentAdministrator(departmentId: $departmentId, userId: $userId)
                              }`
        const variablesAssign = {
          departmentId: newDepartment.dbId,
          userId: this.editedItem.departmentAdministrator.id,
        }
        const assignedAdmin = await this.$axios.post(
          'http://localhost:4000/graphql',
          { query: queryAssign, variables: variablesAssign }
        )
        if (assignedAdmin.data.errors?.length) {
          console.log(assignedAdmin.data.errors[0].message)
          throw new Error(assignedAdmin.data.errors[0].message)
        }
      }

      this.initialize()
      this.close()
    },
  },
}
</script>
