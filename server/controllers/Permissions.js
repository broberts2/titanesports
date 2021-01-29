const Permissions = require("../models/Permissions");

module.exports = {
  post: async (req) => {
    return await Permissions.create({
      createArticles: req.body.createArticles,
      editArticles: req.body.editArticles,
      deleteArticles: req.body.deleteArticles,
      editSite: req.body.editSite,
      editPermissions: req.body.editPermissions,
      editTitanDraft: req.body.editTitanDraft,
      editBadges: req.body.editBadges
    });
  },
  get: async () => await Permissions.findOne({}),
};