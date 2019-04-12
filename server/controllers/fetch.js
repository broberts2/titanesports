const fetch = require("node-fetch");

module.exports = {
  GET: url =>
    fetch(`${url}`, {
      method: "GET"
    }).then(response => response.text(response)),
  POST: (url, body) =>
    fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify(body)
    }).then(response => response.text())
};
