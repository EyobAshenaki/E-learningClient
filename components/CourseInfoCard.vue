<template>
  <v-card elevation="0">
    <v-card-text>
      <v-row>
        <v-col cols="3" class="d-flex justify-end align-center">
          <v-avatar size="70" color="orange lighten-4">
            <v-icon size="40" color="orange darken-2">mdi-book</v-icon>
          </v-avatar>
        </v-col>

        <v-col cols="9">
          <v-row>
            <v-col class="pa-2 pb-0" cols="12">
              <v-card-title class="pa-0">
                {{ course.name }}
              </v-card-title>
            </v-col>
            <!-- Card Body section -->
            <v-col class="py-5" cols="12">
              <v-row>
                <!-- First dection -->
                <v-col cols="6">
                  <v-row>
                    <v-col
                      class="pa-1 d-flex align-center justify-center"
                      cols="4"
                    >
                      <v-icon size="28" color="orange darken-2">
                        mdi-clipboard-text-outline
                      </v-icon>
                    </v-col>
                    <v-col class="pa-2 d-flex align-center" cols="8">
                      <v-row class="pl-1">
                        <v-col class="pa-0" cols="12">
                          <span class="text-subtitle-1 font-weight-bold">
                            Course code
                          </span>
                        </v-col>
                        <v-col class="pa-0 mt-n1" cols="12">
                          <span>
                            {{ course.code }}
                          </span>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>

                <!-- Secondary section -->
                <v-col cols="6">
                  <v-row>
                    <v-col
                      class="pa-1 d-flex align-center justify-center"
                      cols="4"
                    >
                      <v-icon size="28" color="orange darken-2">
                        mdi-timer-outline
                      </v-icon>
                    </v-col>
                    <v-col class="pa-2 d-flex align-center" cols="8">
                      <v-row class="pl-1">
                        <v-col class="pa-0" cols="12">
                          <span class="text-subtitle-1 font-weight-bold">
                            Credit Hour
                          </span>
                        </v-col>
                        <v-col class="pa-0 mt-n1" cols="12">
                          <span>
                            {{ course.creditHour }}
                          </span>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
}
</script>
