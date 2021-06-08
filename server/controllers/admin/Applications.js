const Applications = require("../../models/Applications");

module.exports = {
  post: async (req) =>
    await Applications.create({
      JSON: req.body.JSON,
      origin: req.body.origin,
      category: req.body.category,
    }),
  get: async (req) => await Applications.find({ category: req.query.category }),
  delete: async (req) => await Applications.remove({ _id: req.body.id }),
};
