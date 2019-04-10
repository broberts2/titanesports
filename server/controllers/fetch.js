const fetch = require("node-fetch");
const riotURL = require("../config").riotURL;
const apiKey = require("../config").apiKey;

module.exports = {
  GET: url =>
    fetch(riotURL + url + `?api_key=${apiKey}`, {
      method: "GET"
    }).then(response => response.j()),
  POST: url =>
    fetch(riotURL + url + `?api_key=${apiKey}`, {
      method: "POST"
    }).then(response => response.text())
};
