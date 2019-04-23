const fetch = require("node-fetch");

module.exports = {
  GET: url =>
    fetch(`${encodeURI(url)}`, {
      method: "GET"
    }).then(response => response.text()),
  POST: (url, body) =>
    fetch(`${encodeURI(url)}`, {
      method: "POST",
      body: JSON.stringify(body)
    }).then(response => response.text())
};
