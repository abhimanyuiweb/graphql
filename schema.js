// schema.js
const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: String!
    name: String!
    email: String!
    password: String!
    comments: [Comment]
  }

  type Comment{
    id: ID!
    text: String!
    name: String!
    email: String!
    date: String!
    movie_id: String!
    movieId: ID
    createdAt: String
  }

  type Query {
    consoleTesting: String!
    getUser(email: String!): User
    getAllUsers(page: Int!, limit: Int!): PaginatedUsers
  }

  type PaginatedUsers {
    users: [User]
    totalUsers: Int
    totalPages: Int
    currentPage: Int
    hasNextPage: Boolean
    hasPrevPage: Boolean
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    updateUser(id: ID!, name: String, email: String): User
    deleteUser(id: ID!): String
  }
`;

module.exports = typeDefs;