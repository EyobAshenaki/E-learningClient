<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template #activator="{ on, attrs }">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
        Add Student Account(s)
      </v-btn>
    </template>
    <v-card v-if="dialog" flat>
      <v-card-title class="primary--text"
        ><span class="text-h5">Add Student Account(s)</span></v-card-title
      >
      <v-container fluid>
        <v-radio-group v-model="selectedComponent" row mandatory>
          <v-radio label="Single Input" value="addStudentForm"></v-radio>
        </v-radio-group>
      </v-container>
      <component
        :is="selectedComponent"
        @close="dialog = false"
        @save="success"
      ></component>
    </v-card>
  </v-dialog>
</template>

<script>
  import addStudentForm from '../components/AddStudentFrom.vue'
  export default {
    components: {
      addStudentForm,
    },
    data() {
      return {
        selectedComponent: '',
        dialog: false,
      }
    },
    methods: {
      success() {
        this.dialog = false
        this.$emit('complete')
      },
    },
  }
</script>
