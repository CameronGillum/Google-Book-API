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

  type Book {
    _id: ID
    title: String
    authors: [String]
    description: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    tasks: [Task]
    books: [Book]
    book(_id: ID!): Book
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    addTask(taskName: String!, completed: Boolean): Task
    addBook(title: String!, authors: [String], description: String, image: String, link: String): Book
    removeBook(_id: ID!): Book
    login(username: String!, password: String!): Auth
  }
`;

module.exports = { typeDefs };
