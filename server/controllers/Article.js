const Article = require("../models/Article");

module.exports = {
  post: async (req) => {
    return await Article.create({
      authorid: req.body.authorid,
      title: req.body.title,
      subject: req.body.subject,
      tileimgurl: req.body.tileimgurl,
      bannerimgurl: req.body.bannerimgurl,
      contentblocks: req.body.contentblocks,
      createddate: req.body.createddate,
      modifieddate: req.body.modifieddate
    });
  },
  get: async () => await Article.findOne({}),
};