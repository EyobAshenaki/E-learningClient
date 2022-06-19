<template>
  <v-select v-model="role" v-bind="$attrs" :items="roles" outlined label="Select Role" @change="update"></v-select>
</template>

<script>
  export default {
    model: {
      prop: 'roleInput',
      event: 'selected',
    },
    props: {
      roleInput: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        role: '',
        roles: [
          'ADMINISTRATOR',
          'TEACHER',
          'STUDENT',
          'COURSE_MANAGER',
          'DEPARTMENT_ADMINISTRATOR',
        ],
      }
    },
    methods: {
      update() {
        this.$emit('selected', this.role)
      },
    },
  }
</script>