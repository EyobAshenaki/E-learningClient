<template>
  <v-col cols="12">
    <v-select
      v-model="accountRoles"
      required
      label="Roles"
      multiple
      :items="roleItems"
    />
  </v-col>
</template>

<script>
  export default {
    props: {
      roles: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        roleItems: ['DEV', 'ADMINISTRATOR', 'STUDENT'],
        accountRoles: this.roles.map((role) => role.name),
      }
    },
  }
</script>