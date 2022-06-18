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
              name: 'student-id',
              params: { id: this.$nuxt.context.params.id },
            },
          },
          {
            title: 'My Courses',
            icon: 'mdi-bookshelf',
            route: {
              name: 'student-id-courses',
              params: { id: this.$nuxt.context.params.id },
            },
          },
          {
            title: 'Assignments',
            icon: 'mdi-note-edit',
            route: {
              name: 'student-id-assignments',
              params: { id: this.$nuxt.context.params.id },
            },
          },
          {
            title: 'Quizzes',
            icon: 'mdi-text-box-check',
            route: {
              name: 'student-id-quizzes',
              params: { id: this.$nuxt.context.params.id },
            },
          },
          // {
          //   title: 'Calendar',
          //   icon: 'mdi-calendar-month',
          //   route: {
          //     name: 'student-id-calendar',
          //     params: { id: this.$nuxt.context.params.id },
          //   },
          // },
        ],
      }
    },
  }
</script>
