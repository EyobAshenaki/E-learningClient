<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    mini-variant-width="100"
    clipped
    app
    permanent
  >
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-btn depressed>
            <v-icon medium>{{ item.icon }}</v-icon>
          </v-btn>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
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
        { title: 'Classes', icon: 'mdi-home-city' },
        { title: 'Students', icon: 'mdi-account-group-outline' },
      ],
      mini: true,
    }
  },
}
</script>

<style lang="scss" scoped></style>
