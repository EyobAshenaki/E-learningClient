<template>
  <div>
    <v-btn v-if="courseOwner" class="orange darken-4 white--text" @click="gotoUpload()"
      >Upload <v-icon class="ml-2">mdi-file-upload</v-icon></v-btn
    >
    <v-subheader v-if="!documents.length" class="mt-3"
      >This Course has no documents uploaded yet.<template v-if="courseOwner">
         Click on (
        <span
          class="orange--text text--darken-4 d-inline-block px-2 underline--text grey"
          @click="gotoUpload()"
        >
        Upload</span
        >
        ) to upload a new document for this course.
      </template></v-subheader
    >
    <course-document-card
      v-for="document in documents"
      :key="document.id"
      :document="document"
      :course-id="courseId"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    props: {
      courseId: {
        type: String,
        required: true,
      },
    },
    computed: {
      ...mapGetters({
        courseOwner: 'auth/isCourseOwner'
      }),
      documents: {
        set(documents) {
          return documents
        },
        get() {
          return this.$store.getters['course-management/getCourseDocuments']
        },
      },
    },
    created() {
      this.$store.dispatch(
        'course-management/fetchCourseDocuments',
        this.courseId
      )
      const documents =
        this.$store.getters['course-management/getCourseDocuments']
      this.documents = documents
    },
    methods: {
      gotoUpload() {
        this.$store.commit('course-management/setCourseDocument', {})
        this.$router.push(`${this.$route.path}/upload`)
      },
    },
  }
</script>

<style lang="scss" scoped></style>
