const Team = require("../../models/Team");
const Oracle = require("../admin/Oracle");

module.exports = {
  createTeam: async (req) => {
    return await Team.create(req.body);
  },
  getTeams: async (req) =>
    await Team.find(
      req.query && req.query.query ? JSON.parse(req.query.query) : {}
    ),
  updateTeam: async (req) =>
    await Team.updateOne({ _id: req.body._id }, req.body),
};
