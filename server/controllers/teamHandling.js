const Team = require("../models/team");
const config = require("../config");
const ObjectId = require("mongodb").ObjectID;
const Users = require("../models/user");

const statsObjectModel = {};

const legacyObjectModel = {};

module.exports = {
  createTeam: async (req, level, exact) => {
    try {
      if (
        (exact && req.user_info.level !== 0 && level !== req.user_info.level) ||
        req.user_info.level > level
      ) {
        return {
          msg: "Access Denied",
          code: 403
        };
      }
      let team = await Team.create({
        name: req.body.name,
        members: {},
        iconId: "",
        league: req.body.league || 0,
        teamImage: req.body.teamImage || "",
        captain: req.body.captain || null,
        stats: statsObjectModel,
        legacy: statsObjectModel
      });
      team.code = 200;
      team.msg = "Team Creation Successful!";
      return team;
    } catch (e) {
      return e;
    }
  },
  getAllTeams: async req => {
    try {
      const teams = await Team.find({});
      if (!teams) {
        return { code: 11102, msg: "Get Teams Error." };
      }
      return { code: 200, msg: "Get All Teams Successful!", teams };
    } catch (e) {
      return { code: 11102, msg: "Get Teams Error." };
    }
  },
  movePlayerToTeam: async req => {
    try {
      const team = await Team.findOne({ _id: req.body.teamId });
      let members = team.members ? team.members : {};
      members[req.body.player.playerId] = {
        id: req.body.player.playerId,
        name: req.body.player.username,
        role: req.body.player.position
      };
      const updatedTeam = await Team.update(
        { _id: req.body.teamId },
        {
          members
        }
      );
      if (req.body.fromTeamId) {
        const team2 = await Team.findOne({ _id: req.body.teamId });
        members = team2.members ? team2.members : {};
        delete members[req.body.player.playerId];
        await Team.update(
          { _id: req.body.fromTeamId },
          {
            members
          }
        );
      }
      let user = await Users.findOne({ _id: req.body.player.playerId });
      let memberships = user.memberships;
      memberships[team.league === 1 ? "gold" : "platinum"] = {
        [`${team._id}`]: team._id
      };
      if (req.body.fromTeamId) {
        let key = await Team.findOne({ _id: req.body.fromTeamId });
        key = memberships[key.league === 1 ? "gold" : "platinum"];
        delete key[req.body.fromTeamId];
      }
      let leagues = user.leagues;
      leagues[team.league === 1 ? "gold" : "platinum"] =
        req.body.player.position;
      user = await Users.update(
        { _id: req.body.player.playerId },
        {
          memberships,
          leagues
        }
      );
      return { code: 200, msg: "Player Successfully Modified!", updatedTeam };
    } catch (e) {
      return { code: 11102, msg: "An Error Occured." };
    }
  },
  removePlayerFromTeam: async req => {
    try {
      const team = await Team.findOne({ _id: req.body.teamId });
      let members = team.members;
      delete members[req.body.player.playerId];
      let user = await Users.findOne({ _id: req.body.player.playerId });
      let memberships = user.memberships;
      let leagues = user.leagues;
      leagues[team.league === 1 ? "gold" : "platinum"] = 0;
      delete memberships[team.league === 1 ? "gold" : "platinum"][
        req.body.teamId
      ];
      user = await Users.update(
        { _id: req.body.player.playerId },
        {
          memberships,
          leagues
        }
      );
      const updatedTeam = await Team.update(
        { _id: req.body.teamId },
        {
          members
        }
      );
      return { code: 200, msg: "Player Successfully Removed!", updatedTeam };
    } catch (e) {
      console.log(e);
      return { code: 11102, msg: "An Error Occured." };
    }
  },
  promotePlayerToCaptain: async req => {
    // code
  }
};
