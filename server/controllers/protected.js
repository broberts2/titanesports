const jwt = require("jsonwebtoken");
const config = require("../config");
const Users = require("../models/user");

module.exports = {
  protected: (req, res, next) => {
    let token = req.headers["titan_key"];
    console.log(token);
    if (token) {
      jwt.verify(token, config.secret, async (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {
          try {
            req.user_info = await Users.findOne({ username: decoded.username });
            if (req.user_info === null) {
              return res.json({
                success: false,
                message: "Failed to authenticate user."
              });
            }
            next();
          } catch (e) {
            throw new Error(e.message);
          }
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: "No token provided."
      });
    }
  }
};
