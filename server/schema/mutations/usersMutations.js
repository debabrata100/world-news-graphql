const { GraphQLString, GraphQLNonNull } = require("graphql");
const { addUser } = require("../../query");

const UserType = require("../queryTypes/user-type");

const usersMutations = {
  addUser: {
    type: UserType,
    args: {
      userName: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parentValue, { userName, password }) {
      const addedUser = addUser({ userName, password });
      return addedUser;
    },
  },
};
module.exports = usersMutations;
