const Fetch = require("../fetch");
const apiKey = require("../../config").apiKey;

module.exports = {
  // Get the challenger league for given queue.
  challengerLeagueQueue: async (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/${req
        .query.queue}?api_key=${apiKey}`
    ),
  // Get the grandmaster league of a specific queue.
  grandmasterLeagueQueue: async (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/league/v4/grandmasterleagues/by-queue/${req
        .query.queue}?api_key=${apiKey}`
    ),
  // Get league with given ID, including inactive entries.
  league: async (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/league/v4/leagues/${req.query
        .leagueId}?api_key=${apiKey}`
    ),
  // Get the master league for given queue.
  masterLeagueQueue: async (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/league/v4/masterleagues/by-queue/${req
        .query.queue}?api_key=${apiKey}`
    ),
  // Get the queues that have positional ranks enabled.
  enabledPositionalRankQueues: async (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/league/v4/positional-rank-queues?api_key=${apiKey}`
    ),
  // Get league positions in all queues for a given summoner ID.
  allLeaguePositions: async (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/league/v4/positions/by-summoner/${req
        .query.summonerId}?api_key=${apiKey}`
    ),
  // Get all the positional league entries.
  allPositionalLeagueEntries: async (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/league/v4/positions/${req.body
        .positionalQueue}/${req.body.tier}/${req.body.division}/${req.body
        .position}/${req.body.page}?api_key=${apiKey}`
    )
};
