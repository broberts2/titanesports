const Fetch = require("../fetch");

module.exports = {
  // Get third party code for a given summoner ID.
  thirdPartyCode: summonerId =>
    Fetch.GET(`/lol/platform/v4/third-party-code/by-summoner/${summonerId}`)
};
