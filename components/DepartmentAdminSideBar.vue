<template>
  <v-navigation-drawer v-model="drawer" clipped app permanent>
    <v-list>
      <v-tooltip v-for="item in items" :key="item.title" right>
        <template #activator="{ on, attrs }">
          <v-list-item v-bind="attrs" exact nuxt :to="item.route" v-on="on">
            <v-list-item-icon>
              <v-icon size="30">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <span>{{ item.description || item.title }}</span>
      </v-tooltip>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard',
          route: {
            name: 'departmentAdministrator-id',
            params: { id: this.$nuxt.context.params.id },
          },
        },
        {
          title: 'Classes',
          icon: 'mdi-home-city',
          route: {
            name: 'departmentAdministrator-id-classes',
            params: { id: this.$nuxt.context.params.id },
          },
        },
        {
          title: 'Students',
          icon: 'mdi-account-group-outline',
          route: {
            name: 'departmentAdministrator-id-students',
            params: { id: this.$nuxt.context.params.id },
          },
        },
      ],
    }
  },
}
</script>
