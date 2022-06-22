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
    removeUser (id: $userId) {
      firstName
    }
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
