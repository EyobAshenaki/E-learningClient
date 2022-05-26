<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="students"
      :search="search"
      sort-by="studentId"
      class="mt-5"
      style="height: 75vh"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <!-- <v-toolbar-title>Students</v-toolbar-title>
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
                Add New Student
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.id"
                        label="ID"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.studentId"
                        label="Student ID"
                        type="text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.firstName"
                        label="Fisrt Name"
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
                    <!-- <v-col cols="12" sm="6" md="4">
                      <v-text-field
                         v-model="editedItem.department"
                        label="Department"
                        type="text"
                      ></v-text-field>
                    </v-col> -->
                    <!-- <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.batch"
                        label="Batch"
                        type="number"
                      ></v-text-field>
                    </v-col> -->
                    <!-- <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.class"
                        label="Class"
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
      { text: 'Student ID', value: 'studentId' },
      { text: 'First Name', value: 'firstName' },
      { text: 'Middle Name', value: 'middleName' },
      { text: 'Last Name', value: 'lastName' },
      { text: 'E-mail', value: 'email' },
      // { text: 'Department', value: 'department' },
      // { text: 'Batch', value: 'batch' },
      // { text: 'Class', value: 'class' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    students: [],
    editedIndex: -1,
    editedItem: {
      dbId: null,
      studentId: null,
      firstName: null,
      middleName: null,
      lastName: null,
      email: null,
      // department: null,
      // batch: 0,
      // class: null,
    },
    defaultItem: {
      dbId: 0,
      studentId: null,
      firstName: null,
      middleName: null,
      lastName: null,
      email: null,
      // department: null,
      // batch: 0,
      // class: null,
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
      const query = `query studentclass($id: ID!) {
                        studentClass(id: $id) {
                          students{
                            dbId: id
                            firstName
                            middleName
                            lastName
                            email
                          }
                        }
                      }`
      // const variables = {id: }
      const studClassResponse = await this.$axios.post(
        'http://localhost:4000/graphql',
        { query }
      )
      if (studClassResponse.data.errors?.length) {
        console.log(studClassResponse.data.errors[0].message)
        throw new Error(studClassResponse.data.errors[0].message)
      }
      this.students = studClassResponse.data.data.studentClass.students

      this.students = this.students.map((clas, idx) => {
        return {
          ...clas,
          id: idx + 1,
        }
      })
    },

    editItem(item) {
      this.editedIndex = this.students.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.students.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.students.splice(this.editedIndex, 1)
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.students[this.editedIndex], this.editedItem)
      } else {
        this.students.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
