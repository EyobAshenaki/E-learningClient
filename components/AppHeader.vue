<template>
  <v-app-bar color="primary lighten-1" clipped-left dark app>
    <v-app-bar-title>Capstone E-learning Platform</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-menu left bottom>
      <template #activator="{ on, attrs }">
        <!-- Todo: This Button will be changed to an avatar down the line which contains the users photo -->
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="n in 5" :key="n" @click="() => {}">
          <v-list-item-title>Option {{ n }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
