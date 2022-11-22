const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} = require("graphql");
const { getUser, getNewsById } = require("../../query");
const NewsType = require("./news-type");
const UserType = require("./user-type");

module.exports = new GraphQLObjectType({
  name: "CommentType",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    newsId: { type: GraphQLID },
    isEdited: { type: GraphQLBoolean },
    comment: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    modifiedAt: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(pv) {
        return getUser(pv.userId);
      },
    },
    news: {
      type: NewsType,
      resolve(pv) {
        return getNewsById(pv.newsId);
      },
    },
  }),
});

// addCommnet
// updateComment
// deleteComment
