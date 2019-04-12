const Fetch = require("../fetch");
const apiKey = require("../../config").apiKey;

module.exports = {
  // Returns champion rotations, including free-to-play and low-level free-to-play rotations (REST)
  championRotations: async (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${apiKey}`,
      req.user_info
    )
};
