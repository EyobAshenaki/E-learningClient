<template>
  <v-row>
    <v-col>
      <v-data-table
        :headers="headers"
        :items="classes"
        :search="search"
        sort-by="id"
        class="mt-5"
        style="height: 75vh"
      >
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>All Classes</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="28%">
              <template #activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  outlined
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
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
                      <v-col class="pa-0" cols="12">
                        <v-text-field
                          v-model="editedItem.section"
                          label="Section"
                          type="text"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col class="pa-0" cols="12">
                        <v-text-field
                          v-model="editedItem.year"
                          label="Year"
                          type="number"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col class="pa-0" cols="12">
                        <v-select
                          v-model="editedItem.department"
                          :items="departments"
                          item-text="name"
                          :menu-props="{ bottom: true, offsetY: true }"
                          label="Department"
                          outlined
                          return-object
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
                <v-card-title class="text-h5">
                  {{
                    !studentNone ? 'This class has enrolled students. ' : ''
                  }}Are you sure you want to delete this item?
                </v-card-title>
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
        <template #[`item.department`]="{ item }">
          {{ item.department.name }}
        </template>
        <template #[`item.actions`]="{ item }">
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                class="mr-2"
                size="23"
                v-on="on"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Edit</span>
          </v-tooltip>
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                class="mr-2"
                size="23"
                v-on="on"
                @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
            </template>
            <span>Delete</span>
          </v-tooltip>
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                :to="`${$route.path}/${item.dbId}/students`"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon size="23"> mdi-account-group </v-icon>
              </v-btn>
            </template>
            <span>Students</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    layout: 'departmentAdmin',
    data: () => ({
      search: '',
      dialog: false,
      dialogDelete: false,
      studentNone: true,
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
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      departments: [],
      classes: [],
      editedIndex: -1,
      editedItem: {
        dbId: null,
        section: '',
        year: null,
        department: null,
      },
      defaultItem: {
        dbId: null,
        section: '',
        year: null,
        department: null,
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

        const studClassResponse = await this.$axios.post('/graphql', { query })

        if (studClassResponse.data.errors?.length) {
          throw new Error(studClassResponse.data.errors[0].message)
        }

        this.classes = studClassResponse.data.data.studentClasses

        const queryDep = `query dep {
                                            departments {
                                              id
                                              name
                                            }
                                          }`

        const depsResponse = await this.$axios.post('/graphql', {
          query: queryDep,
        })

        if (depsResponse.data.errors?.length) {
          throw new Error(depsResponse.data.errors[0].message)
        }

        this.departments = [...depsResponse.data.data.departments]

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

      async deleteItemConfirm() {
        const query = `mutation removeclass($id: ID!, $removeStudents: Boolean) {
                                          deleteStudentClass(id: $id, removeStudents: $removeStudents)
                                        }`

        const variables = { id: this.editedItem.dbId, removeStudents: true }

        const deletedClass = await this.$axios.post('/graphql', {
          query,
          variables,
        })

        if (deletedClass.data.errors?.length) {
          throw new Error(deletedClass.data.errors[0].message)
        }

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
          // Update Class
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
            // department: this.editedItem.department,
          }

          const editedClass = await this.$axios.post('/graphql', {
            query,
            variables,
          })

          if (editedClass.data.errors?.length) {
            throw new Error(editedClass.data.errors[0].message)
          }

          Object.assign(this.classes[this.editedIndex], this.editedItem)
        } else {
          // Create Class
          const query = `mutation cc($year: String!, $section: String!, $departmentId: ID!) {
                                            createStudentClass(
                                              createStudentClassInput: { year: $year, section: $section, departmentId: $departmentId}
                                            ) {
                                              dbId: id
                                              year
                                              section
                                              department {
                                                name
                                              }
                                            }
                                          }`

          const variables = {
            year: this.editedItem.year,
            section: this.editedItem.section,
            departmentId: this.editedItem.department.id,
          }

          const newClass = await this.$axios.post('/graphql', {
            query,
            variables,
          })

          if (newClass.data.errors?.length) {
            throw new Error(newClass.data.errors[0].message)
          }

          this.initialize()
        }
        this.close()
      },
    },
  }
</script>
