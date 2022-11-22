const { GraphQLSchema } = require("graphql");

const RootQuery = require("./queryTypes/root-query-type");
const mutations = require("./mutations/mutations");
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutations,
});
