const Fetch = require("../fetch");
const apiKey = require("../../config").apiKey;

const endpoint = "https://na1.api.riotgames.com";

module.exports = {
  // Get League of Legends status for the given shard.
  leagueStatusByShard: async (req, res) =>
    Fetch.GET(`${endpoint}/lol/status/v3/shard-data?api_key=${apiKey}`)
};
