const Permissions = require("../models/Permissions");

module.exports = {
  post: async (req) => {
    return await Permissions.create({
      createArticles: req.body.createArticles,
      publishArticles: req.body.publishArticles,
      editArticles: req.body.editArticles,
      deleteArticles: req.body.deleteArticles,
      editSite: req.body.editSite,
      editPermissions: req.body.editPermissions,
      editTitanDraft: req.body.editTitanDraft,
      editBadges: req.body.editBadges,
      oracleFlashPoll: req.body.oracleFlashPoll
    });
  },
  get: async () => await Permissions.findOne({}),
};