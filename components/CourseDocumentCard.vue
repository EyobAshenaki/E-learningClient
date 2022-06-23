<template>
  <div>
    <v-container grid-list-xs>
      <v-card>
        <v-card-title primary-title>
          <v-chip color="magenta" outlined>{{ document.documentType }}</v-chip>
          <h5 class="mx-2">
            {{ document.documentDisplayName }}
          </h5>
          <v-spacer></v-spacer>
          <v-btn
            small
            class="mr-3 yellow darken-4 white--text"
            @click="gotoEditPage()"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            small
            :href="`${$config.baseUrl}/upload/${document.storedFileName}`"
            class="mr-3 green white--text"
            target="_blank"
          >
            <v-icon>mdi-download</v-icon>
          </v-btn>
          <v-btn
            small
            class="mr-3 red darken-4 white--text"
            @click="deleteDialog = true"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-title>
      </v-card>

      <v-dialog v-model="deleteDialog" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Are you sure you want to delete this item?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="deleteDialog = false"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="deleteDocument()"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    props: {
      document: {
        type: Object,
        required: true,
      },
      courseId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        deleteDialog: false,
      }
    },
    methods: {
      ...mapActions({
        deleteCourseDocument: 'course-management/deleteCourseDocument',
      }),
      gotoEditPage() {
        this.$store.commit('course-management/setCourseDocument', this.document)
        this.$router.push({ path: `${this.$route.path}/edit` })
      },
      deleteDocument() {
        this.deleteDialog = false
          this.deleteCourseDocument(this.document.id)
        // this.$store.dispatch(
        //   'course-management/deleteCourseDocument',
        //   this.document.id
        // )
        this.$store.dispatch(
          'course-management/fetchCourseDocuments',
          this.courseId
        )
      },
    },
  }
</script>

<style lang="scss" scoped></style>
