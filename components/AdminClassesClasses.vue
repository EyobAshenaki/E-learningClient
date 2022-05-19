<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="classes"
      :search="search"
      sort-by="id"
      class="mt-5"
      style="height: 75vh"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <!-- <v-toolbar-title>All Classes</v-toolbar-title>
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
                Add New Class
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
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.section"
                        label="Section"
                        type="text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.year"
                        label="Year"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.department"
                        label="Department"
                        type="text"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                       v-model="editedItem.protein" -->
                    <!-- label="Protein (g)"
                    </v-text-field>
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
        <v-icon small class="mr-2" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
        <NuxtLink to="/administrator/_id/student">
          <v-icon small> mdi-account-group </v-icon>
        </NuxtLink>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
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
      { text: 'Section', value: 'section', sortable: false },
      { text: 'Year', value: 'year', sortable: false },
      { text: 'Department', value: 'department', sortable: false },
      // // { text: 'Protein (g)', value: 'protein' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    classes: [],
    editedIndex: -1,
    editedItem: {
      dbId: null,
      section: '',
      year: null,
      department: null,
      // protein: 0,
    },
    defaultItem: {
      dbId: null,
      section: '',
      year: null,
      department: null,
      // protein: 0,
    },
  }),

  computed: {
    // ...mapState(['studentToggle']),
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
    // ...mapActions(['viewStudents']),
    async initialize() {
      const query = `query class {
                        studentClasses {
                          dbId: id
                          year
                          section
                          department {
                            name
                          }
                        }
                      }`
      const studClassResponse = await this.$axios.post(
        'http://localhost:4000/graphql',
        { query }
      )
      if (studClassResponse.data.errors?.length) {
        console.log(studClassResponse.data.errors[0].message)
        throw new Error(studClassResponse.data.errors[0].message)
      }
      this.classes = studClassResponse.data.data.studentClasses
      // this.classes = [
      //   {
      //     id: 1,
      //     section: 'A',
      //     year: 5,
      //     department: '24',
      //     // protein: 4.0,
      //   },
      //   {
      //     id: 2,
      //     section: 'B',
      //     year: 4,
      //     department: 37,
      //     // protein: 4.3,
      //   },
      //   {
      //     id: 3,
      //     section: 'C',
      //     year: 1,
      //     department: '23',
      //     // protein: 6.0,
      //   },
      //   {
      //     id: 4,
      //     section: 'D',
      //     year: 3,
      //     department: '67',
      //     // protein: 4.3,
      //   },
      //   {
      //     id: 5,
      //     section: 'E',
      //     year: 2,
      //     department: '49',
      //     // protein: 3.9,
      //   },
      // ]
      this.classes = this.classes.map((clas, idx) => {
        return {
          ...clas,
          id: idx + 1,
        }
      })
    },

    editItem(item) {
      this.editedIndex = this.classes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.classes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.classes.splice(this.editedIndex, 1)
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
        const query = `mutation uc($id: ID!, $year: String!, $section: String!) {
                          updateStudentClass(
                            updateStudentClassInput: { id: $id, year: $year, section: $section }
                          ) {
                            dbId: id
                            year
                            section
                          }
                        }`
        const variables = {
          id: this.editedItem.dbId,
          year: this.editedItem.year,
          section: this.editedItem.section,
        }
        const editedClass = await this.$axios.post(
          'http://localhost:4000/graphql',
          { query, variables }
        )
        if (editedClass.data.errors?.length) {
          console.log(editedClass.data.errors[0].message)
          throw new Error(editedClass.data.errors[0].message)
        }
        Object.assign(this.classes[this.editedIndex], this.editedItem)
      } else {
        const query = `mutation cc($year: String!, $section: String!) {
                          createStudentClass(
                            createStudentClassInput: { year: $year, section: $section }
                          ) {
                            dbId: id
                            year
                            section
                          }
                        }`
        const variables = {
          year: this.editedItem.year,
          section: this.editedItem.section,
        }
        const newClass = await this.$axios.post(
          'http://localhost:4000/graphql',
          { query, variables }
        )
        if (newClass.data.errors?.length) {
          console.log(newClass.data.errors[0].message)
          throw new Error(newClass.data.errors[0].message)
        }
        this.classes.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
