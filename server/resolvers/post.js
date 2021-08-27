const { gql } = require("apollo-server-express");
const { posts } = require("../temp");

//queries
const totalPosts = () => posts.length;

const allPosts = () => posts;

//mutation
const newPost = (parents, args) => {
    console.log(args)
    const {title, description}= args.input
  // create our new post object
  const post = {
    id: posts.length + 1,
    title: title,
    description: description,
  };
  // push new post object to the posts array
  posts.push(post);
  return post
};

module.exports = {
  Query: {
    totalPosts,
    allPosts,
  },
  Mutation: {
    newPost,
  },
};
