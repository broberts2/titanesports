const Fetch = require("../fetch");

module.exports = {
  // Get League of Legends status for the given shard.
  leagueStatusByShard: (req, res) => Fetch.GET(`/lol/status/v3/shard-data`)
};
