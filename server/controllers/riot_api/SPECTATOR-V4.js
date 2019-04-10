const Fetch = require("../fetch");

module.exports = {
  // Get league positions in all queues for a given summoner ID.
  leaguePositionInAllQueues: summonerId =>
    Fetch.GET(`/lol/spectator/v4/active-games/by-summoner/${summonerId}`),
  // Get all the positional league entries.
  featuredGames: () => Fetch.GET(`/lol/spectator/v4/featured-games`)
};
