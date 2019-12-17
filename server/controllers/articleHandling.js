const Articles = require("../models/article");
const ObjectId = require("mongodb").ObjectID;
const config = require("../config");

const iconSort = icon => (icon ? icon.sort((a, b) => (a > b ? 1 : -1)) : null);

module.exports = {
  createArticle: async (req, level) => {
    if (!(req.user_info.level > level)) {
      try {
        let articles = await Articles.create({
          date_created: new Date(),
          title: req.body.title,
          author: req.user_info.username,
          content: req.body.content,
          icon: iconSort(req.body.icon),
          img_path: req.body.img_path,
          status: 0
        });
        articles.code = 200;
        articles.msg = "Article Creation Successful!";
        return articles;
      } catch (e) {
        console.log(e);
        return {
          code: 501,
          msg: "Article Creation Failed."
        };
      }
    } else {
      return {
        code: 403,
        msg: "Access Denied."
      };
    }
  },
  getArticles: async req => {
    try {
      let articles = await Articles.find({});
      articles = articles.sort((a, b) =>
        a.date_created > b.date_created ? -1 : 1
      );
      return {
        articles,
        code: 200,
        msg: "Article Get Successful!"
      };
    } catch (e) {
      return {
        code: 501,
        msg: "Article Get Failed."
      };
    }
  },
  getArticle: async req => {
    try {
      const article = await Articles.findOne({ _id: ObjectId(req.query.id) });
      return {
        article,
        code: 200,
        msg: "Article Get Successful!"
      };
    } catch (e) {
      return {
        code: 501,
        msg: "Article Get Failed."
      };
    }
  },
  updateArticle: async (req, level) => {
    if (!(req.user_info.level > level)) {
      try {
        req.body.icon = iconSort(req.body.icon);
        const articles = await Articles.update({ _id: req.body.id }, req.body);
        articles.code = 200;
        articles.msg = "Article Update Successful!";
        return articles;
      } catch (e) {
        console.log(e);
        return {
          code: 501,
          msg: "Article Update Failed."
        };
      }
    } else {
      return {
        code: 403,
        msg: "Access Denied."
      };
    }
  },
  setArticleStatus: async (req, level) => {
    if (!(req.user_info.level > level)) {
      try {
        const articles = await Articles.update({ _id: req.body.id }, req.body);
        articles.code = 200;
        articles.msg = "Article Update Successful!";
        return articles;
      } catch (e) {
        console.log(e);
        return {
          code: 501,
          msg: "Article Update Failed."
        };
      }
    } else {
      return {
        code: 403,
        msg: "Access Denied."
      };
    }
  },
  removeArticle: async (req, level) => {
    if (!(req.user_info.level > level)) {
      try {
        const articles = await Articles.remove({ _id: req.body.id });
        articles.code = 200;
        articles.msg = "Article Removal Successful!";
        return articles;
      } catch (e) {
        return {
          code: 501,
          msg: "Article Removal Failed."
        };
      }
    } else {
      return {
        code: 403,
        msg: "Access Denied."
      };
    }
  }
};
