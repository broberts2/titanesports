const Users = require("../models/user");
const fs = require("fs");
const config = require("../config");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectID;

module.exports = {
  createUser: async (req, res) => {
    try {
      let user = await Users.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        level: 10,
        memberships: {
          gold: {},
          platinum: {}
        },
        iconId: "0.png",
        captainTeam: "",
        leagues: {
          gold: 0,
          platinum: 0,
          freeAgent: 0
        },
        email: req.body.email,
        biography: "",
        verified: false,
        suspended: false,
        communityTitle: "",
        isAdmin: false,
        profileVideo: "animated-demacia.webm"
      });
      user.code = 200;
      user.msg = "Account Creation Successful!";
      return user;
    } catch (e) {
      return e;
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await Users.update(
        { username: req.user_info.username },
        req.body
      );
      user.code = 200;
      user.msg = "User Account Updated!";
      return user;
    } catch (e) {
      return e;
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
      return { code: 11100 };
    }
    try {
      const token = user.getToken(
        bcrypt.compareSync(password, user.password) ? user : null
      );
      return { token, code: 200, msg: "Login Successful!", u: user.username };
    } catch (e) {
      return { code: 11101, msg: "Authentication Error." };
    }
  },
  getUser: async (req, res) => {
    const user = await Users.findOne({ _id: ObjectId(req.query.u) });
    if (!user) {
      return { code: 11102, msg: "Get User Error." };
    }
    try {
      return { code: 200, msg: "Get User Successful!", user };
    } catch (e) {
      return { code: 11102, msg: "Get User Error." };
    }
  },
  getAllUsers: async (req, res) => {
    const users = await Users.find({});
    if (!users) {
      return { code: 11102, msg: "Get Users Error." };
    }
    try {
      return { code: 200, msg: "Get Users Successful!", users };
    } catch (e) {
      return { code: 11102, msg: "Get Users Error." };
    }
  },
  validateToken: async (req, res) => {
    const user = await Users.findOne({ username: req.user_info.username });
    if (!user) {
      return { code: 11105, msg: "Unable to Parse User." };
    }
    try {
      return {
        code: 200,
        msg: "Token is Valid!",
        id: user._id,
        u: user.username
      };
    } catch (e) {
      return { code: 11101, msg: "Invalid or Null Token." };
    }
  }
};
