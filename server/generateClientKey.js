const jwt = require("jsonwebtoken");
const config = require("./config");

const token = jwt.sign("titanesports", config.tokenKey);
console.log(token);
