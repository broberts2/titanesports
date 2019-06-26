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
  getTeam: async (req, res) => {
    try {
      let team = await Team.find({ name: req.query.t });
      return team;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  modifyTeam: async (req, res) => {
    try {
      const teams = await Team.update({ name: req.query.t }, req.body);
      return teams;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  createTeam: async (req, res) => {
    try {
      const team = await Team.create({
        name: req.body.name,
        members: req.body.members || [req.body.name],
        subs: req.body.subs || [req.body.name],
        iconId: req.body.iconId || Math.random() * 1000,
        captain: req.body.captain || req.body.name,
        pr: new String(Math.random() * 1000)
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
