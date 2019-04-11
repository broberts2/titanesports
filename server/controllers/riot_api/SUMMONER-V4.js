const Fetch = require("../fetch");

module.exports = {
  // Get a summoner by account ID.
  summonerByAccountId: (req, res) =>
    Fetch.GET(`/lol/summoner/v4/summoners/by-account/${req.query.accountId}`),
  // Get a summoner by summoner name.
  summonerByName: (req, res) =>
    Fetch.GET(`/lol/summoner/v4/summoners/by-name/${req.query.summonerName}`),
  // Get a summoner by PUUID.
  summonerByPUUID: (req, res) =>
    Fetch.GET(`/lol/summoner/v4/summoners/by-puuid/${req.query.PUUID}`),
  // Get a summoner by summoner ID.
  summonerBySummonerId: (req, res) =>
    Fetch.GET(`/lol/summoner/v4/summoners/${req.query.summonerId}`)
};
