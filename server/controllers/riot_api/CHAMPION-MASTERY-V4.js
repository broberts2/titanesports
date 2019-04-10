const Fetch = require("../fetch");

module.exports = {
  // Get all champion mastery entries sorted by number of champion points descending,
  summonerMasteriesAll: (req, res) =>
    Fetch.GET(
      `/lol/champion-mastery/v4/champion-masteries/by-summoner/${req.query
        .summoner_id}`
    ),
  // Get all champion mastery entries sorted by number of champion points descending,
  summonerChampionMastery: (req, res) =>
    Fetch.GET(
      `/lol/champion-mastery/v4/champion-masteries/by-summoner/${req.query
        .summoner_id}/by-champion/${req.query.champion_id}`
    ),
  // Get a player's total champion mastery score, which is the sum of individual champion mastery levels.
  summonerTotalMastery: (req, res) =>
    Fetch.GET(
      `/lol/champion-mastery/v4/scores/by-summoner/${req.query.summoner_id}`
    )
};
