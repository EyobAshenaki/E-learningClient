<template>
<div>

  <v-data-table
    dense
    :headers="headers"
    :items="courseManagers"
    :search="search"
    sort-by="id"
    class="elevation-1 mt-5"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Course Managers</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="mr-4"
      ></v-text-field>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
        
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Add New Course Manager
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.id"
                      label="ID"
                      type="number"
                    ></v-text-field>
                  </v-col>
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
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.fullName"
                      label="Full Name"
                      type="text"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="E-mail"
                      type="email"
                    ></v-text-field>
                  </v-col>
                  <!-- <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.department"
                      label="Department"
                      type="text"
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
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
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
        { text: 'Full Name', value: 'fullName' },
        { text: 'E-mail', value: 'email' },
        // { text: 'Department', value: 'department' },
        // { text: 'Role', value: 'role' },
        // { text: 'Courses', value: 'courses' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      courseManagers: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        // studentId: '',
        fullName: '',
        email: '',
        // department: '',
        // role: '',
        // courses: '',
      },
      defaultItem: {
        id: 0,
        // studentId: '',
        fullName: '',
        email: '',
        // department: '',
        // role: '',
        // courses: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.courseManagers = [
          {
            id: 1,
            // studentId: 'ETS0000/11',
            fullName: 'John Doe Smith',
            email: 'johndoe@gmail.com',
            // department: 'Software Engineering',
            // role: 'Course Owner',
            // courses: "A",
          },
          {
            id: 2,
            // studentId: 'ETS0000/11',
            fullName: 'John Doe Smith',
            email: 'johndoe@gmail.com',
            department: 'Software Engineering',
            role: 'Course Owner',
            courses: "A",
          },
          {
            id: 3,
            // studentId: 'ETS0000/11',
            fullName: 'John Doe Smith',
            email: 'johndoe@gmail.com',
            // department: 'Software Engineering',
            // role: 'Course Owner',
            // courses: "A",
          },
          {
            id: 4,
            // studentId: 'ETS0000/11',
            fullName: 'John Doe Smith',
            email: 'johndoe@gmail.com',
            // department: 'Software Engineering',
            // role: 'Course Owner',
            // courses: "A",
          },
          {
            id: 5,
            // studentId: 'ETS0000/11',
            fullName: 'John Doe Smith',
            email: 'johndoe@gmail.com',
            // department: 'Software Engineering',
            // role: 'Course Owner',
            // courses: "A",
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.courseManagers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.courseManagers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.courseManagers.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.courseManagers[this.editedIndex], this.editedItem)
        } else {
          this.courseManagers.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>