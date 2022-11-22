const { GraphQLObjectType } = require("graphql");

const UsersMutations = require("./usersMutations");
const NewsMutations = require("./newsMutations");
const CommentMutations = require("./commentMutations");

module.exports = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...UsersMutations,
    ...NewsMutations,
    ...CommentMutations,
  },
});
