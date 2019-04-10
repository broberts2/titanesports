const Fetch = require("../fetch");

module.exports = {
  // Returns champion rotations, including free-to-play and low-level free-to-play rotations (REST)
  championRotations: summonerId =>
    Fetch.GET(`/lol/platform/v3/champion-rotations`)
};
