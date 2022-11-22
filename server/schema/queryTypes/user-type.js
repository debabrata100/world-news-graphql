const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} = require("graphql");
const { getNewsById } = require("../../query");
const NewsType = require("./news-type");

const UserNewsType = new GraphQLObjectType({
  name: "UserNewsType",
  fields: () => ({
    newsId: { type: GraphQLString },
    hide: { type: GraphQLBoolean },
    visited: { type: GraphQLBoolean },
    news: {
      type: NewsType,
      resolve(pv) {
        return getNewsById(pv.newsId);
      },
    },
  }),
});

module.exports = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLID },
    userName: { type: GraphQLString },
    password: { type: GraphQLString },
    news: { type: new GraphQLList(UserNewsType) },
  }),
});
