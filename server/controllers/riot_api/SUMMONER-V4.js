const Fetch = require("../fetch");
const apiKey = require("../../config").apiKey;

const endpoint = "https://na1.api.riotgames.com";

module.exports = {
  // Get a summoner by account ID.
  summonerByAccountId: async (req, res) =>
    Fetch.GET(
      `${endpoint}/lol/summoner/v4/summoners/by-account/${req.query
        .accountId}?api_key=${apiKey}`
    ),
  // Get a summoner by summoner name.
  summonerByName: async (req, res) =>
    Fetch.GET(
      `${endpoint}/lol/summoner/v4/summoners/by-name/${req.query
        .summonerName}?api_key=${apiKey}`
    ),
  // Get a summoner by PUUID.
  summonerByPUUID: async (req, res) =>
    Fetch.GET(
      `${endpoint}/lol/summoner/v4/summoners/by-puuid/${req.query
        .PUUID}?api_key=${apiKey}`
    ),
  // Get a summoner by summoner ID.
  summonerBySummonerId: async (req, res) =>
    Fetch.GET(
      `${endpoint}/lol/summoner/v4/summoners/${req.query
        .summonerId}?api_key=${apiKey}`
    )
};
