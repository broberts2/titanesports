const Fetch = require("../fetch");

module.exports = {
  // Get the challenger league for given queue.
  challengerLeagueQueue: queue =>
    Fetch.GET(`/lol/league/v4/challengerleagues/by-queue/${queue}`),
  // Get the grandmaster league of a specific queue.
  grandmasterLeagueQueue: queue =>
    Fetch.GET(`/lol/league/v4/grandmasterleagues/by-queue/${queue}`),
  // Get league with given ID, including inactive entries.
  league: leagueId => Fetch.GET(`/lol/league/v4/leagues/${leagueId}`),
  // Get the master league for given queue.
  masterLeagueQueue: queue =>
    Fetch.GET(`/lol/league/v4/masterleagues/by-queue/${queue}`),
  // Get the queues that have positional ranks enabled.
  enabledPositionalRankQueues: () =>
    Fetch.GET(`/lol/league/v4/positional-rank-queues`),
  // Get league positions in all queues for a given summoner ID.
  allLeaguePositions: summonerId =>
    Fetch.GET(`/lol/league/v4/positions/by-summoner/${summonerId}`),
  // Get all the positional league entries.
  allPositionalLeagueEntries: obj =>
    Fetch.GET(
      `/lol/league/v4/positions/${obj.positionalQueue}/${obj.tier}/${obj.division}/${obj.position}/${obj.page}`
    )
};
