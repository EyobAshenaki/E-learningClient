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
        @click="changePage(item.title)"
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
      ],
      mini: true,
    }
  },
  watch: {},
  methods: {
    changePage(name) {
      if (name === 'Dashboard') {
        this.$router.push({ name: 'courseManager-id', params: { id: 1 } })
      } else if (name === 'My Courses') {
        this.$router.push({
          name: 'courseManager-id-courses',
          params: { id: 1 },
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
