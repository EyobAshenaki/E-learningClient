function usersQuery(rolenameFilter) {
  return `#graphql
    query {
      users (filter: {
        roleName: ${rolenameFilter ?? null}
      }){
        id
        firstName
        middleName
        lastName
        email
        roles {
          name
        }
        attendingClass{
          id
          year
          section
        }
      }
  }`
}
export const ALL_STUDENTS = usersQuery('STUDENT')
export const ALL_TEACHERS = usersQuery('TEACHER')
export const ALL_COURSE_MANAGERS = usersQuery('COURSE_MANAGER')
export const ALL_COURSE_TEACHERS = usersQuery('COURSE_TEACHER')
export const ALL_COURSE_OWNERS = usersQuery('COURSE_OWNER')
export const ALL_USERS = usersQuery(null)

export const REMOVE_USER = `#graphql
  mutation ($userId: ID!) {
    removeUser (id: $userId) { firstName }
  }
`

export const CREATE_USER = `#graphql
mutation ($firstName: String!, 
          $middleName: String!, 
          $lastName: String!, 
          $email: String!, 
          $password: String!,
          $roleName: RoleName!) {
    createUser (createUserInput: {
        firstName: $firstName
        middleName: $middleName
        lastName: $lastName
        email: $email
        password: $password
        roleName: $roleName
    }) {
        id
        firstName
        middleName
        lastName
        email
        roles {
          name
        }
    }
}
`

export const UPDATE_USER = `#graphql
mutation ($firstName: String, 
          $middleName: String, 
          $lastName: String, 
          $email: String, 
          $password: String,
          $id: ID!) {
    updateUser (updateUserInput: {
        firstName: $firstName
        middleName: $middleName
        lastName: $lastName
        email: $email
        password: $password
        id: $id
    }) {
        id
        firstName
        middleName
        lastName
        email
        roles {
          name
        }
    }
}
`
export const CREATE_QUIZ = `#graphql
  mutation ($title: String! $start: Date!, $end: Date!, $duration: Int!, $maxScore: Int! $sections: [CreateQuizSectionInput]! $courseId: ID!) {
    createQuiz(input: {
        title: $title
        start: $start
        end: $end
        duration: $duration
        sections: $sections
        maxScore: $maxScore,
        courseId: $courseId
    }) {
        id
        title
        description
        start
        end
        duration
    }
}
`

export function multipleUserCreate(roleName, password) {
  return {
    operations: `{
      "query" : "mutation createMany($file:Upload!, $roleName:RoleName!, $password:String ){ createMultipleUsers(input:{ roleName:$roleName password:$password file:$file }) }",
      "variables": {
        "file": null,
        "roleName": "${roleName}", 
        "password": "${password}"
       },
      "operationName": "createMany"
    }`,
    map: `{"0": ["variables.file"]}`,
  }
}

export const OWNED_COURSES = `#graphql
  query ($userId: ID!){
    user(id: $userId) {
      ownedCourses {
        id 
        code
        name
      }
    }
  }
`
export const ALL_COURSES = `#graphql
  query courses {
    courses {
      id
      name
      code
      description
      overview
      creditHour
      chapters {
        id
        title
        sequenceNumber
      }
    }
  }
`

export const ALL_DEPARTMENTS = `#graphql
  query departments {
    departments {
      id
      name
    }
  }
`
export const ACCOUNT_COUNTERS = `#graphql
  query {
    accountCounters {
      allUsers
      students
      teachers
    }
  }
`

export const DEPARTMENT_FOR_DEPARTMENT_ADMINISTRATOR = `#graphql
  query user ($id: ID!) {
    user (id: $id) {
      department {
        name
        ownedCourses {
          id
          code
          name
          creditHour
        }
        classes {
          id
          year
          section
          students {
            id
          }
          attendingCourses {
            id
            name
            code
            creditHour
          }
        }
      }
    }
  }

`

export const QUIZZES_FOR_COURSE = `#graphql
  query ($id: ID!){
    quizzesForCourse(courseId: $id) {
      id
      title
      start
      description
      end
      duration
      attempts {
        id
      }
    }
  }
`

export const COURSE = `#graphql
  query ($id: ID!) {
    course (id: $id) {
      id
      name
      code
    }
  }
`

export const DELETE_QUIZ = `#graphql 
  mutation ($id: ID!) {
    deleteQuiz (quizId: $id) {
      title
    }
  }
`

export const ATTEMPTS_FOR_QUIZ = `#graphql
  query ($id: ID!){
	attemptsForQuiz(quizId: $id) {
		id
		completed
		grade {
			score
		}
    user {
      firstName
      middleName
      lastName
    }
	}
}
`
export const ATTEMPT = `#graphql
  query ($id: ID!){
    attempt(id: $id) {
      questions {
        id
        answer
        question {
          id
          questionType
        }
        subQuestions {
          number
          answer
        }
      }
      user {
        firstName
        middleName
        lastName
      }
    }
  }
`

export const QUESTIONS_FOR_QUIZ = `#graphql
  query ($id: ID!) {
    questionsForQuiz(quizId: $id) {
      id
      text
      number
      answer
      questionType
      subQuestions {
        id
        number
        answer
      }
      choices {
        id
        key
        text
      }
    }
  }
`

export const QUIZ = `#graphql
  query ($id:ID!) {
    quiz (id: $id) {
      id
      maxScore
    }
  }
`

export const GRADE_ATTEMPT = `#graphql
  mutation ($attemptId: ID!, $markerId: ID!, $score: Float!) {
    gradeAttempt(
      input: { attemptId: $attemptId, markerId: $markerId, score: $score }
    ) {
      score
    }
  }
`
