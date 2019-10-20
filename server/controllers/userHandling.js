const Users = require("../models/user");
const fs = require("fs");
const config = require("../config");
const bcrypt = require("bcrypt");

module.exports = {
  createUser: async (req, res) => {
    try {
      let user = await Users.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        level: 6,
        memberships: [""],
        iconId: 0,
        titanRole: "TOP",
        captainTeam: "",
        email: req.body.email
      });
      user.code = 200;
      user.msg = "Account Creation Successful!";
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
  }
};
