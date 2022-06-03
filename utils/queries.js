export const ALL_STUDENTS = `#graphql
query {
  users(filter: {
    roleName: STUDENT
  }) {
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
