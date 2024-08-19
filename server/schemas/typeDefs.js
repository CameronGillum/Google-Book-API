const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
  }

  type Task {
    _id: ID
    taskName: String
    completed: Boolean
  }

  type Query {
    users: [User]
    tasks: [Task]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    addTask(taskName: String!, completed: Boolean): Task
    login(username: String!, password: String!): Auth
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
