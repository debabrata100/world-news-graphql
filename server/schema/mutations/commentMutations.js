const { GraphQLID, GraphQLString, GraphQLObjectType } = require("graphql");
const { addComment, updateComment, deleteComment } = require("../../query");
const CommentType = require("../queryTypes/comment-type");

const SuccessMessageType = new GraphQLObjectType({
  name: "SuccessMessageType",
  fields: () => ({
    message: { type: GraphQLString },
  }),
});
module.exports = {
  addComment: {
    type: CommentType,
    args: {
      userId: { type: GraphQLID },
      newsId: { type: GraphQLID },
      comment: { type: GraphQLString },
    },
    resolve(pv, { userId, newsId, comment }) {
      return addComment(userId, newsId, comment);
    },
  },
  updateComment: {
    type: CommentType,
    args: {
      commentId: { type: GraphQLID },
      comment: { type: GraphQLString },
    },
    resolve(pv, { commentId, comment }) {
      return updateComment(commentId, comment);
    },
  },
  deleteComment: {
    type: SuccessMessageType,
    args: {
      commentIds: { type: GraphQLString },
    },
    resolve(pv, { commentIds }) {
      return deleteComment(commentIds);
    },
  },
};
