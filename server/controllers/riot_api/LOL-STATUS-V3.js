const Fetch = require("../fetch");
const apiKey = require("../../config").apiKey;

module.exports = {
  // Get League of Legends status for the given shard.
  leagueStatusByShard: (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/status/v3/shard-data?api_key=${apiKey}`
    )
};
