export const ALL_STUDENTS = `#graphql
query {
  users {
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

export const ALL_TEACHERS = `#graphql
query {
  users {
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
