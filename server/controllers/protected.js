const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = {
  protected: (req, res, next) => {
    var token = req.headers["authorization"];
    if (token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {
          req.decoded = decoded;
          next();
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
