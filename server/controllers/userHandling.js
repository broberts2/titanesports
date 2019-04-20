const Users = require("../models/user");
const config = require("../config");
const bcrypt = require("bcrypt");
const restrict = require("./restrict");
const Summoner = require("./riot_api/SUMMONER-V4");

const filterUser = user => ({
  username: user.username,
  iconId: user.iconId,
  soloTier: user.soloTier,
  soloDivision: user.soloDivision,
  soloLp: user.soloLp,
  memberships: user.memberships,
  soloMostPlayed: user.soloMostPlayed,
  soloRole: user.soloRole,
  titanRole: user.titanRole,
  captainTeam: user.captainTeam
});

module.exports = {
  getAllUsers: async () => {
    try {
      let users = await Users.find({});
      //users = users.map(el => filterUser(el));
      return users;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getUser: async (req, res) => {
    try {
      let user = await Users.findOne({ username: req.query.u });
      user = filterUser(user);
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getSelf: async (req, res) => {
    try {
      let user = await Users.findOne({ username: req.user_info.username });
      user = filterUser(user);
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  createUser: async (req, res) => {
    try {
      const summoner = await Summoner.summonerByName({
        query: {
          summonerName: req.body.username
        }
      }).then(res => JSON.parse(res));
      if (summoner.status) {
        return summoner.status;
      }
      const user = await Users.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        level: 6,
        lolAccountId: summoner.accountId,
        lolSummonerId: summoner.id,
        soloLp: 0,
        soloTier: " ",
        soloDivision: " ",
        soloRole: " ",
        soloMostPlayed: [""],
        flexLp: 0,
        flexTier: " ",
        flexDivision: " ",
        flexRole: " ",
        flexMostPlayed: [""],
        memberships: [""],
        iconId: 0,
        summonerLevel: 0,
        titanRole: "TOP",
        captainTeam: ""
      });
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  loginUser: async (req, res) => {
    const credentials = new Buffer(
      req.headers["authorization"].split(" ")[1],
      "base64"
    ).toString();
    const [username, password] = credentials.split(":");
    const user = await Users.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }
    try {
      const token = user.getToken(
        bcrypt.compareSync(password, user.password) ? user : null
      );
      return token;
    } catch (e) {
      throw new Error("Authentication failed.");
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await Users.update({ username: req.query.u }, req.body.data);
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  updateSelf: async (req, res) => {
    if (req.user_info.level > 0) {
      delete req.body.level;
      delete req.body.username;
      delete req.body.lolAccountId;
    }
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    try {
      const user = await Users.update({ _id: req.user_info._id }, req.body);
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  verifyUser: async (req, res) => {
    try {
      const lol_info = await Summoner.summonerByName(req, res);
      const user = await Users.update(
        { username: req.query.u },
        {
          level: 5,
          lolAccountId: JSON.parse(lol_info).accountId
        }
      );
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await Users.remove({
        username: req.query.u
      });
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  }
};
