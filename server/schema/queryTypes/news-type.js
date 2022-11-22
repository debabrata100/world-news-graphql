const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} = require("graphql");

module.exports = new GraphQLObjectType({
  name: "NewsType",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    website: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    votes: { type: GraphQLInt },
    isArchived: { type: GraphQLBoolean },
  }),
});
