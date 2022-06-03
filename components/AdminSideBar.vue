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
            route: '/administrator',
          },
          {
            title: 'All Users',
            icon: 'mdi-account',
            route: '/administrator/users',
          },
          {
            title: 'Students',
            icon: 'mdi-bookshelf',
            route: '/administrator/students',
          },
          { title: 'Teachers', icon: 'mdi-note-edit', route: 'teachers' },
          {
            title: 'Course Managers',
            icon: 'mdi-text-box-check',
            route: 'course-managers',
          },
          { title: 'Administrators', icon: 'mdi-calendar-month' },
          { title: 'Department Administrators', icon: 'mdi-calendar-month' },
        ],
      }
    },
  }
</script>