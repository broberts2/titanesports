const Fetch = require("../fetch");
const apiKey = require("../../config").apiKey;

module.exports = {
  // Get a summoner by account ID.
  summonerByAccountId: (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-account/${req
        .query.accountId}?api_key=${apiKey}`
    ),
  // Get a summoner by summoner name.
  summonerByName: (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req
        .query.summonerName}?api_key=${apiKey}`
    ),
  // Get a summoner by PUUID.
  summonerByPUUID: (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${req
        .query.PUUID}?api_key=${apiKey}`
    ),
  // Get a summoner by summoner ID.
  summonerBySummonerId: (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/${req.query
        .summonerId}?api_key=${apiKey}`
    )
};
