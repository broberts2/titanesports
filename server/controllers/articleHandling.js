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
      const team = await Article.create({
        title: "Some title",
        imgURL: "url",
        p: "Phortwenty",
        date: "April 19th, 2019",
        metaData: {
          comments: 6,
          likes: 6,
          views: 6
        },
        approved: false,
        content: ["stuff"]
      });
      return team;
    } catch (e) {
      throw new Error(e.message);
    }
  }
};
