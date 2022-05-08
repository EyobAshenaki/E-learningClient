<template>
  <v-row class="dashed">
    <v-col cols="8" class="solid">
      <v-row class="dashed">
        <v-col cols="12" class="solid">
          <h2>Recent Courses</h2>

          <v-sheet class="" style="height: 44vh" elevation="0">
            <v-slide-group
              v-model="model"
              class="py-5"
              center-active
              show-arrows
            >
              <v-slide-item
                v-for="n in 15"
                :key="n"
                v-slot="{ active, toggle }"
              >
                <v-card
                  :class="active ? 'mx-2 mb-5' : 'ma-2'"
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

        <v-col cols="12" class="solid">
          Todays Activities

          <v-list>
            <v-list-item v-for="n in 3" :key="n" class="dashed mb-2">
              <v-list-item-icon>
                <v-icon>mdi-book-open-page-variant-outline</v-icon>
              </v-list-item-icon>

              <v-list-item-title>Database Design</v-list-item-title>

              <v-list-item-subtitle>Quiz</v-list-item-subtitle>

              <v-list-item-subtitle>Aster Muleta</v-list-item-subtitle>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="4" class="solid">
      <v-row class="dashed">
        <v-col cols="12" class="solid">
          <v-card class="half-fullheight pt-0" elevation="0">
            <v-card-title primary-title class="justify-center pb-0">
              Quiz
            </v-card-title>
            <v-list>
              <template v-for="(n, idx) in 4">
                <v-list-item :key="idx" class="mx-3">
                  <v-list-item-content>
                    <v-list-item-title>Quiz 1</v-list-item-title>
                    <v-list-item-subtitle>Database Design</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-card elevation="0"> 9/10 </v-card>
                </v-list-item>
                <v-divider :key="idx" class="mx-4"></v-divider>
              </template>
            </v-list>
          </v-card>
          <div class="blur">
            <v-btn class="quiz-btn"> View all Quizzes</v-btn>
          </div>
        </v-col>

        <v-col cols="12" class="solid">
          <v-card class="half-fullheight pt-0" elevation="0">
            <v-card-title primary-title class="justify-center pb-0">
              Assignments
            </v-card-title>
            <v-list>
              <template v-for="(n, idx) in 4">
                <v-list-item :key="idx" class="mx-3">
                  <v-list-item-content>
                    <v-list-item-title>Assignment 1</v-list-item-title>
                    <v-list-item-subtitle>Database Design</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-card elevation="0"> 9/15 </v-card>
                </v-list-item>
                <v-divider :key="idx" class="mx-4"></v-divider>
              </template>
            </v-list>
          </v-card>
          <div class="blur">
            <v-btn class="assignment-btn"> View all Assignments</v-btn>
          </div>
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
      model: null,
    }
  },
}
</script>

<style scoped>
.dashed {
  /* border: dashed black 1px; */
}

.solid {
  /* border: solid black 1px; */
}

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
</style>
