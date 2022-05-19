<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="11" class="mt-10">
        <div class="blue--text">
          <v-breadcrumbs :items="items"></v-breadcrumbs>
        </div>
        <AdminTableTabs />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: 'administrator',
  name: 'StudentIndexPage',
  data: () => ({
    items: [
      {
        text: 'All Users',
      },
    ],
  }),
}
</script>
