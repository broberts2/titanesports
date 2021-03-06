const Article = require("../../models/Article");
const Oracle = require("../admin/Oracle");
const moment = require("moment");

module.exports = {
  createArticle: async (req) => {
    const res = await Article.create({
      published: false,
      authorid: req.body.authorid,
      iconImgUrl: req.body.iconImgUrl,
      title: req.body.title,
      tags: req.body.tags,
      subject: req.body.subject,
      tileimgurl: req.body.tileimgurl,
      bannerimgurl: req.body.bannerimgurl,
      contentblocks: req.body.contentblocks,
      createddate: new Date(),
      modifieddate: new Date(),
    });
    return { msg: "Success!", id: res._id };
  },
  updateArticle: async (req) => {
    delete req.body.published;
    delete req.body.createddate;
    delete req.body.modifieddate;
    const res = await Article.updateOne({ _id: req.body._id }, req.body);
    return "Success!";
  },
  publishArticle: async (req) => {
    const res = await Article.updateOne(
      { _id: req.body._id },
      { published: req.body.published, modifieddate: new Date() }
    );
    return "Success!";
  },
  deleteArticle: async (req) => {
    const res = await Article.remove({ _id: req.body.id });
    return "Success!";
  },
  getArticles: async (req) => {
    try {
      const _articles = await Article.find(
        req.query.id ? { _id: req.query.id } : {}
      );
      const articles = await Promise.all(
        _articles.map(async (el) => {
          const user = await Oracle.getUsers({
            query: { query: { discordId: el.authorid } },
          });
          return Object.assign(
            {},
            el._doc,
            {
              createddate: moment(el.createddate).format("MMM Do, YYYY"),
              modifieddate: moment(el.modifieddate).format("MMM Do, YYYY"),
            },
            { author: user.displayname }
          );
        })
      );
      return articles;
    } catch (e) {
      return null;
    }
  },
};
