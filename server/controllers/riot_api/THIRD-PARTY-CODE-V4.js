const Fetch = require("../fetch");
const apiKey = require("../../config").apiKey;

module.exports = {
  // Get third party code for a given summoner ID.
  thirdPartyCode: async (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/platform/v4/third-party-code/by-summoner/${req
        .query.summonerId}?api_key=${apiKey}`
    )
};
