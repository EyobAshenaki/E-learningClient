<template>
  <v-row class="ma-auto mt-8">
    <v-card flat width="100%">
      <v-tabs
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        v-model="tabs"
        background-color="transparent"
        color="blue"
      >
        <v-tab show-arrows v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <AdminTeachersTeachers />
        </v-tab-item>
        <v-tab-item>
          <AdminStudentsStudents />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    tabs: null,
    items: ['Teachers', 'Students'],
  }),
}
</script>
