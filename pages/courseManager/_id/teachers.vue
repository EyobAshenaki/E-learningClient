<template>
  <v-row>
    <v-col v-for="n in 6" :key="n" cols="4" class="mt-5">
      <v-card>
        <v-row class="py-4">
          <!-- Teacher card head section -->
          <v-col cols="12">
            <v-row>
              <v-col cols="4" class="d-flex justify-end">
                <v-avatar size="90" color="grey lighten-3">
                  <v-icon size="70" color="#25327F">mdi-account-outline</v-icon>
                </v-avatar>
              </v-col>
              <v-col cols="8">
                <v-card-title class="pa-0">Muleta Tamriu</v-card-title>
                <v-card-subtitle class="pa-0 py-3"
                  >tamirumuletal45@gmail.com</v-card-subtitle
                >
                <v-chip color="blue darken-2" dark> Course Owner </v-chip>
              </v-col>
            </v-row>
          </v-col>
          <!-- Teacher card body section -->
          <v-col cols="12">
            <v-row justify="center">
              <v-col cols="10" class="pa-0">
                <v-list-item class="px-0">
                  <v-list-item-avatar color="grey lighten-3">
                    <v-icon color="#25327F">mdi-collage</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>Software Enginnering</v-list-item-title>
                    <v-list-item-subtitle> Department </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="5" class="pa-0">
                <v-list-item class="px-0">
                  <v-list-item-avatar color="grey lighten-3">
                    <v-icon color="#25327F">mdi-book-multiple-outline</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>2</v-list-item-title>
                    <v-list-item-subtitle> Courses </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="5" class="pa-0">
                <v-list-item class="px-0">
                  <v-list-item-avatar color="grey lighten-3">
                    <v-icon color="#25327F">mdi-home-city-outline</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>4</v-list-item-title>
                    <v-list-item-subtitle> Classes </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'courseManager',
  data() {
    return {}
  },
}
</script>
