const fs = require("fs");
const path = require("path");
const userFile = path.resolve(__dirname + "/db/users.json");
const newsFile = path.resolve(__dirname + "/db/news.json");
const commentFile = path.resolve(__dirname + "/db/comments.json");

const getUserNewsIndex = (news, newsId) => {
  return news.findIndex((ns) => ns.newsId == newsId);
};
const getNewsIndex = (news, newsId) => news.findIndex((ns) => ns.id == newsId);
const getUserIndex = (users, userId) =>
  users.findIndex((user) => user.id == userId);

const getCommentIndex = (comments, commentId) =>
  comments.findIndex((comment) => comment.id === commentId);

function getUsers() {
  try {
    const jsonString = fs.readFileSync(userFile, "utf-8");
    return JSON.parse(jsonString);
  } catch (error) {
    console.log("error reading file", error);
    return null;
  }
}
function getUser(userId) {
  try {
    const { users = [] } = getUsers();
    const user = users.find((user) => user.id == userId);
    if (user) return user;
  } catch (error) {
    console.log("error getting user", error);
    return null;
  }
}

function addUser({ userName, password }) {
  try {
    const { users = [] } = getUsers();
    users.push({ id: `${users.length + 1}`, userName, password });
    const output = { users };
    fs.writeFileSync(userFile, JSON.stringify(output, null, 4));
    return users[users.length - 1];
  } catch (error) {
    console.log("error writing users json", error);
    return null;
  }
}

function getNews() {
  try {
    const jsonString = fs.readFileSync(newsFile, "utf-8");
    return JSON.parse(jsonString);
  } catch (error) {
    console.log("error reading news json", error);
    return null;
  }
}

function getNewsById(newsId) {
  try {
    const { news = [] } = getNews();
    return news.find((ns) => ns.id === newsId);
  } catch (error) {
    console.log("error gettingNewsById json", error);
    return null;
  }
}

function addNews({ title, website }) {
  try {
    const { news = [] } = getNews();
    news.unshift({
      id: `${news.length + 1}`,
      title,
      website,
      createdAt: new Date(),
      votes: 0,
      isArchived: false,
    });
    const output = { news };
    fs.writeFileSync(newsFile, JSON.stringify(output, null, 4));
    return news[news.length - 1];
  } catch (error) {
    console.log("error writing news json", error);
    return null;
  }
}
function deleteNews(newsId) {
  try {
    const { news = [] } = getNews();
    const updatedNewsList = news.filter((ns) => ns.id != newsId);
    const output = { news: updatedNewsList };
    fs.writeFileSync(newsFile, JSON.stringify(output, null, 4));
    return { id: newsId };
  } catch (error) {
    console.log("error deleting news json", error);
    return null;
  }
}
function updateNews(newsId, title, website) {
  try {
    const { news = [] } = getNews();
    const index = news.findIndex((ns) => ns.id == newsId);
    if (index > -1) {
      news[index].title = title;
      news[index].website = website;
      const output = { news };
      fs.writeFileSync(newsFile, JSON.stringify(output, null, 4));
      return news[index];
    }
  } catch (error) {
    console.log("error updating news json", error);
    return null;
  }
}

function upVoteNews(newsId, userId) {
  try {
    const { news } = getNews();
    const { users } = getUsers();
    const newsIndex = getNewsIndex(news, newsId);
    const userIndex = getUserIndex(users, userId);
    if (newsIndex === -1 || userIndex === -1) return;
    news[newsIndex].votes += 1;
    if (!users[userIndex].news) {
      users[userIndex].news = [];
    }
    const userNewsIndex = getUserNewsIndex(users[userIndex].news, newsId);
    if (userNewsIndex === -1) {
      users[userIndex].news.push({
        newsId,
        hide: false,
        visited: false,
      });
      fs.writeFileSync(newsFile, JSON.stringify({ news }, null, 4));
      fs.writeFileSync(userFile, JSON.stringify({ users }, null, 4));
      return news[newsIndex];
    }
  } catch (error) {
    console.log("error upvoting news ", error);
    return null;
  }
}
function unVoteNews(newsId, userId) {
  try {
    const { news } = getNews();
    const { users } = getUsers();
    const newsIndex = getNewsIndex(news, newsId);
    const userIndex = getUserIndex(users, userId);
    if (newsIndex === -1 || userIndex === -1) return;
    news[newsIndex].votes -= 1;
    if (users[userIndex].news) {
      users[userIndex].news = users[userIndex].news.filter(
        (ns) => ns.newsId !== newsId
      );
      fs.writeFileSync(newsFile, JSON.stringify({ news }, null, 4));
      fs.writeFileSync(userFile, JSON.stringify({ users }, null, 4));
      return news[newsIndex];
    }
  } catch (error) {
    console.log("error upvoting news ", error);
    return null;
  }
}
function updateHideStatus(newsId, userId, status) {
  try {
    const { news } = getNews();
    const { users } = getUsers();
    const newsIndex = getNewsIndex(news, newsId);
    const userIndex = getUserIndex(users, userId);
    if (newsIndex === -1 || userIndex === -1) return;
    if (users[userIndex].news) {
      const userNewsIndex = getUserNewsIndex(users[userIndex].news, newsId);
      if (userNewsIndex < 0) return;
      users[userIndex].news[userNewsIndex].hide = status;
      fs.writeFileSync(newsFile, JSON.stringify({ news }, null, 4));
      fs.writeFileSync(userFile, JSON.stringify({ users }, null, 4));
      return users[userIndex];
    }
  } catch (error) {
    console.log("error hiding news ", error);
    return null;
  }
}

function getComments() {
  try {
    const jsonString = fs.readFileSync(commentFile, "utf-8");
    return JSON.parse(jsonString);
  } catch (error) {
    console.log("error getting comments ", error);
    return null;
  }
}

function getComment(commentId) {
  try {
    const { comments } = getComments();
    return comments.find((comment) => comment.id === commentId);
  } catch (error) {
    console.log("error getting comment ", error);
    return null;
  }
}

function addComment(userId, newsId, comment) {
  try {
    const { comments = [] } = getComments();
    comments.unshift({
      id: `c-0${comments.length + 1}`,
      userId,
      newsId,
      isEdited: false,
      createdAt: new Date(),
      comment,
    });
    fs.writeFileSync(commentFile, JSON.stringify({ comments }, null, 4));
    return comments[0];
  } catch (error) {
    console.log("error adding comment ", error);
    return null;
  }
}

function updateComment(commentId, comment) {
  try {
    const { comments = [] } = getComments();
    const commnentIndex = getCommentIndex(comments, commentId);
    comments[commnentIndex].comment = comment;
    comments[commnentIndex].isEdited = true;
    comments[commnentIndex].modifiedAt = new Date();
    fs.writeFileSync(commentFile, JSON.stringify({ comments }, null, 4));
    return comments[commnentIndex];
  } catch (error) {
    console.log("error updating comment ", error);
    return null;
  }
}

function deleteComment(commentIds = "") {
  try {
    const { comments = [] } = getComments();
    const commentIdList = commentIds.split(",");
    if (commentIdList.length < 1) return;
    const commentsAfterDelete = comments.filter(
      (comment) => !commentIdList.includes(comment.id)
    );
    fs.writeFileSync(
      commentFile,
      JSON.stringify({ comments: commentsAfterDelete }, null, 4)
    );
    return { message: `[${commentIds}] deleted successfuly` };
  } catch (error) {
    console.log("error deleting comment ", error);
    return null;
  }
}

module.exports = {
  addUser,
  getUsers,
  getNews,
  addNews,
  deleteNews,
  updateNews,
  getUser,
  upVoteNews,
  unVoteNews,
  updateHideStatus,
  getComments,
  getComment,
  addComment,
  updateComment,
  deleteComment,
  getNewsById,
};
