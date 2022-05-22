<template>
  <v-row style="margin-top: 2em">
    <v-col cols="8">
      <v-row>
        <!-- Welcome section -->
        <v-col cols="12">
          <v-card height="250" elevation="0" color="grey lighten-4">
            <v-row style="height: 100%">
              <v-col
                cols="6"
                class="d-flex align-center justify-center"
                style="height: 100%"
              >
                <v-row class="d-flex justify-end">
                  <v-col cols="11" class="py-0">
                    <p class="mb-0 text-h3 text-left font-weight-light">
                      Welcome Back,
                    </p>
                  </v-col>
                  <v-col cols="11" class="py-0">
                    <p
                      class="orange--text text--darken-4 text-h4 text-left font-weight-medium"
                    >
                      Adem
                    </p>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <img
                  style="height: 120%; margin-top: -3.3em"
                  src="../../../assets/img/tourist-welcome.svg"
                  alt=""
                />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <!-- Courses section -->
        <v-col cols="12" class="mt-15">
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col cols="3" class="text-h5 d-flex align-center"
                  >Courses</v-col
                >
                <v-spacer></v-spacer>
                <v-col cols="4" class="d-flex justify-end">
                  <v-btn text color="orange darken-4">
                    <v-icon>mdi-plus</v-icon>
                    Create Course
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col v-for="n in 5" :key="n" cols="6" class="mt-5">
              <v-card elevation="6">
                <v-row>
                  <!-- Course card head section -->
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="4" class="d-flex justify-center">
                        <v-avatar size="80" color="grey lighten-3">
                          <v-icon size="50" color="#25327F"
                            >mdi-book-open-outline</v-icon
                          >
                        </v-avatar>
                      </v-col>
                      <v-col cols="6">
                        <v-card-title class="px-0"
                          >Datatbase Design</v-card-title
                        >
                        <v-card-subtitle class="px-0 pb-0"
                          >sweg4052</v-card-subtitle
                        >
                      </v-col>
                      <v-col cols="2" class="d-flex justify-center align-start">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-col>
                    </v-row>
                  </v-col>
                  <!-- Course card body section -->
                  <v-col cols="12">
                    <v-row class="mx-1">
                      <v-spacer></v-spacer>
                      <v-col cols="5" class="pt-0">
                        <v-list-item class="px-0">
                          <v-list-item-avatar color="grey lighten-3">
                            <v-icon color="#25327F"
                              >mdi-book-open-page-variant-outline</v-icon
                            >
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>8</v-list-item-title>
                            <v-list-item-subtitle>
                              Chapters
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                      <v-col cols="5" class="pt-0 px-0">
                        <v-list-item class="px-0">
                          <v-list-item-avatar color="grey lighten-3">
                            <v-icon color="#25327F">mdi-folder</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>3</v-list-item-title>
                            <v-list-item-subtitle>
                              Credit Hour
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <!-- Teacher section -->
    <v-col cols="4">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="6" class="text-h5 d-flex align-center">
              Teachers
            </v-col>
            <v-col cols="6" class="d-flex justify-end">
              <v-btn text color="orange darken-4">View all</v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col v-for="n in 10" :key="n" cols="12" class="py-1">
          <v-card outlined class="py-3">
            <v-row>
              <v-col cols="4" class="pr-0 d-flex justify-end">
                <v-avatar size="80" color="grey lighten-3">
                  <v-icon size="50" color="#25327F">mdi-account-outline</v-icon>
                </v-avatar>
              </v-col>
              <v-col>
                <v-card-title>Betel Desalegn</v-card-title>
                <v-card-subtitle>Software enginnering</v-card-subtitle>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'courseManager',
}
</script>
