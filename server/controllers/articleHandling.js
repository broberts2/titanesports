const Article = require("../models/article");
const config = require("../config");

module.exports = {
  getAllArticles: async (req, res) => {
    try {
      let articles = await Article.find({});
      return articles;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  createArticle: async (req, res) => {
    try {
      const date = new Date();
      const team = await Article.create({
        title: req.body.title,
        imgURL: req.body.imgURL,
        p: req.body.p,
        date: `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`,
        metaData: {
          comments: 0,
          likes: 0,
          views: 0
        },
        approved: false,
        content: req.body.content
      });
      return team;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  updateArticle: async (req, res) => {
    if (req.user_info.level > 2) {
      delete req.body.approved;
    }
    try {
      const user = await Article.update({ title: req.query.title }, req.body);
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  deleteArticle: async (req, res) => {
    try {
      const user = await Article.remove({
        title: req.query.title
      });
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  }
};
