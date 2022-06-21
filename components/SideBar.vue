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
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        drawer: false,
      }
    },
  }
</script>