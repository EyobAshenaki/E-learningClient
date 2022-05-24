<template>
  <v-row>
    <v-col cols="12"> <span class="text-h4">Edit Course</span> </v-col>
    <v-col cols="8" class="mb-16">
      <v-row>
        <v-col cols="12">
          <v-banner single-line class="">
            <span class="text-h5">Basic Information</span>
            <template #actions>
              <v-btn outlined color="error">
                <v-icon class="pr-1">mdi-delete</v-icon> Delete
              </v-btn>
              <v-btn outlined color="#25327F">
                <v-icon class="pr-1">mdi-content-save</v-icon>
                Save
              </v-btn>
            </template>
          </v-banner>
        </v-col>

        <v-col cols="12" class="pb-0">
          <span class="text-h6 font-weight-regular">Course Title</span>
        </v-col>

        <v-col cols="12" class="pb-0">
          <v-text-field
            v-model="course.name"
            class="text-h5"
            solo
            height="70"
          ></v-text-field>
        </v-col>

        <v-col cols="6" class="py-0">
          <span class="text-h6 font-weight-regular">Course code</span>
        </v-col>
        <v-col cols="6" class="py-0">
          <span class="text-h6 font-weight-regular">Course Credit Hour</span>
        </v-col>

        <v-col cols="6" class="pb-0">
          <v-text-field
            v-model="course.code"
            class="text-h5"
            solo
            height="50"
          ></v-text-field>
        </v-col>

        <v-col cols="6" class="pb-0">
          <v-text-field
            v-model="course.creditHour"
            class="text-h5"
            solo
            height="50"
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="py-0">
          <span class="text-h6 font-weight-regular">Description</span>
        </v-col>

        <v-col cols="12" class="pb-0">
          <v-textarea
            v-model="course.description"
            class="text-subtitle-1 pa-0 z"
            auto-grow
            row-height="40"
            solo
          ></v-textarea>
        </v-col>

        <v-col cols="12" class="pt-0">
          <v-banner single-line class="">
            <span class="text-h5">Specific Information</span>
          </v-banner>
        </v-col>

        <v-col class="12">
          <v-expansion-panels :value="[0]" readonly multiple>
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-regular text-h6">
                Overview
              </v-expansion-panel-header>
              <v-expansion-panel-content
                class="pa-6 pt-0"
                v-text="course.overview"
              ></v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>

        <v-col cols="12" class="pb-0 d-flex justify-space-between">
          <span class="text-h5 font-weight-regular">Chapters</span>
          <v-btn
            outlined
            large
            class="text-body-1 font-weight-medium"
            color="#25327F"
            @click="addChapter"
            >Add Chapter</v-btn
          >
        </v-col>

        <v-col class="12">
          <v-expansion-panels multiple>
            <v-expansion-panel
              v-for="chapter in course.chapters"
              :key="chapter.id"
              readonly
            >
              <v-expansion-panel-header class="font-weight-regular text-h6">
                {{ `Chapter ${chapter.sequenceNumber} - ${chapter.title}` }}
                <template #actions>
                  <v-icon
                    color="#25327F"
                    class="mr-2"
                    @click="editChapter(chapter)"
                  >
                    mdi-pencil-outline
                  </v-icon>
                  <v-icon
                    color="error"
                    class="mr-3"
                    @click="deleteChapter(chapter)"
                  >
                    mdi-delete-outline
                  </v-icon>
                </template>
              </v-expansion-panel-header>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>

        <!-- Chapter Add/Edit Dialog -->
        <v-dialog v-model="chapterDialog" max-width="50%">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ chapterFormTitle }}</span>
            </v-card-title>

            <v-card-text class="pb-0">
              <v-container>
                <v-row>
                  <v-col cols="4" class="pb-0">
                    <v-text-field
                      v-model="editedChapter.sequenceNumber"
                      label="Chapter Number"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col cols="8" class="pb-0">
                    <v-text-field
                      v-model="editedChapter.title"
                      label="Chapter Title"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" text @click="closeAddChapter">
                Cancel
              </v-btn>
              <v-btn color="#25327F" text @click="confirmAddChapter">
                Add
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-col>

    <!-- Assign Teacher Section -->
    <v-col cols="4">
      <v-row>
        <v-col cols="8" class="text-h6">Assigned Teachers</v-col>
        <v-col cols="4" class="d-flex justify-end">
          <v-btn outlined color="orange darken-4">
            <v-icon>mdi-plus</v-icon>
            Assign
          </v-btn>
        </v-col>
        <v-col v-for="n in 3" :key="n" cols="12" class="py-1">
          <v-card outlined class="py-1">
            <v-row>
              <v-col cols="4" class="pr-0 d-flex justify-end align-center">
                <v-avatar size="70" color="grey lighten-3">
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

  data() {
    return {
      course: null,
      overviewPanel: [0, 1],
      editedIndex: -1,
      editedChapter: {
        title: '',
        sequenceNumber: 0,
      },
      defaultChapter: {
        title: '',
        sequenceNumber: 0,
      },
      chapterDialog: false,
      courseOverview: `Explore the evolution of the spa industry from ancient civilizations to new frontiers of convergence integrating spas, medicine, healthcare, tourism, and hospitality. Study the industry from an international perspective, with emphasis on current business models and positioning for future trends. Understand the definition and market segmentation of spa categories including day, resort, medical, destination, hospital, and lifestyle management programs, and examine industry trends and employment opportunities.`,
    }
  },

  computed: {
    chapterFormTitle() {
      return this.editedIndex === -1 ? 'New Chapter' : 'Edit Chapter'
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.course = this.$nuxt.context.params.courseId
    },

    addChapter() {
      this.chapterDialog = true
    },

    editChapter(chapter) {
      this.editedIndex = chapter.id
      this.editedChapter = Object.assign({}, chapter)
      this.chapterDialog = true
    },

    deleteChapter(chapter) {
      console.log('Delete', chapter.id, 'Chapter')
    },

    closeAddChapter() {
      this.chapterDialog = false
      this.$nextTick(() => {
        this.editedChapter = Object.assign({}, this.defaultChapter)
        this.editedIndex = -1
      })
    },

    confirmAddChapter() {
      if (this.editedIndex > -1) {
        // Edit Chapter with an id of this.editedIndex
      } else {
        // Create a new Chapter
      }

      this.course.chapters.push({
        title: this.newChapterTitle,
        sequenceNumber: this.newChapterNumber,
      })

      this.closeAddChapter()
    },
  },
}
</script>
