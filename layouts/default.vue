<template>
  <v-app>
    <slot name="nav">
      <AppNav />
    </slot>
    <v-main>
      <v-container class="main-container" fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <ToastSnackbar />
  </v-app>
</template>
