const Fetch = require("../fetch");

module.exports = {
  // Get third party code for a given summoner ID.
  thirdPartyCode: (req, res) =>
    Fetch.GET(
      `/lol/platform/v4/third-party-code/by-summoner/${req.query.summonerId}`
    )
};
