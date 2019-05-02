const authorize = require("./authorize").authorize;
const list_events = require("./list_events").list_events;
const fs = require("fs");

module.exports = {
  read_file: () =>
    new Promise((resolve, reject) => {
      fs.readFile("./credentials.json", (err, content) => {
        if (err) return console.log("Error loading client secret file:", err);
        resolve(authorize(JSON.parse(content), list_events));
      });
    })
};
