export const state = () => ({
  courseOwner: null,
  courseDocuments: [],
  courseDocument: {
    id: null,
    documentType: null,
    documentDisplayName: null,
    storedFileName: null,
  },
})

export const getters = {
  id(state) {
    return state.courseOwner?.id
  },
  name({ courseOwner }) {
    return courseOwner ? courseOwner.firstName : null
  },
  fullName({ courseOwner }) {
    return courseOwner
      ? `${courseOwner.firstName} ${courseOwner.lastName}`
      : null
  },
  isLoggedIn(state) {
    return !!state?.courseOwner?.id
  },
  roles(state) {
    return state.courseOwner ? state.courseOwner.roles : []
  },
  getCourseOwner(state) {
    return state.courseOwner
  },
  getCourseDocuments(state) {
    return state.courseDocuments
  },
  getCourseDocument(state) {
    return state.courseDocument
  },
}

export const mutations = {
  setCourseOwner(state, courseOwner) {
    state.courseOwner = courseOwner
  },
  setCourseDocuments(state, courseDocuments) {
    state.courseDocuments = courseDocuments
  },
  setCourseDocument(state, courseDocument) {
    state.courseDocument = courseDocument
  },
  pushCourseDocument(state, courseDocument) {
    state.courseDocuments.push(courseDocument)
  },
}

export const actions = {
  async fetchCourseOwner({ commit }, courseOwnerId) {
    const query = `query User($id: ID!) {
            user(id: $id) {
              id
              firstName
              middleName
              lastName
              ownedCourses {
                id
                name
                code
                description
                overview
                creditHour
                takingClasses {
                  section
                  year
              }
            }
            roles {
              name
            }
            }
        }`
    const variables = { id: courseOwnerId }
    const courseOwner = (
      await this.$axios.post('/graphql', { query, variables })
    ).data.data.user
    commit('setCourseOwner', courseOwner)
  },
  async fetchCourseDocuments({ commit }, courseId) {
    const query = `query documents($id: ID!) {
            course(id: $id) {
              documents: courseDocuments {
                id
                documentType
                documentDisplayName
                storedFileName
              }
            }
          }`
    const variables = { id: courseId }
    const documentsRes = await this.$axios.post('/graphql', {
      query,
      variables,
    })
    const documents = documentsRes.data.data.course.documents
    commit('setCourseDocuments', documents)
  },
  async updateCourseDocument({ commit, getters }, replaceFile) {
    const document = getters.getCourseDocument
    const {
      id,
      documentType,
      documentDisplayName,
      // documentFile,
    } = document
    let { documentFile } = document
    const preQuery = (id, documentType, documentDisplayName) => ({
      operations: `{"query":"mutation updateCourseDOC($id:ID! $documentType:String $documentDisplayName:String $file:Upload){ucd:updateCourseDocument(updateCourseDocumentInput:{id:$id documentType:$documentType documentDisplayName:$documentDisplayName fileUpload:$file}){id documentType documentDisplayName storedFileName}}","variables":{"id":"${id}","documentType":"${documentType}","documentDisplayName":"${documentDisplayName}","file":null}, "operationName":"updateCourseDOC"}`,
      map: `{"0": ["variables.file"]}`,
    })
    const query = preQuery(id, documentType, documentDisplayName)
    if (!replaceFile) {
      // eslint-disable-next-line no-const-assign
      documentFile = null
    }
    const formData = new FormData()
    formData.append('operations', query.operations)
    formData.append('map', documentFile ? query.map : '{}')
    formData.append('0', documentFile ?? null)
    console.log(formData.getAll('map'))

    return await this.$axios.post('/graphql', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  async deleteCourseDocument({ commit }, documentId) {
    const query = `mutation removeCourseDocument($id:ID!){removeCourseDocument(id:$id)}`
    const variables = { id: documentId }
    const deletedRes = await this.$axios.post('/graphql', { query, variables })
    const deleted = deletedRes.data?.data?.removeCourseDocument
    commit('deleteCourseDocument', documentId)
    return deleted
  },
}
