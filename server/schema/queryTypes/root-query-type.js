const { GraphQLObjectType, GraphQLList, GraphQLID } = require("graphql");
const {
  getUsers,
  getNews,
  getUser,
  getComments,
  getComment,
} = require("../../query");

const UserType = require("./user-type");
const NewsType = require("./news-type");
const CommentType = require("./comment-type");

module.exports = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve: () => {
        const { users } = getUsers();
        return users;
      },
    },
    user: {
      type: UserType,
      args: { userId: { type: GraphQLID } },
      resolve(pv, { userId }) {
        return getUser(userId);
      },
    },
    news: {
      type: new GraphQLList(NewsType),
      resolve: () => {
        const { news } = getNews();
        return news;
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve() {
        const { comments } = getComments();
        return comments;
      },
    },
    comment: {
      type: CommentType,
      args: {
        commentId: { type: GraphQLID },
      },
      resolve(pv, { commentId }) {
        return getComment(commentId);
      },
    },
  }),
});
