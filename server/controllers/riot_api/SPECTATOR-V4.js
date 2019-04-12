const Fetch = require("../fetch");
const apiKey = require("../../config").apiKey;

module.exports = {
  // Get league positions in all queues for a given summoner ID.
  leaguePositionInAllQueues: (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${req
        .query.summonerId}?api_key=${apiKey}`
    ),
  // Get all the positional league entries.
  featuredGames: (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/spectator/v4/featured-games?api_key=${apiKey}`
    )
};
