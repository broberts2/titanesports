const Fetch = require("../fetch");

module.exports = {
  // Get league positions in all queues for a given summoner ID.
  leaguePositionInAllQueues: (req, res) =>
    Fetch.GET(
      `/lol/spectator/v4/active-games/by-summoner/${req.query.summonerId}`
    ),
  // Get all the positional league entries.
  featuredGames: (req, res) => Fetch.GET(`/lol/spectator/v4/featured-games`)
};
