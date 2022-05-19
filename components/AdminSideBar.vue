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
        { title: 'All Users', icon: 'mdi-account' },
        // { title: 'Students', icon: 'mdi-bookshelf' },
        // { title: 'Teachers', icon: 'mdi-note-edit' },
        // { title: 'Course Managers', icon: 'mdi-text-box-check' },
        // { title: 'Administrators', icon: 'mdi-calendar-month' },
        // { title: 'Department Administrators', icon: 'mdi-calendar-month' },
      ],
      mini: true,
    }
  },
  watch: {},
  methods: {
    goToRoute(name) {
      if (name === 'Dashboard') {
        console.log(this.$router)
        this.$router.push('/administrator/_id')
      } else if (name === 'All Users') {
        this.$router.push('/administrator/_id/allAccounts')
      }
      // else if (name === 'Students') {
      //   this.$router.push('/administrator/_id/student')
      // }
      // else if (name === 'Teachers') {
      //   this.$router.push('/administrator/_id/teacher')
      // } else if (name === 'Course Managers') {
      //   this.$router.push('/administrator/_id/courseManager')
      // } else if (name === 'Administrators') {
      //   this.$router.push('/administrator/_id/admin')
      // } else if (name === 'Department Administrators') {
      //   this.$router.push('/administrator/_id/depAdmin')
      // }
    },
  },
}
</script>

<style lang="scss" scoped></style>
