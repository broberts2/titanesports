const Fetch = require("../fetch");

module.exports = {
  // Get the challenger league for given queue.
  challengerLeagueQueue: (req, res) =>
    Fetch.GET(`/lol/league/v4/challengerleagues/by-queue/${req.query.queue}`),
  // Get the grandmaster league of a specific queue.
  grandmasterLeagueQueue: (req, res) =>
    Fetch.GET(`/lol/league/v4/grandmasterleagues/by-queue/${req.query.queue}`),
  // Get league with given ID, including inactive entries.
  league: (req, res) =>
    Fetch.GET(`/lol/league/v4/leagues/${req.query.leagueId}`),
  // Get the master league for given queue.
  masterLeagueQueue: (req, res) =>
    Fetch.GET(`/lol/league/v4/masterleagues/by-queue/${req.query.queue}`),
  // Get the queues that have positional ranks enabled.
  enabledPositionalRankQueues: (req, res) =>
    Fetch.GET(`/lol/league/v4/positional-rank-queues`),
  // Get league positions in all queues for a given summoner ID.
  allLeaguePositions: (req, res) =>
    Fetch.GET(`/lol/league/v4/positions/by-summoner/${req.query.summonerId}`),
  // Get all the positional league entries.
  allPositionalLeagueEntries: (req, res) =>
    Fetch.GET(
      `/lol/league/v4/positions/${req.body.positionalQueue}/${req.body
        .tier}/${req.body.division}/${req.body.position}/${req.body.page}`
    )
};
