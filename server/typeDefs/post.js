const {gql} = require('apollo-server-express');


module.exports = gql`
#types
type Post  {
    id:ID!
    title: String!
    description:String!
}
#query
type Query {
    totalPosts: Int!
    allPosts:[Post!]!
}

#input types

input PostInput {
    title:String!
    description:String!
}

#Mutations
type Mutation {
    newPost (input:PostInput!): Post!
}
`;
