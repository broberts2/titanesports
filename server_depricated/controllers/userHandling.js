const Users = require("../models/user");
const fs = require("fs");
const config = require("../config");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectID;

module.exports = {
  createUser: async req => {
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
        captainTeam: {
          gold: {},
          platinum: {}
        },
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
        opgg: `https://na.op.gg/summoner/userName=${req.body.username}`,
        profileVideo: "animated-demacia.webm"
      });
      user.code = 200;
      user.msg = "Account Creation Successful!";
      return user;
    } catch (e) {
      return e;
    }
  },
  updateSelf: async (req, level) => {
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
  updateSelfPassword: async (req, level) => {
    let user = await Users.findOne({ username: req.user_info.username });
    if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
      try {
        user = await Users.update(
          { username: req.user_info.username },
          {
            password: bcrypt.hashSync(req.body.newPassword, 10)
          }
        );
        user.code = 200;
        user.msg = "User Account Updated!";
        return user;
      } catch (e) {
        return e;
      }
    } else {
      return {
        code: 503,
        msg: "Old password was incorrect."
      };
    }
  },
  updateUser: async (req, level, exact) => {
    if (
      (exact && req.user_info.level !== 0 && level !== req.user_info.level) ||
      req.user_info.level > level
    ) {
      return {
        msg: "Access Denied",
        code: 403
      };
    }
    try {
      const user = await Users.update({ _id: req.query.id }, req.body);
      user.code = 200;
      user.msg = "User Account Updated!";
      return user;
    } catch (e) {
      return e;
    }
  },
  loginUser: async req => {
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
  getUser: async req => {
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
  getAllUsers: async req => {
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
  validateToken: async req => {
    const user = await Users.findOne({ username: req.user_info.username });
    if (!user) {
      return { code: 11105, msg: "Unable to Parse User." };
    }
    try {
      return {
        code: 200,
        msg: "Token is Valid!",
        id: user._id,
        u: user.username,
        l: user.level
      };
    } catch (e) {
      return { code: 11101, msg: "Invalid or Null Token." };
    }
  },
  removeUser: async (req, level, exact) => {
    // if (
    //   (exact && req.user_info.level !== 0 && level !== req.user_info.level) ||
    //   req.user_info.level > level
    // ) {
    //   return {
    //     msg: "Access Denied",
    //     code: 403
    //   };
    // }
    try {
      const user = await Users.remove({ _id: req.query.id });
      user.code = 200;
      user.msg = "User Account Removed!";
      return user;
    } catch (e) {
      return e;
    }
  }
};