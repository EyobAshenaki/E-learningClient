<template>
  <v-row>
    <v-col cols="12" class="pb-0">
      <v-banner single-line>
        <h2>Current Courses</h2>

        <template #actions>
          <v-btn text> View all </v-btn>
        </template>
      </v-banner>
    </v-col>
    <v-col cols="12" class="pt-0">
      <v-sheet class="pt-0" height="42vh" elevation="0">
        <v-slide-group
          v-model="courseSlideGroup"
          class="py-2"
          center-active
          show-arrows
        >
          <v-slide-item v-for="n in 15" :key="n" v-slot="{ active, toggle }">
            <v-card
              :class="active ? 'elevation-15 mx-5 mb-5' : 'ma-2'"
              class="pa-1 rounded-lg"
              height="270"
              width="300"
              @click="toggle"
            >
              <v-row class="fill-height" align="center" justify="center">
                <v-col cols="12">
                  <v-row
                    align="center"
                    style="max-width: 280px"
                    class="ma-0 ml-3 mt-3"
                  >
                    <v-col cols="3" class="pa-0">
                      <v-avatar
                        color="warning lighten-2"
                        class="rounded-lg"
                        rounded
                        size="60"
                      ></v-avatar>
                    </v-col>
                    <v-col cols="9" class="pa-0 pr-2">
                      <p class="mb-2">Database Design</p>
                      <v-icon>mdi-account</v-icon>Eyob Aschenaki
                    </v-col>
                  </v-row>
                </v-col>

                <v-divider class="mx-3 mt-n5"></v-divider>

                <v-col cols="12" class="pa-0 ml-12 mb-3">
                  <v-row
                    align="center"
                    justify="center"
                    style="max-width: 280px"
                    class="ma-0"
                  >
                    <v-col cols="6" class="pa-0 mb-5">
                      <v-icon>mdi-bookshelf</v-icon>sw132
                    </v-col>
                    <v-col cols="6" class="pa-0 mb-5">
                      <v-icon>mdi-book</v-icon> 3 credit
                    </v-col>
                    <v-col cols="6" class="pa-0">
                      <v-icon>mdi-book-open-variant</v-icon> 8 chapters
                    </v-col>
                    <v-col cols="6" class="pa-0">
                      <v-icon>mdi-timer-outline</v-icon> 3 Hours/Week
                    </v-col>
                  </v-row>
                </v-col>
                <v-btn text class="mb-n2">View Course</v-btn>
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </v-col>
    <v-col cols="7">
      <v-row>
        <v-col cols="12">
          <v-banner single-line>
            <h3>February 2022</h3>

            <template #actions>
              <v-btn fab x-small elevation="5">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn fab x-small elevation="5">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </template>
          </v-banner>
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-slide-group
            v-model="activitySlideGroup"
            class="py-2"
            center-active
            show-arrows
          >
            <v-slide-item v-for="n in 15" :key="n" v-slot="{ active, toggle }">
              <v-card
                :class="active ? 'text--primary' : 'text--black'"
                class="mx-2 border-radius-1"
                height="50"
                width="50"
                outlined
                @click="toggle"
              >
                <v-card-text
                  class="fill-height pa-0 d-flex align-center justify-center"
                >
                  <h3>{{ n }}</h3>
                </v-card-text>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-col>
        <v-col cols="12">
          <v-list>
            <v-list-item
              v-for="n in 2"
              :key="n"
              class="grey lighten-3 ma-2 border-radius-1"
            >
              <v-list-item-content
                class="justify-center"
                style="max-width: 60px"
              >
                <v-card
                  height="50"
                  max-width="50"
                  outlined
                  class="border-radius-1"
                >
                  <v-card-text
                    class="fill-height pa-0 d-flex align-center justify-center"
                  >
                    <h3>DB</h3>
                  </v-card-text>
                </v-card>
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-title class="text-center">
                  Database Design
                </v-list-item-title>

                <v-list-item-subtitle class="text-center"
                  >Aster Muleta</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-title class="text-center">
                  Assignment-2
                </v-list-item-title>

                <v-list-item-subtitle class="text-center">
                  out of 20
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-information</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <div class="blur">
            <v-btn class="quiz-btn"> View all</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="5">
      <h2 class="mt-3">Overview</h2>
      <v-row justify="center" align="center" style="height: 17em">
        <v-col cols="6">
          <v-card elevation="10" class="border-radius-1">
            <v-card-title class="pb-0">Courses in progress</v-card-title>

            <v-row class="pa-4">
              <v-col cols="5" class="ml-auto">
                <h1>02</h1>
              </v-col>
              <v-col cols="5" class="ml-auto">
                <v-icon size="50">mdi-progress-clock</v-icon>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card elevation="10" class="border-radius-1">
            <v-card-title class="pb-0">Completed courses</v-card-title>

            <v-row class="pa-4" justify="center" align="center">
              <v-col cols="5" class="ml-auto">
                <h1>07</h1>
              </v-col>
              <v-col cols="5" class="ml-auto">
                <v-icon size="50">mdi-progress-check</v-icon>
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
  layout: 'student',

  data() {
    return {
      courseSlideGroup: null,
      activitySlideGroup: null,
    }
  },
}
</script>

<style scoped>
/* .dashed {
  border: dashed black 1px;
}

.solid {
  border: solid black 1px;
} */

.half-fullheight {
  position: relative;
  max-height: 41vh;
  overflow: hidden;
}

.blur {
  /* border: dashed black 1px; */
  margin-top: -3em;
  margin-left: -0.2em;
  position: relative;
  height: 55px;
  width: 102%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    rgb(255 255 255 / 0%),
    rgb(255 255 255 / 95%),
    rgb(255 255 255 / 100%)
  );
}

.border-radius-1 {
  border-radius: 0.7em;
}
</style>
