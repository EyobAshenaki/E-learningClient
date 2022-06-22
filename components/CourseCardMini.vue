<template>
  <!-- todo! complete course details on this page -->
  <!-- todo! complete tooltips for all icon-based buttons -->
  <v-card elevation="6">
    <v-row>
      <!-- Course card head section -->
      <v-col cols="12">
        <v-row>
          <v-col cols="3" class="d-flex justify-center align-center">
            <v-avatar size="90" color="grey lighten-3">
              <v-icon size="60" color="#25327F">mdi-book-open-outline</v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="9">
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-card-title style="word-break: break-word" class="px-0">{{
                  course.name
                }}</v-card-title>
                <v-card-subtitle class="px-0 pb-0">{{
                  course.code
                }}</v-card-subtitle>
              </v-col>
              <!-- Course Button Group -->
              <v-col cols="12" class="p-0">
                <v-btn-toggle>
                  <v-btn
                    nuxt
                    :to="`${$route.path}/${course.id}/course-documents`"
                  >
                    <!-- todo tooltip -->
                    <!-- @click="assignCourseTeacher(course.id)"
                    @mouseenter="assignEnter($event)"
                    @mouseleave="leaveBtn()"
                  > -->
                    <v-icon color="orange darken-4">mdi-file-upload</v-icon>
                  </v-btn>
                  <v-btn nuxt :to="`${$route.path}/${course.id}/addQuiz`">
                    <!-- todo tooltip -->
                    <!-- @click="assignCourseTeacher(course.id)"
                    @mouseenter="assignEnter($event)"
                    @mouseleave="leaveBtn()"
                  > -->
                    <v-icon color="#25327F">mdi-text-box-plus</v-icon>
                  </v-btn>
                  <v-btn
                    nuxt
                    :to="`${$route.path}/${course.id}/assignments`">
                    <!-- todo tooltip -->
                    <!-- @click="assignCourseTeacher(course.id)"
                    @mouseenter="assignEnter($event)"
                    @mouseleave="leaveBtn()"
                  > -->
                    <v-icon color="amber darken-3"
                      >mdi-clipboard-text-clock</v-icon
                    >
                  </v-btn>
                </v-btn-toggle>

                <!-- Button group Tooltips -->
                <v-tooltip
                  v-model="showTooltip"
                  top
                  open-delay="1000"
                  close-delay="1000"
                  :nudge-right="tooltipPositionX"
                  :nudge-bottom="tooltipPositionY"
                >
                  {{ tooltipText }}
                </v-tooltip>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider class="mt-5 mx-6"></v-divider>
      </v-col>

      <!-- todo course details -->
      <!-- Course card body section -->
      <!-- <v-col cols="12">
        <v-row class="mx-1 d-flex justify-space-around">
          <!- <v-spacer></v-spacer> --

          <v-col cols="5" class="pt-0">
            <v-list-item class="px-0">
              <v-list-item-avatar color="grey lighFten-3">
                <v-icon color="#25327F"
                  >mdi-book-open-page-variant-outline</v-icon
                >
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ course.chapters.length }}
                </v-list-item-title>
                <v-list-item-subtitle> Chapters </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="5" class="pt-0 px-0">
            <v-list-item class="px-0">
              <v-list-item-avatar color="grey lighten-3">
                <v-icon color="#25327F">mdi-timer-outline</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ course.creditHour }}
                </v-list-item-title>
                <v-list-item-subtitle> Credit Hour </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-col> -->
    </v-row>
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
    data() {
      return {
        tooltipValue: '',
        showTooltip: false,
        tooltipPositionX: null,
        tooltipPositionY: null,
      }
    },
    computed: {
      tooltipText() {
        if (this.tooltipValue === 'assign') return 'Assign Teacher'
        else if (this.tooltipValue === 'edit') return 'Edit Course'
        else if (this.tooltipValue === 'delete') return 'Delete Course'
        else return null
      },
    },
  }
</script>
