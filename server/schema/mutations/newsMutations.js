const { GraphQLString, GraphQLNonNull, GraphQLID } = require("graphql");
const {
  addNews,
  deleteNews,
  updateNews,
  upVoteNews,
  unVoteNews,
  updateHideStatus,
} = require("../../query");

const UserType = require("../queryTypes/user-type");
const NewsType = require("../queryTypes/news-type");

const newsMutations = {
  addNews: {
    type: NewsType,
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      website: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parentValue, { title, website }) {
      const addedNews = addNews({ title, website });
      return addedNews;
    },
  },
  deleteNews: {
    type: NewsType,
    args: {
      newsId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parentValue, { newsId }) {
      const deletedNews = deleteNews(newsId);
      console.log(deletedNews);
      return deletedNews;
    },
  },
  updateNews: {
    type: NewsType,
    args: {
      newsId: { type: new GraphQLNonNull(GraphQLID) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      website: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parentValue, { newsId, title, website }) {
      const updatedNews = updateNews(newsId, title, website);
      console.log(updatedNews);
      return updatedNews;
    },
  },
  upvote: {
    type: NewsType,
    args: {
      newsId: { type: new GraphQLNonNull(GraphQLID) },
      userId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(pv, { newsId, userId }) {
      return upVoteNews(newsId, userId);
    },
  },
  unvote: {
    type: NewsType,
    args: {
      newsId: { type: new GraphQLNonNull(GraphQLID) },
      userId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(pv, { newsId, userId }) {
      return unVoteNews(newsId, userId);
    },
  },
  hideNews: {
    type: UserType,
    args: {
      newsId: { type: new GraphQLNonNull(GraphQLID) },
      userId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(pv, { newsId, userId }) {
      return updateHideStatus(newsId, userId, true);
    },
  },
  unHideNews: {
    type: UserType,
    args: {
      newsId: { type: new GraphQLNonNull(GraphQLID) },
      userId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(pv, { newsId, userId }) {
      return updateHideStatus(newsId, userId, false);
    },
  },
};

module.exports = newsMutations;
