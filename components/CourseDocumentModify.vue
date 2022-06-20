<template>
  <div>
    <v-form ref="documentUploadForm" lazy-validation>
      <v-card class="pa-6" min-width="850px">
        <h1 class="mb-3">
          {{ isEditMode ? 'Edit' : 'Create' }} document
          {{ isEditMode ? `- ${documentDisplayName}` : '' }}
        </h1>
        <v-row class="mx-n1">
          <v-select
            id="documentType"
            v-model="documentType"
            name="documentType"
            label="Document Type"
            :items="[
              { text: 'Textbook', value: 'TEXTBOOK' },
              { text: 'Reference Book', value: 'REFERENCE' },
              { text: 'Powerpoint Slide', value: 'SLIDE' },
              { text: 'Other', value: 'OTHER' },
            ]"
            :rules="[rules.required]"
          ></v-select>
        </v-row>
        <v-row class="mx-n1">
          <v-text-field
            id="documentDisplayName"
            v-model="documentDisplayName"
            name="documentDisplayName"
            label="Document Display Title"
            :rules="[rules.required]"
          ></v-text-field>
        </v-row>
        <v-row class="mx-n1">
          <v-switch
            v-if="isEditMode"
            v-model="replaceFile"
            inset
            label="Change File?"
            class="mr-2"
            @click="resetFileForReplace()"
          />
          <v-file-input
            v-if="!isFileUploadInvisible"
            id="documentFile"
            v-model="documentFile"
            name="documentFile"
            label="Select a file"
            accept=".pdf,.ppt,.pptx,.doc,.docx,.zip"
            :rules="[rules.required]"
          ></v-file-input>
        </v-row>
        <v-row class="mx-n1">
          <v-btn
            id="documentSubmitButton"
            name="documentSubmitButton"
            class="mt-2 primary"
            @click="!isEditMode ? save() : update()"
            >Save</v-btn
          >
        </v-row>
      </v-card>
    </v-form>
  </div>
</template>

<script>
  export default {
    props: {
      modifyMode: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        id: null,
        documentType: null,
        documentDisplayName: null,
        documentFile: null,
        storedFileName: null,
        replaceFile: false,
        rules: { required: (v) => !!v || 'This field is required.' },
      }
    },
    computed: {
      isEditMode() {
        return this.modifyMode === 'UPDATE/EDIT'
      },
      isFileUploadInvisible(){
        return this.isEditMode && !this.replaceFile
      }
    },
    mounted() {
      Object.assign(
        this,
        this.$store.getters['course-management/getCourseDocument']
      )
    },
    methods: {
      resetFileForReplace() {
        if (this.replaceFile) this.documentFile = null
      },
      async save() {
        if (!this.$refs.documentUploadForm.validate()) return
        const { courseId } = this.$route.params
        const { documentType, documentDisplayName, documentFile } =
          this
        const preQuery = (documentType, documentDisplayName, courseId) => {
          return {
            operations: `{"query":"mutation createCourseDOC($documentType:String!,$documentDisplayName:String!,$file:Upload!,$courseId:ID!){ccd:createCourseDocument(createCourseDocumentInput:{documentType:$documentType,documentDisplayName:$documentDisplayName,fileUpload:$file,courseId:$courseId}){id,documentType,documentDisplayName,storedFileName}}","variables":{"documentType":"${documentType}","documentDisplayName":"${documentDisplayName}","courseId":"${courseId}","file":null},"operationName":"createCourseDOC"}`,
            map: `{"0": ["variables.file"]}`,
          }
        }
        const query = preQuery(documentType, documentDisplayName, courseId)
        const formData = new FormData()
        formData.append('operations', query.operations)
        formData.append('map', query.map)
        formData.append('0', documentFile)

        const data = await this.$axios.post('/graphql', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        if (data.errors) {
          this.$toast.error(data.errors[0].message)
        } else if (data.data) {
          this.$toast.success(`Upload Successful.`)
          this.$store.commit(
            'course-management/pushCourseDocument',
            data.data.ccd
          )
          this.$refs.documentUploadForm.reset()
          let {path} = this.$route
          path = path.substring(0,path.lastIndexOf('/'))
          this.$router.push(path)
        }
      },
      async update() {
        if (!this.$refs.documentUploadForm.validate()) return
        const {
          id,
          documentType,
          documentDisplayName,
          documentFile,
          storedFileName,
        } = this
        this.$store.commit('course-management/setCourseDocument', {
          id,
          documentType,
          documentDisplayName,
          documentFile,
          storedFileName,
        })
        const data = await this.$store.dispatch(
          'course-management/updateCourseDocument',
          this.replaceFile
        )

        if (data.errors) {
          this.$toast.error(data.errors[0].message)
        } else if (data.data) {
          this.$toast.success(
            `Update ${this.replaceFile ? 'and Upload' : ''} Successful.`
          )
            this.$store.commit(
              'course-management/pushCourseDocument',
              data.data.ucd
            )
          this.$refs.documentUploadForm.reset()
          let {path} = this.$route
          path = path.substring(0,path.lastIndexOf('/'))
          this.$router.push(path)
        }
      },
    },
  }
</script>
