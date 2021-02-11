const Team = require("../models/Team");

module.exports = {
  post: async (req) => {
    return await Team.create({
      name: req.body.name
    });
  },
  get: async () => await Team.findOne({}),
};