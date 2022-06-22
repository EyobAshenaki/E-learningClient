export const state = () => ({
  courseOwner: null,
  courseDocuments: [],
  courseDocument: {
    id: null,
    documentType: null,
    documentDisplayName: null,
    storedFileName: null,
  },
  assignmentDefinitions: [],
  submissionToEvaluate: {
    id: null,
    totalScore: null,
    submissionDate: null,
    submissionFile: null,
    submittedBy: null,
    values: [],
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
  getAssignmentDefinitions(state) {
    return state.assignmentDefinitions
  },
  getSubmissionToEvaluate(state) {
    return state.submissionToEvaluate
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
  setAssignmentDefinitions(state, assignmentDefinitions) {
    state.assignmentDefinitions = assignmentDefinitions
  },
  setSubmissionToEvaluate(state, submissionToEvaluate) {
    state.submissionToEvaluate = submissionToEvaluate
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

    return await this.$axios.post('/graphql', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  async deleteCourseDocument({ commit }, documentId) {
    const query = `mutation removeCourseDocument($id:ID!){removeCourseDocument(id:$id)}`
    const variables = { id: documentId }
    const deletedRes = await this.$axios.post('/graphql', { query, variables })
    const deleted = deletedRes.data?.data?.removeCourseDocument
    return deleted
  },
  async fetchAssignments({ commit }, courseId) {
    const query = `query assignmentDefinitions($courseId: ID!) {
      assignmentDefinitions(courseId: $courseId) {
        id
        created_at
        name
        submissionDeadline
        maximumScore
        isCriteriaBased
        instructionsFile
        course {students{id firstName middleName lastName}}
        criteria { id title weight }
        submissions {
          id
          submissionDate
          submissionFile
          totalScore
          submittedBy {
            firstName
            middleName
            lastName
          }
        }
      }
    }`
    const variables = {
      courseId,
    }
    const assignmentsRes = await this.$axios.post('/graphql', {
      query,
      variables,
    })
    const assignments = assignmentsRes.data.data.assignmentDefinitions
    commit('setAssignmentDefinitions', assignments)
  },
  async evaluateNormalAssignment({ commit }, { submissionId, totalScore }) {
    const query = `mutation gradeNormalAssignment($id: ID!, $totalScore: Float) {
                      evaluation: gradeNormalSubmission(id: $id, totalScore: $totalScore) {
                        submissionDate
                        totalScore
                        submissionFile
                      }
                    }`
    const variables = { id: submissionId, totalScore }
    const evaluationRes = await this.$axios.post('/graphql', {
      query,
      variables,
    })
    const { evaluation } = evaluationRes?.data?.data
    return evaluation
  },
  async createAssignmentDefinition(
    { commit },
    {
      courseId,
      name,
      maximumScore,
      isCriteriaBased,
      submissionDeadline,
      instructionsFile,
      criteria,
    }
  ) {
    const preQuery = (
      name,
      submissionDeadline,
      isCriteriaBased,
      maximumScore,
      courseId
    ) => ({
      operations: `{"query": "mutation create_assignment($submissionDeadline:Date! $maximumScore:Float! $isCriteriaBased:Boolean $file:Upload! $courseId:ID! $name:String!){newDefinition:createAssignmentDefinition(createAssignmentDefinitionInput:{submissionDeadline:$submissionDeadline maximumScore:$maximumScore isCriteriaBased:$isCriteriaBased instructionsFile:$file courseId:$courseId name:$name}){id name submissionDeadline maximumScore isCriteriaBased instructionsFile}}","variables": {"name":"${name}","submissionDeadline":"${submissionDeadline}","isCriteriaBased":${isCriteriaBased},"maximumScore":${maximumScore},"courseId":"${courseId}","file":null},"operationName":"create_assignment"}`,
      map: instructionsFile ? `{"0": ["variables.file"]}`: `{}`,
    })
    const query = preQuery(name, submissionDeadline, isCriteriaBased, maximumScore, courseId)
    const formData = new FormData()
    formData.append('operations', query.operations)
    formData.append('map', query.map)
    formData.append('0', instructionsFile ?? null)
    const assignmentDefinitionRes = await this.$axios.post('/graphql', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    const { data } = assignmentDefinitionRes
    if (data.data && isCriteriaBased) {
      const definitionId = data.data.newDefinition.id
      criteria.forEach(async (criterion) => {
        const { title, weight } = criterion
        const query = `mutation createAssignmentCriterion($title: String! $weight: Int! $definitionId: ID!){
          newCriterion: createAssignmentCriterion(createAssignmentCriterionInput: {
            title: $title
            weight: $weight
            definitionId: $definitionId}){
            id
            title
            weight
          }
        }`
        const variables = { title, weight: parseInt(weight), definitionId }
        const assignmentCriterionRes = await this.$axios.post('/graphql', {
          query,
          variables,
        })
        const { data } = assignmentCriterionRes
        if (data.data) {
          return data.data.newCriterion
        }
      })
    }
  },
  async fetchSubmissionToEvaluate({ commit }, submissionId) {},
}
