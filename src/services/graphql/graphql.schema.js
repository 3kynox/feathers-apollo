const typeDefinitions = `

enum Category {
  POLITICS
  TECHNOLOGY
  SPORTS
  OTHER
}

type User {
  _id: String! # the ! means that every author object _must_ have an id
  email: String
  permissions: String
  posts: [Post] # the list of Posts by this author
}

type AuthPayload {
  token: String # JSON Web Token
  data: User
}

type Post {
  _id: String!
  title: String
  category: String
  summary: String
  content: String!
  createdAt: String
  comments(limit: Int) : [Comment]
  author: User
}

type Comment {
  _id: String!
  content: String!
  author: User
  createdAt: String
}

input postInput {
  title: String!
  content: String!
  summary: String
  category: Category
}

# the schema allows the following queries:
type RootQuery {
  author(username: String!): User
  authors: [User]
  post(_id: String!) : Post
  posts(category: Category): [Post]
}

# this schema allows the following mutations:
type RootMutation {
  signUp (
    username: String!
    password: String!
    firstName: String
    lastName: String
  ): User

  logIn (
    email: String!
    password: String!
  ): AuthPayload

  createPost (
    post: postInput
  ): Post

  createComment (
    postId: String!
    content: String!
  ): Comment

  removePost (
    _id: String! # _id of post to remove
  ): Post

  removeComment (
    _id: String! # _id of comment to remove
  ): Comment

}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: RootQuery
  mutation: RootMutation
}
`;

module.exports = [typeDefinitions];
