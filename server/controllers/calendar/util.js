const authorize = require("./authorize").authorize;
const json = require("./credentials.json");

module.exports = {
  util: cb =>
    new Promise((resolve, reject) => {
      resolve(authorize(json, cb));
    })
};
