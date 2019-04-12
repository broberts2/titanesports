const Fetch = require("../fetch");
const apiKey = require("../../config").apiKey;

module.exports = {
  // Get all champion mastery entries sorted by number of champion points descending,
  summonerMasteriesAll: (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${req
        .query.summonerId}?api_key=${apiKey}`
    ),
  // Get all champion mastery entries sorted by number of champion points descending,
  summonerChampionMastery: (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${req
        .query.summonerId}/by-champion/${req.query
        .championId}?api_key=${apiKey}`
    ),
  // Get a player's total champion mastery score, which is the sum of individual champion mastery levels.
  summonerTotalMastery: (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/${req
        .query.summonerId}?api_key=${apiKey}`
    )
};
