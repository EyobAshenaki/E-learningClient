<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="true"
    mini-variant-width="100"
    clipped
    app
    permanent
  >
    <v-list class="pa-0">
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        class="px-0"
        @click="goToRoute(item.title)"
      >
        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-list-item-icon class="py-2" v-bind="attrs" v-on="on">
              <v-icon size="30">{{ item.icon }}</v-icon>
            </v-list-item-icon>
          </template>
          <span>{{ item.title }}</span>
        </v-tooltip>

        <!-- <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content> -->
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'My Courses', icon: 'mdi-bookshelf' },
        { title: 'Assignments', icon: 'mdi-note-edit' },
        { title: 'Quizzes', icon: 'mdi-text-box-check' },
        { title: 'Calendar', icon: 'mdi-calendar-month' },
      ],
      mini: true,
    }
  },
  watch: {},
  methods: {
    goToRoute(name) {
      if (name === 'Dashboard') {
        console.log(this.$router)
        this.$router.push('dashboardPage')
      } else if (name === 'My Courses') {
        this.$router.push('coursesPage')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
