const Team = require("../models/team");
const config = require("../config");

module.exports = {
  getAllTeams: async (req, res) => {
    try {
      let teams = await Team.find({});
      return teams;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  modifyTeam: async (req, res) => {
    try {
      const teams = await Team.update({ name: req.query.t }, req.body.data);
      return teams;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  createTeam: async (req, res) => {
    try {
      const team = await Team.create({
        name: req.body.name,
        members: req.body.members || ["_0"],
        subs: req.body.subs || ["_0"],
        iconId: req.body.iconId || 9,
        captain: req.body.captain || "_0",
        pr: "1"
      });
      return team;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  deleteTeam: async (req, res) => {
    try {
      const user = await Team.remove({
        name: req.query.t
      });
      return team;
    } catch (e) {
      throw new Error(e.message);
    }
  }
};
